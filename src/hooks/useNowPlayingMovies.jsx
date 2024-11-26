import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      // Fetch Now Playing Movies
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON
      const json = await response.json();

      // Validate and dispatch results
      if (json && json.results) {
        dispatch(addNowPlayingMovies(json.results));
      } else {
        console.warn(
          "Invalid data structure: Missing 'results' in API response."
        );
      }
    } catch (error) {
      // Log errors
      console.error("Error fetching now playing movies:", error.message);
    }
  };

  useEffect(() => {
    // Fetch only if no data is available
    if (!nowPlayMovies || nowPlayMovies.length === 0) {
      getNowPlayingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
