# CineVerse-GPT

CineVerse-GPT is a movie browsing web application built with React, Tailwind CSS, and integrated with Firebase authentication and the TMDB (The Movie Database) API. The app allows users to sign up, log in, browse movies, watch trailers, and get movie recommendations powered by GPT.

### View Project[https://cineverse-gpt.vercel.app/]

## Features

### Authentication
- **Login/Sign Up:**
  - User registration and login functionality.
  - Redirects authenticated users to the Browse page.
  - Form validation for secure user authentication.
  - Firebase Authentication used for sign-in/sign-up.
  - User profile management (including display name).
  - Sign out functionality.

### Browse Page
- **Movie Browsing:**
  - Displays a list of movies fetched from the TMDB API.
  - Each movie card contains movie details with a trailer embedded.
  - Movie suggestions displayed in a carousel format.
  - Responsive UI design with Tailwind CSS.
  - Custom hooks to fetch "Now Playing", "Popular", "Top Rated", and "Upcoming" movie data.

### GPT Integration - Google Gemini
- **Movie Search:**
  - Search bar powered by GPT to suggest movies based on user queries.
  - Display of suggested movie cards fetched from GPT responses.
  - Suggestions shown with movie posters and titles.
  - Integration with Gemini API for GPT-based search suggestions.

### UI/UX Enhancements
- Beautiful UI using Tailwind CSS for styling and layout.
- **Responsive Design**: Mobile-first design, ensuring the app is usable on any device.
- **Smooth Scrolling**: Used `tailwind-scrollbar-hide` plugin to hide scrollbars in the movie list for a cleaner look.

### Additional Features
- **Shimmer Loading**: Added a Gemini Shimmer loader for better user experience during data loading.
- **Trailer Video**: Embedded YouTube trailers for each movie using a custom hook.
- **Image Optimization**: Utilized TMDB Image CDN URL for fast and optimized loading of movie images.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite (for faster build performance)
- **Backend/Authentication**: Firebase
- **APIs**: 
  - **TMDB API** for movie data (now playing, popular, etc.)
  - **Gemini API** for GPT-based search functionality

## Setup

To get started with CineVerse-GPT, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/surajgharpankar28/CineVerse-GPT.git
   cd cineverse-gpt
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Firebase Setup:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Set up Firebase Authentication and Firestore (if needed).
   - Replace the Firebase configuration in `src/firebase.js` with your Firebase credentials.

4. **TMDB Setup:**
   - Register for an account at [TMDB](https://www.themoviedb.org/).
   - Get your API key and add it to the environment variables in `.env`.

   ```env
   REACT_APP_TMDB_API_KEY=your-tmdb-api-key
   ```

5. **Run the app:**

   ```bash
   npm start
   ```

   The app will be running at `http://localhost:3000`.

6. **Deploy to Firebase:**

   - Install Firebase CLI:

     ```bash
     npm install -g firebase-tools
     ```

   - Login to Firebase:

     ```bash
     firebase login
     ```

   - Deploy the app:

     ```bash
     firebase deploy
     ```

## Bug Fixes

- Fixed Sign-Up display name issue.
- Implemented redirect from `/browse` to login if the user is not authenticated.
- Unsubscribed from the `onAuthStateChanged` callback for better performance.
  
## UI Structure

- **MainContainer:**
  - Includes the background video (movie trailer).
  - Movie title and description.

- **SecondaryContainer:**
  - Displays movie list with movie cards for suggestions.

## Acknowledgements

- **TMDB API** for providing movie data.
- **Firebase** for user authentication.
- **Gemini API** for GPT-based movie suggestions.

