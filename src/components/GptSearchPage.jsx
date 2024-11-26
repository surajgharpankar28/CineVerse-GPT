import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { useSelector } from "react-redux";

const GptSearchPage = () => {
  const { movieResults } = useSelector((store) => store.gpt);
  const hasNoResults = !movieResults || movieResults.length === 0;

  return (
    <div
      className={`bg-black ${
        hasNoResults ? "h-[100vh]" : "min-h-[100vh]"
      } transition-all`}
    >
      <div className="content-container">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearchPage;
