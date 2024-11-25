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
    <div className="flex px-12 z-10 justify-between w-screen absolute bg-gradient-to-b from-black ">
      <h1 className="bebas-neue-regular text-yellow-400 text-[5rem] px-4">
        CINEVERSE
      </h1>
      {user && (
        <div className="flex p-2 my-auto">
          <button
            className="bg-purple-700 text-white mx-2 px-2 rounded-md"
            onClick={handleGptSearchClick}
          >
            {gptView ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-8 h-8 mr-2 rounded-md"
            src={user.photoURL}
            alt="usericon"
          />
          {/* <p>{user.displayName}</p> */}
          <button className="text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
