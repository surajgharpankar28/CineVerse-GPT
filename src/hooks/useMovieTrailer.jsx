import { useEffect } from "react";
import { addTrailerVideo } from "../utils/slices/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideo = async () => {
    try {
      // Fetch movie videos
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const allMovieClips = await response.json();

      // Check for valid results
      if (!allMovieClips || !allMovieClips.results) {
        throw new Error("Invalid data structure from API response");
      }

      // Filter trailers
      const filterTrailers = allMovieClips.results.filter(
        (video) => video.type === "Trailer"
      );

      // Select a random trailer if available; otherwise, fallback to the first video
      const trailer =
        filterTrailers.length > 0
          ? filterTrailers[Math.floor(Math.random() * filterTrailers.length)]
          : allMovieClips.results[0];

      // Dispatch trailer to Redux store
      if (trailer) {
        dispatch(addTrailerVideo(trailer));
        console.log(
          `Selected Trailer Link: https://www.youtube.com/watch?v=${trailer.key}`
        );
      } else {
        console.warn("No trailer or videos found for the movie.");
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching movie trailers:", error.message);
    }
  };

  useEffect(() => {
    getMovieVideo();
    // eslint-disable-next-line
  }, []);
};

export default useMovieTrailer;
