//User Icons
export const redUserIcon =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";
export const yellowUserIcon =
  "https://wallpapers.com/images/high/netflix-profile-pictures-5yup5hd2i60x7ew3.webp";
export const blueUserIcon =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp";
export const greenUserIcon =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.webp";

//   FireBase Error message
export const mapErrorMessage = (errorCode, defaultMessage) => {
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-credential":
      "Invalid credentials. Please check your login details or try signing in again.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 8 characters.",
    "auth/user-disabled":
      "This account has been disabled by the administrator.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
    "auth/too-many-requests":
      "Too many attempts. Please try again later or reset your password.",
    "auth/operation-not-allowed": "Sign-in is disabled for this account.",
  };

  // Return mapped message or default Firebase error message
  return errorMessages[errorCode] || defaultMessage;
};

//API Options

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGVlOTg4N2NhM2NmZjQ5ZDUzODE0ZjA2ZTg0NjEyZiIsIm5iZiI6MTczMjI2OTIwMS44OTg4NzUsInN1YiI6IjY3NDA1MjQzZGFlMmU2YTkzODI1NWNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jx3HF0kOPdou0O45MHOOkxFJElZsvbNX6lmi3XuEyxQ",
  },
};

//IMG CDN for TMDB
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
