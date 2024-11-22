import React, { useEffect } from "react";
import userIcon from "../assests/images/userIcon.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  //onAuthStateChanged is a Firebase Authentication method used to observe changes in a user's authentication state. It triggers a callback whenever:
  // A user signs in.
  // A user signs out.
  // The current user's ID token is refreshed.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signIn/signUp
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
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
    <div className="flex justify-between w-screen absolute bg-gradient-to-b from-black ">
      <h1 className="bebas-neue-regular text-yellow-400 text-[5rem] px-4">
        CINEVERSE
      </h1>
      {user && (
        <div className="flex p-2 my-auto">
          <img className="w-8 h-8 mr-2" src={userIcon} alt="usericon" />
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
