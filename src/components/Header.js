import React from "react";
import userIcon from "../assests/images/userIcon.webp";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
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
