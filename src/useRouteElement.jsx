import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
