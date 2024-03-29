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
import LoginAdmin from "./pages/LoginAdmin";
import HomeAdmin from "./pages/HomeAdmin";
import ManagePackage from "./pages/ManagePackage";
import AdminLayout from "./layouts/AdminLayout";
import ManageFeature from "./pages/ManageFeature";
import ListSalonOto from "./pages/SalonOto/ListSalonOto";
import HomePageSalon from "./pages/SalonOto/HomePageSalon";
import DetailCar from "./pages/SalonOto/DetailCar";
import ListPackage from "./pages/SalonOto/ListPackage";
import AdminSalon from "./pages/AdminSalon/AdminSalonHeader/AdminSalonHeader";
import ManageCar from "./pages/AdminSalon/ManageCar";
import ManageSalon from "./pages/AdminSalon/ManageSalon";
import AdminSalonLayout from "./pages/AdminSalon/AdminSalonLayout/AdminSalonLayout";
import ResultPayment from "./pages/ResultPayment";
import Contact from "./pages/SalonOto/Contact";
import Booking from "./pages/SalonOto/Booking";
import Appointment from "./pages/Appointment";
import AppointmentSalon from "./pages/AdminSalon/AppointmentSalon";
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
      {
        path: path.appointment,
        element: <Appointment />,
      },
      {
        path: path.listSalon,
        element: <ListSalonOto />,
      },
      {
        path: path.salonOto,
        element: <HomePageSalon />,
      },
      {
        path: path.DetailCar,
        element: <DetailCar />,
      },
      {
        path: path.ListPackage,
        element: <ListPackage />,
      },
      {
        path: path.getResultPayment,
        element: <ResultPayment />,
      },
    ],
  },
  //==========Route admin===============
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: path.homeAdmin,
        element: <HomeAdmin />,
      },
      {
        path: path.managePackage,
        element: <ManagePackage />,
      },
      {
        path: path.manageFeature,
        element: <ManageFeature />,
      },
    ],
  },
  //===========Route admin salon=================
  {
    path: "/adminSalon",
    element: <AdminSalonLayout />,
    children: [
      {
        path: path.manageSalon,
        element: <ManageSalon />,
      },
      {
        path: path.manageCar,
        element: <ManageCar />,
      },
      {
        path: path.appointmentSalon,
        element: <AppointmentSalon />,
      },
    ],
  },
  {
    path: path.booking,
    element: <Booking />,
  },
  {
    path: "salonOto/contact",
    element: <Contact />,
  },
  {
    path: path.loginAdmin,
    element: <LoginAdmin />,
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
]);

export default router;
