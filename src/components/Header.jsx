/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import { toggleGptSearchView } from "../utils/slices/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const gptView = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    //Toggle by GPT Search
    dispatch(toggleGptSearchView());
  };

  //onAuthStateChanged is a Firebase Authentication method used to observe changes in a user's authentication state. It triggers a callback whenever:
  // A user signs in.
  // A user signs out.
  // The current user's ID token is refreshed.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signIn/signUp
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // Navigate to the "/browse" page after successful sign-up.
        navigate("/browse");
      } else {
        // when User signed out
        dispatch(removeUser());
        navigate("/login");
      }
    });

    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // sm:bg-blue-900 md:bg-green-500
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-12 py-4 bg-transparent shadow-lg z-50 absolute">
      {/* Logo Section */}
      <h1 className="text-yellow-400 text-4xl md:text-6xl font-bold tracking-wide bebas-neue-regular">
        CINEVERSE
      </h1>

      {/* User Section */}
      {user && (
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          {/* GPT Button */}
          <button
            className="flex bg-gradient-to-l from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold text-sm md:text-md px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={handleGptSearchClick}
          >
            {gptView ? (
              "Homepage"
            ) : (
              <span className="flex items-center">
                <img
                  className="w-5 h-5 mr-2"
                  src="/gemini_icon.png"
                  alt="Gemini Icon"
                />
                GPT Search
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <img
              className="w-9 h-9 md:w-9 md:h-9 rounded-lg border-2 border-yellow-400 shadow-md"
              src={user.photoURL}
              alt="User Profile"
            />
            <button
              className="text-gray-300 hover:text-yellow-400 font-medium text-sm md:text-md transition-all duration-200"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
