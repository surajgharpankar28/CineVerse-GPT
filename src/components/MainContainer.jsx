import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const hasNoResults = !movies || movies.length === 0;

  if (movies === null) return;

  // Select a random movie if movies array exists and is not empty
  const mainMovie =
    movies && movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  // const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie;

  return (
    <div className="relative pt-[40%] md:pt-0 bg-black h-[80vh] md:h-[100vh]">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
