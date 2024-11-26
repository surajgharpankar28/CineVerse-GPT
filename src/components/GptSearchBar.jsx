/* eslint-disable no-unused-vars */
import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useRef, useState } from "react";
import geminiResponse from "../utils/geminiResponse";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/slices/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInputChange = () => {
    const value = searchText.current.value.trim();
    setIsButtonDisabled(value === "");
  };
  const searchMovieInTMDB = async (movieTitle) => {
    //search movie in TMDB
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieTitle +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results;
  };
  const handleGptSearch = async () => {
    const value = searchText.current.value.trim();
    if (!value) {
      alert("Please enter a search term.");
      return;
    }
    console.log("Search initiated for:", value);
    console.log(searchText.current.value);
    const inputValue = searchText.current.value;
    const promptQuery =
      "Act like a movie suggestion system and show results for the query: " +
      inputValue +
      ". Give 5 movies, comma separated like the example result given ahead. Example Result: 3 Idiots, Avenger, Hulk, Raabta, Kabir Singh";

    //Make API call to gemini and get movie result
    try {
      // Get the GPT response (movie suggestions)
      const gptResponse = await geminiResponse(promptQuery);
      console.log("GPT Response:", gptResponse); // Log the response to verify its contents
      if (!gptResponse || gptResponse.length === 0) {
        console.error("No movie suggestions received.");
        return;
      }
      // Dispatch the action to store the movie suggestions in Redux
      //   dispatch(addGptMovies(gptResponse));
      const promiseArray = gptResponse.map((movie) => {
        console.log("Searching for movie:", movie);
        return searchMovieInTMDB(movie);
      });
      const tmdpResults = await Promise.all(promiseArray);
      console.log("Movies from TMDB API:", tmdpResults);
      dispatch(
        addGptMovies({
          movieNames: gptResponse,
          movieResults: tmdpResults,
          searchValue: inputValue,
        })
      );
    } catch (error) {
      console.error("Error fetching GPT response:", error.message);
    }
  };

  return (
    <div className="search pt-[12rem] sm:pt-[12rem] md:pt-[10rem]   text-center w-full sm:w-auto m-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-row z-20  sm:flex-row items-center justify-center"
      >
        <input
          ref={searchText}
          className="w-[70%] mr-2 mg-full  z-20 sm:w-[25rem] text-black pl-3 py-2 border border-solid border-black focus:border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="What would you like to watch today?"
          onChange={handleInputChange}
        />
        <button
          className={`px-2 py-2 z-20 text-black bg-yellow-400 rounded-lg focus:outline-none ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled} // Disable button based on input
          onClick={() => {
            if (!searchText.current.value.trim()) {
              alert("Please enter a search term.");
              return;
            }
            handleGptSearch();
          }}
        >
          <CIcon className="text-white z-20 w-[1.5rem]" icon={cilSearch} />
        </button>{" "}
      </form>
    </div>
  );
};

export default GptSearchBar;
