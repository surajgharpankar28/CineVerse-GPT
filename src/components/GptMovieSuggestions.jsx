import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import GeminiLoader from "./GeminiLoader";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isLoading } = useSelector(
    (store) => store.gpt
  );

  // Show loading spinner if still loading
  if (isLoading) {
    return <GeminiLoader />; // Render the loader component
  }

  // If no movie names, return null (no results)
  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div>
      <div className="md:px-8 z-50 text-white scrollbar-hide bg-black">
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
