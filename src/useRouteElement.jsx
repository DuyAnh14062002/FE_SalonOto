import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AccountProfile from "./pages/AccountProfile/AccountProfile";
import { path } from "./constants/path";

const router = createBrowserRouter([
  {
    path: path.home,
    element: <HomePage />,
  },
  {
    path: path.register,
    element: <Register />,
  },
  {
    path: path.login,
    element: <Login />,
  },
  {
    path: path.profile,
    element: <AccountProfile />,
  },
]);

export default router;
