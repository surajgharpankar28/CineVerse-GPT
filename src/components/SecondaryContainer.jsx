import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="px-2 md:pl-12 mt-0 md:-mt-48 relative z-20 scrollbar-hide ">
        <MovieList
          title={"Now Playing"}
          movies={movies.nowPlayingMovies || []}
        />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies || []} />
        <MovieList title={"Popular"} movies={movies.popularMovies || []} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies.upcomingMovies || []}
        />
      </div>
    )
  );
};

export default SecondaryContainer;
