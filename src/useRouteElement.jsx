import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AccountProfile from "./pages/AccountProfile";
import { path } from "./constants/path";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import VerifyTokenEmail from "./pages/VerifyTokenEmail";
import LoginSocial from "./components/LoginSocial";
import LoginSocialFaceBook from "./components/LoginSocial/LoginSocialFaceBook";
import ListSalonOto from "./pages/SalonOto/ListSalonOto";
import HomePageSalon from "./pages/SalonOto/HomePageSalon";
import DetailCar from "./pages/SalonOto/DetailCar";
import DetailPackage from "./pages/SalonOto/DetailPackage"

function ProtectedRoute() {
  const isAuthenticated = useSelector(
    (state) => state.userSlice.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
function RejectedRoute() {
  const isAuthenticated = useSelector(
    (state) => state.userSlice.isAuthenticated
  );

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
const router = createBrowserRouter([
  {
    path: path.verifyTokenEMail,
    element: <VerifyTokenEmail />,
  },
  {
    path: "",
    element: <RejectedRoute />,
    children: [
      {
        path: path.register,
        element: <Register />,
      },
      {
        path: path.login,
        element: <Login />,
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: path.home,
        index: true,
        element: <HomePage />,
      },
      {
        path: path.profile,
        element: <AccountProfile />,
      },
    ],
  },
  {
    path: path.callBackGoogle,
    element: <LoginSocial />,
  },
  {
    path: path.callBackFacebook,
    element: <LoginSocialFaceBook />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path:path.listSalon,
    element:<ListSalonOto/>
  },
  {
    path:path.salonOto,
    element:<HomePageSalon/>
  },
  {
    path:path.DetailCar,
    element:<DetailCar/>
  },
  {
    path: path.DetailPackage,
    element: <DetailPackage/>
  }
]);

export default router;
