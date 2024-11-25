import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (movies === null) return;

  // Select a random movie if movies array exists and is not empty
  const mainMovie =
    movies && movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  // const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie;

  return (
    <div className="">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
