import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      // Fetch Popular Movies
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const json = await response.json();

      // Validate and dispatch results
      if (json && json.results) {
        dispatch(addPopularMovies(json.results));
      } else {
        console.warn(
          "Invalid data structure: Missing 'results' in API response."
        );
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching popular movies:", error.message);
    }
  };

  useEffect(() => {
    // Fetch only if no data is available
    if (!popularMovies || popularMovies.length === 0) {
      getPopularMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularMovies;
