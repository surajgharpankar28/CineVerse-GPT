/* eslint-disable no-unused-vars */
import { cilXCircle, cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useRef, useState } from "react";
import geminiResponse from "../utils/geminiResponse";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addGptMovies,
  toggleIsLoading,
  clearGptMovies,
} from "../utils/slices/gptSlice";

const GptSearchBar = () => {
  // Reference for input field
  const searchText = useRef(null);

  // Redux hooks for state management
  const dispatch = useDispatch();

  // Reference for suggestions container to calculate overflow
  const containerRef = useRef(null);

  // State to manage chip alignment: 'justify-center' or 'justify-start'
  const [alignment, setAlignment] = useState("justify-center");

  // State to enable or disable search button based on input
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Fetch movie results from Redux store
  const { movieResults } = useSelector((store) => store.gpt);
  const hasNoResults = !movieResults || movieResults.length === 0;

  // Effect to dynamically set alignment based on overflow
  useEffect(() => {
    const updateAlignment = () => {
      if (containerRef.current) {
        const isOverflowing =
          containerRef.current.scrollWidth > containerRef.current.clientWidth;
        setAlignment(isOverflowing ? "justify-start" : "justify-center");
      }
    };

    if (movieResults && movieResults.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    // Check alignment initially and on window resize
    updateAlignment();
    window.addEventListener("resize", updateAlignment);
    return () => {
      window.removeEventListener("resize", updateAlignment);
    };
  }, []);

  // Handle input change to toggle the search button
  const handleInputChange = () => {
    const value = searchText.current.value.trim();
    setIsButtonDisabled(value === "");
  };

  // Clear search results and input field
  const handleClearResults = () => {
    searchText.current.value = "";
    dispatch(clearGptMovies()); // Dispatch action to clear movie suggestions
  };

  // Handle chip click: set input value and initiate search
  const handleChipClick = (query) => {
    searchText.current.value = query; // Update input field with selected query
    const value = searchText.current.value.trim();
    setIsButtonDisabled(value === "");
    handleGptSearch(query); // Trigger the search for the selected query
  };

  // Search for a movie in TMDB API
  const searchMovieInTMDB = async (movieTitle) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results;
  };

  // Handle search using GPT and TMDB
  const handleGptSearch = async (query = "") => {
    const value = query || searchText.current.value.trim();
    if (!value) {
      alert("Please enter a search term.");
      return;
    }
    dispatch(toggleIsLoading()); // Start loading spinner

    const inputValue = value;
    const promptQuery = `
      Act like a movie suggestion system and show results for the query: ${inputValue}.
      Provide 5 movie suggestions, comma-separated. If the movie has sequels or related parts, include them as well.
      Example Result: The Conjuring, The Conjuring 2, Insidious, Insidious: Chapter 2, It, It Chapter Two.
    `;

    try {
      // Fetch GPT response for movie suggestions
      const gptResponse = await geminiResponse(promptQuery);
      if (!gptResponse || gptResponse.length === 0) {
        console.error("No movie suggestions received.");
        return;
      }

      // Search each movie in TMDB API and gather results
      const promiseArray = gptResponse.map((movie) => searchMovieInTMDB(movie));
      const tmdpResults = await Promise.all(promiseArray);

      // Dispatch results to Redux store
      dispatch(
        addGptMovies({
          movieNames: gptResponse,
          movieResults: tmdpResults,
          searchValue: inputValue,
        })
      );
    } catch (error) {
      console.error("Error fetching GPT response:", error.message);
    } finally {
      dispatch(toggleIsLoading()); // Stop loading spinner
    }
  };

  // Example predefined suggestion queries
  const suggestionQueries = [
    "Action movies",
    "Romantic movies",
    "Sci-fi movies",
    "Horror movies",
    "Comedy movies",
    "Retro movies",
    "Tollywood movies",
  ];

  return (
    <div className="search pt-[12rem] sm:pt-[12rem] md:pt-[10rem] text-center w-full sm:w-auto m-auto">
      {/* Search bar form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-row z-20 sm:flex-row items-center justify-center"
      >
        {/* Input field */}
        <input
          ref={searchText}
          className="w-[70%] mr-2 z-20 sm:w-[25rem] text-black pl-3 py-2 border border-solid border-black focus:border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="What would you like to watch today?"
          onChange={handleInputChange}
        />
        {/* Search button */}
        <button
          className={`px-2 py-2 z-20 text-black bg-yellow-400 rounded-lg focus:outline-none ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled}
          onClick={() => handleGptSearch()}
        >
          <CIcon className="text-white z-20 w-[1.5rem]" icon={cilSearch} />
        </button>
        {/* Clear button */}
        <button
          className={`px-2 py-2 z-20 text-black bg-red-600 ml-2 rounded-lg focus:outline-none ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled}
          onClick={() => handleClearResults()}
        >
          <CIcon className="text-white z-20 w-[1.5rem]" icon={cilXCircle} />
        </button>
      </form>

      {/* Suggestion Chips */}
      <div
        ref={containerRef}
        className={`mt-4 overflow-x-auto flex ${alignment} px-4 gap-2 sm:gap-4 items-center scroll-snap-x scroll-snap-mandatory`}
      >
        {suggestionQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleChipClick(query)}
            className="px-3 py-1 text-sm bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all whitespace-nowrap scroll-snap-align-start"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
