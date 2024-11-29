/* eslint-disable no-unused-vars */
import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="overflow-clip relative z-20">
        <div className="overflow-x-hidden px-2 md:pl-12 mt-0 md:-mt-48  scrollbar-none w-full">
          <MovieList
            title="Now Playing"
            movies={movies.nowPlayingMovies || []}
          />
          <MovieList title="Top Rated" movies={movies.topRatedMovies || []} />
          <MovieList title="Popular" movies={movies.popularMovies || []} />
          <MovieList
            title="Upcoming Movies"
            movies={movies.upcomingMovies || []}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
