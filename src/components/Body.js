import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";
const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  //onAuthStateChanged is a Firebase Authentication method used to observe changes in a user's authentication state. It triggers a callback whenever:
  // A user signs in.
  // A user signs out.
  // The current user's ID token is refreshed.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signIn/signUp
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        // when User signed out
        dispatch(removeUser());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
