/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { CIcon } from "@coreui/icons-react";
import { cilMediaPlay, cilInfo } from "@coreui/icons";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] md:pt-0 top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white bg-gradient-to-r from-black z-10">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        {title}
      </h1>
      <p className="hidden md:block text-white pt-4 text-lg md:text-xl lg:w-1/3">
        {overview.slice(0, 300) + "..."}
      </p>
      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4 pt-4">
        {/* Play Button */}
        <button className="flex justify-start items-center font-medium bg-white text-black text-lg p-3 px-6 sm:px-8 w-40 sm:w-auto rounded-md hover:bg-opacity-80">
          <CIcon className="w-[1.3rem] m-auto mr-2" icon={cilMediaPlay} />
          Play
        </button>

        {/* More Info Button */}
        <button className="flex justify-start items-center font-medium bg-gray-500 bg-opacity-30 text-white text-lg p-3 px-6 sm:px-8 w-40 sm:w-auto rounded-md">
          <CIcon className="w-[1.3rem] m-auto mr-2" icon={cilInfo} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
