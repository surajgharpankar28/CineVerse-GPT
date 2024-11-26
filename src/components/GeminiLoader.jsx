const GeminiLoader = () => {
  return (
    <div className="relative bg-black w-full h-[100vh]">
      {/* Loader at the top */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center space-y-2 z-50">
        {/* Spinner */}
        <div className="relative w-10 h-10 animate-spin rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
          <div className="absolute inset-0 m-auto w-8 h-8 bg-black rounded-full"></div>
        </div>
        {/* Loading text */}
        <p className="text-white text-sm md:text-lg font-semibold animate-pulse whitespace-nowrap">
          Loading suggestions...
        </p>
        {/* Powered by Gemini */}
        <p className="flex items-center text-sm md:text-lg font-semibold animate-pulse whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
          Powered by Google Gemini
        </p>
      </div>
    </div>
  );
};

export default GeminiLoader;
