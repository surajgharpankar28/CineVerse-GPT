import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      // Fetch Top Rated Movies
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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
        dispatch(addTopRatedMovies(json.results));
      } else {
        console.warn(
          "Invalid data structure: Missing 'results' in API response."
        );
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching top rated movies:", error.message);
    }
  };

  useEffect(() => {
    // Fetch only if no data is available
    if (!topRatedMovies || topRatedMovies.length === 0) {
      getTopRatedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedMovies;
