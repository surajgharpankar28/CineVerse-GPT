import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      // Fetch Upcoming Movies
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
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
        dispatch(addUpcomingMovies(json.results));
      } else {
        console.warn(
          "Invalid data structure: Missing 'results' in API response."
        );
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching upcoming movies:", error.message);
    }
  };

  useEffect(() => {
    // Fetch only if no data is available
    if (!upcomingMovies || upcomingMovies.length === 0) {
      getUpcomingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpcomingMovies;
