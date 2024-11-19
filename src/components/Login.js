import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);

  const toggleSignUpForm = () => {
    setisSignInForm(!isSignInForm);
  };
  return (
    <>
      <Header />
      <div className="fullscreen-bg flex justify-center">
        <form className="bg-black bg-opacity-80 relative m-auto p-8 w-[25%] text-white transition-all duration-300 ease-in transform hover:scale-105">
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
            type="text"
            placeholder="Email address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <button className=" p-4 my-4 bg-red-600 rounded-lg font-semibold w-full">
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
