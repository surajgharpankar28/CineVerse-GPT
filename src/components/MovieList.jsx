import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth / 2; // Adjust the scroll amount as needed

      if (direction === "left") {
        scrollContainerRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        scrollContainerRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="p-2 relative">
      <h1 className="text-2xl text-white">{title}</h1>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory py-2"
      >
        <div className="flex">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="snap-start" // Ensure each MovieCard snaps individually
            >
              <MovieCard title={movie.title} posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Left Button */}
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        onClick={() => scroll("left")}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      {/* Scroll Right Button */}
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        onClick={() => scroll("right")}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default MovieList;
