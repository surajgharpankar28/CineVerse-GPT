import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);

  const toggleSignUpForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleButtonClick = () => {
    //Form Validation
    setErrorMessage(
      checkValidData(email.current.value, password.current.value)
    );
    console.log(errorMessage);
  };

  return (
    <>
      <Header />
      <div className="fullscreen-bg flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-80 relative m-auto p-8 w-[25%] text-white transition-all duration-300 ease-in transform hover:scale-105"
        >
          <h1 className="font-bold mt-4 mb-2 text-2xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm ? (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
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
            className=" p-4 my-4 bg-red-600 rounded-lg font-semibold w-full"
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
