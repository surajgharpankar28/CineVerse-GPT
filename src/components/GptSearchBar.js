import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useState } from "react";

const GptSearchBar = () => {
  const handleSubmit = () => {};
  const clearSearchInput = () => {};

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="search pt-[10%] text-center w-full sm:w-auto m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center"
      >
        <input
          className="w-full sm:w-[25rem] text-black pl-3 py-2 border border-solid border-black focus:border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="What would you like to watch today?"
          //   value={searchTerm}
        />
        {searchTerm.length !== 0 && (
          <button
            className={`px-2 py-2 text-black rounded-r-l focus:outline-none ${
              !searchTerm ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            type="submit"
            onClick={clearSearchInput}
            disabled={!searchTerm}
          >
            <CIcon
              className="text-black hover:text-orange-500 w-[1.5rem] mr-2"
              icon={cilSearch}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
