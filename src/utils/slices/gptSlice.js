import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: [], // Set to empty array instead of null
    movieResults: [], // Set to empty array instead of null
    searchValue: "", // Set to empty string instead of null
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies: (state, action) => {
      const { movieNames, movieResults, searchValue } = action.payload;
      state.movieNames = Array.isArray(movieNames) ? movieNames : [];
      state.movieResults = Array.isArray(movieResults) ? movieResults : [];
      state.searchValue = typeof searchValue === "string" ? searchValue : "";
    },
  },
});

export const { toggleGptSearchView, addGptMovies } = gptSlice.actions;
export default gptSlice.reducer;
