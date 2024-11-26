/* eslint-disable no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GOOGLE_GEMINI_API_KEY } from "./constants";

const apiKey = GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-002",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function geminiResponse(prompt) {
  try {
    // Ensure prompt is valid
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      throw new Error("Invalid prompt: Prompt must be a non-empty string.");
    }

    // Start a new chat session
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    if (!chatSession) {
      throw new Error("Failed to initialize chat session.");
    }

    // Send a message to the session
    const result = await chatSession.sendMessage(prompt);

    // Validate response structure
    if (!result || !result.response || !result.response.text) {
      throw new Error("Unexpected API response structure.");
    }

    // Ensure text is available and process the response
    const resultText = await result.response.text();
    if (!resultText) {
      throw new Error("Empty response received from API.");
    }

    // Process the result into an array of movies (assuming response is comma-separated)
    const gptMovies = resultText.split(",").map((movie) => movie.trim());

    console.log(gptMovies);

    // Return the array of movies
    return gptMovies;
  } catch (error) {
    // Log the error for debugging
    console.error("Error in geminiResponse:", error.message);

    // Return a default value or rethrow the error
    throw new Error(
      `Failed to get a response from Gemini API: ${error.message}`
    );
  }
}

export default geminiResponse;
