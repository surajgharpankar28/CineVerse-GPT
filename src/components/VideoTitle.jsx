import React from "react";
import { CIcon } from "@coreui/icons-react";
import { cilMediaPlay, cilInfo } from "@coreui/icons";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video pt-[20%] px-12 md:px-24 text-white bg-gradient-to-r from-black h-[100vh]">
      <h1 className="text-white text-3xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:block text-white pt-4 text-lg w-1/3">
        {overview.slice(0, 300) + "..."}
      </p>
      <div className="flex pt-4">
        <button className="flex font-medium bg-white text-black text-lg p-3 px-6 w-26 rounded-md hover:bg-opacity-80 ">
          <CIcon className="w-[1.3rem] m-auto mr-2" icon={cilMediaPlay} />
          Play
        </button>
        <button className="flex font-medium bg-gray-500 bg-opacity-30 text-white text-lg ml-2 p-3 px-6 w-26 rounded-md">
          <CIcon className="w-[1.3rem] m-auto mr-2" icon={cilInfo} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
