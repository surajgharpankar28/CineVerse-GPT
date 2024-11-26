/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import {
  redUserIcon,
  blueUserIcon,
  greenUserIcon,
  yellowUserIcon,
  mapErrorMessage,
} from "../utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(yellowUserIcon); // Track the selected image

  const toggleSignUpForm = () => {
    setisSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleUserIconSelect = (image) => {
    setSelectedImage(image);
  };

  const handleButtonClick = () => {
    // Validate the email and password fields using the checkValidData utility.
    // If the fields are invalid, display an error message and exit the function.
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    // Stop further execution if validation fails.
    if (message) {
      return;
    }

    // If the user is signing up (isSignInForm is false):
    if (!isSignInForm) {
      // Create a new user with the provided email and password using Firebase Authentication.
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Retrieve the signed-up user object.
          const user = userCredential.user;

          // Update the user's profile with the provided name.
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: selectedImage || redUserIcon, // Pass the selected image URL
          })
            .then(() => {
              // After successfully updating the profile, extract the current user's details.
              const { uid, email, displayName, photoURL } = auth.currentUser;

              // Dispatch the user details to a Redux store (or other state management tool).
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // console.log("Sign Up Success");
            })
            .catch((error) => {
              // Handle any errors that occur while updating the profile.
              setErrorMessage("Failed to update profile: " + error.message);
            });
        })
        .catch((error) => {
          // Handle errors during the sign-up process (e.g., invalid email, weak password).

          const errorCode = error.code;
          //mapErrorMessage is in constants.js
          const errorMessage = mapErrorMessage(errorCode, error.message); // Map error to user-friendly message
          setErrorMessage(errorMessage);
        });
    }
    // If the user is signing in (isSignInForm is true):
    else {
      // Authenticate the user with the provided email and password.
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Retrieve the signed-in user object.
          const user = userCredential.user; // eslint-disable-line
        })
        .catch((error) => {
          // Handle errors during the sign-in process (e.g., incorrect password).
          const errorCode = error.code;
          //mapErrorMessage is in constants.js
          const errorMessage = mapErrorMessage(errorCode, error.message); // Map error to user-friendly message
          setErrorMessage(errorMessage);
        });
    }

    // Log the validation message for debugging (if any).
    // console.log(message);
  };

  return (
    <>
      <Header />
      <div className="fullscreen-bg flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-80 mt-[15%]  relative md:m-auto p-8 md:w-[50%] w-[90%] text-white transition-all duration-300 ease-in transform hover:scale-105"
        >
          <h1 className="font-bold mt-4 mb-2 text-2xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm ? (
            <>
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-700"
              />
              <div className="flex justify-start">
                <img
                  className={`w-8 h-8 mr-2 cursor-pointer ${
                    selectedImage === yellowUserIcon &&
                    "border-2 border-blue-500"
                  }`}
                  src={yellowUserIcon}
                  alt="Yellow User Icon"
                  onClick={() => handleUserIconSelect(yellowUserIcon)}
                />
                <img
                  className={`w-8 h-8 mr-2 cursor-pointer ${
                    selectedImage === redUserIcon && "border-2 border-blue-500"
                  }`}
                  src={redUserIcon}
                  alt="Red User Icon"
                  onClick={() => handleUserIconSelect(redUserIcon)}
                />
                <img
                  className={`w-8 h-8 mr-2 cursor-pointer ${
                    selectedImage === blueUserIcon && "border-2 border-blue-500"
                  }`}
                  src={blueUserIcon}
                  alt="Blue User Icon"
                  onClick={() => handleUserIconSelect(blueUserIcon)}
                />
                <img
                  className={`w-8 h-8 mr-2 cursor-pointer ${
                    selectedImage === greenUserIcon &&
                    "border-2 border-blue-500"
                  }`}
                  src={greenUserIcon}
                  alt="Green User Icon"
                  onClick={() => handleUserIconSelect(greenUserIcon)}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className="font-semibold text-red-600">{errorMessage}</p>
          {!isSignInForm ? (
            <small class="text-gray-500">
              <strong>Note:</strong> The password must:
              <ul className="list-disc pl-5">
                <li>Be at least 8 characters long.</li>
                <li>Contain at least one uppercase letter.</li>
                <li>Contain at least one lowercase letter.</li>
                <li>Contain at least one number</li>
              </ul>
            </small>
          ) : (
            ""
          )}
          <button
            className=" p-4 my-4 bg-yellow-400 text-black rounded-lg font-semibold w-full"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p>
            {isSignInForm ? (
              <>
                New to Cineverse?{" "}
                <span
                  onClick={toggleSignUpForm}
                  className="cursor-pointer text-blue-500"
                >
                  Sign Up Now
                </span>
              </>
            ) : (
              <>
                Already a user?{" "}
                <span
                  onClick={toggleSignUpForm}
                  className="cursor-pointer text-blue-500"
                >
                  Sign In Now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
