import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { useSelector } from "react-redux";

const GptSearchPage = () => {
  const { movieResults } = useSelector((store) => store.gpt);
  const hasNoResults = !movieResults || movieResults.length === 0;

  return (
    <>
      {/* <div className="fullscreen-bg">
        <div className="content">
          <GptSearchBar />
          <div className="relative z-10">
            <GptMovieSuggestions />
          </div>
        </div>
      </div> */}
      <div
        className={`bg-black ${hasNoResults ? "h-[100vh]" : "min-h-[100vh]"}`}
      >
        {" "}
        <div className="content-container">
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
      </div>
    </>
  );
};

export default GptSearchPage;
