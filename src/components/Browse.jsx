/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const nowPlayingMovies = useNowPlayingMovies();
  const popularMovies = usePopularMovies();
  const upcomingMovies = useUpcomingMovies();
  const topRatedMovies = useTopRatedMovies();

  const gptData = useSelector((store) => store.gpt);

  return (
    <>
      <Header />
      {gptData.showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </>
  );
};

export default Browse;
