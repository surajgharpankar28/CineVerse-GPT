import { useEffect } from "react";
import { addTrailerVideo } from "../utils/slices/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const allMovieClips = await data.json();

    const filterTrailers = allMovieClips.results.filter(
      (video) => video.type === "Trailer"
    );

    // Select a random trailer if filterTrailers array contains more than 1 trailer and if no trailer then select 1st video from allMovieClips[0]
    const trailer =
      filterTrailers && filterTrailers.length > 0
        ? filterTrailers[Math.floor(Math.random() * filterTrailers.length)]
        : allMovieClips[0];

    dispatch(addTrailerVideo(trailer));

    // console.log(`Link: https://www.youtube.com/watch?v=${trailer.key}`);
  };

  useEffect(() => {
    getMovieVideo();
    // eslint-disable-next-line
  }, []);
};

export default useMovieTrailer;
