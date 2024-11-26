/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 pr-4">
      <img alt={title} src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
