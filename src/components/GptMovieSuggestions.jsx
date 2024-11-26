import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, searchValue } = useSelector(
    (store) => store.gpt
  );

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div>
      <div className="p-4 z-50  text-white scrollbar-hide bg-black ">
        <h1 className="p-2 text-xl z-50 relative text-white">
          Showing result for : {searchValue}
        </h1>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
