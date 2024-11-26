/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, posterPath }) => {
  const [loaded, setLoaded] = useState(false); // Track image loading state

  if (!posterPath) return null;

  return (
    <div className="w-48 pr-4 relative overflow-hidden">
      {/* Placeholder for smooth transition */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-md"></div>
      )}
      {/* Image with lazy loading */}
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        className={`transition-opacity duration-500 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)} // Set loaded to true once image is loaded
      />
    </div>
  );
};

export default MovieCard;
