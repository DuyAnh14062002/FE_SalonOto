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
import ManageCar from "./pages/AdminSalon/ManageCar";
import ManageSalon from "./pages/AdminSalon/ManageSalon";
import AdminSalonLayout from "./pages/AdminSalon/AdminSalonLayout/AdminSalonLayout";
import ResultPayment from "./pages/ResultPayment";
import Contact from "./pages/SalonOto/Contact";
import Message from "./components/Message";
import ManageUser from "./pages/AdminSalon/ManageUser";
import Booking from "./pages/SalonOto/Booking";
import Appointment from "./pages/Appointment";
import AppointmentSalon from "./pages/AdminSalon/AppointmentSalon";
import NotificationDetailSalon from "./pages/SalonOto/NotificationDetailSalon";
import NotificationDetailUser from "./pages/NotificationDetailUser/";
import Room from "./pages/Room";
import Statistic from "./pages/AdminSalon/Statistic";
import ManageMaintenance from "./pages/AdminSalon/ManageMaintenance";
import ManageGuarantee from "./pages/AdminSalon/ManageGuarantee";
import ProcessForm from "./pages/ProcessForm";
import ManageProcess from "./pages/AdminSalon/ManageProcess";
import ManageStage from "./pages/AdminSalon/ManageStage";
import News from "./pages/News";
import DetailNews from "./pages/DetailNews";
import ManageTransaction from "./pages/AdminSalon/ManageTransaction";
import ListMaintenance from "./pages/SalonOto/ListMaintenance";
import ManageBuyCar from "./pages/AdminSalon/ManageBuyCar";
import ManageBuyMaintenance from "./pages/AdminSalon/ManageBuyMaintenance";
import ManageAccessory from "./pages/AdminSalon/ManageAccessory";
import HistoryTransaction from "./components/HistoryTransaction/HistoryTransaction";
import PostSellCar from "./components/PostSellCar";
import CarPostDetail from "./components/CarPostDetail";
import ManageProcessDealer from "./pages/AdminSalon/ManageProcessDealer";
import DetailProcess from "./components/DetailProcess/DetailProcess";
import HistoryTransactionDealer from "./components/HistoryTransactionDealer";
import SalonAppointment from "./components/SalonAppointment/SalonAppointment";
import ManageAccessoryTransaction from "./pages/AdminSalon/ManagaAccessoryTransaction/ManagaAccessoryTransaction";
import ManagePromotion from "./pages/ManagePromotion";
import PromotionDetail from "./components/PromotionDetail";
import ListAllPromotion from "./components/ListAllPromotion";
import ManageSalonAdmin from "./pages/ManageSalonAdmin/ManageSalonAdmin";
import ManageUserAdmin from "./pages/ManageUserAdmin";
import Accessory from "./pages/SalonOto/Accessory";
import ManagePayment from "./pages/AdminSalon/ManagePayment";
import HistoryPayment from "./components/HistoryPayment";
import SatisticDealer from "./components/SatisticDealer";
import MyCar from "./components/MyCar/MyCar";

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
      {
        path: path.callBackGoogle,
        element: <LoginSocial />,
      },
      {
        path: path.callBackFacebook,
        element: <LoginSocialFaceBook />,
      },
      {
        path: path.verifyTokenEMail,
        element: <VerifyTokenEmail />,
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
        path: path.listMaintenance,
        element: <ListMaintenance />,
      },
      {
        path: path.appointment,
        element: <Appointment />,
      },

      {
        path: path.getResultPayment,
        element: <ResultPayment />,
      },
      {
        path: path.notificationDetailSalon,
        element: <NotificationDetailSalon />,
      },
      {
        path: path.notificationDetailUser,
        element: <NotificationDetailUser />,
      },
      {
        path: path.room,
        element: <Room />,
      },
      {
        path: path.historyPayment,
        element: <HistoryPayment />,
      },
      {
        path: path.booking,
        element: <Booking />,
      },
      {
        path: path.myCar,
        element: <MyCar />,
      },
      {
        path: path.postSellCar,
        element: <PostSellCar />,
      },
      {
        path: path.carPostDetail,
        element: <CarPostDetail />,
      },
      {
        path: path.message,
        element: <Message />,
      },
      {
        path: path.historyTransaction,
        element: <HistoryTransaction />,
      },
      {
        path: path.historyTransactionDealer,
        element: <HistoryTransactionDealer />,
      },
      {
        path: path.salonAppointment,
        element: <SalonAppointment />,
      },
      {
        path: path.satisticDealer,
        element: <SatisticDealer />,
      },
      {
        path: path.detailProcess,
        element: <DetailProcess />,
      },
      {
        path: path.accessory,
        element: <Accessory />,
      },
      //===========Route admin salon=================
      {
        path: "/adminSalon",
        element: <AdminSalonLayout />,
        children: [
          {
            path: "",
            element: <Statistic />,
          },
          {
            path: path.manageSalon,
            element: <ManageSalon />,
          },
          {
            path: path.manageCar,
            element: <ManageCar />,
          },
          {
            path: path.manageUser,
            element: <ManageUser />,
          },
          {
            path: path.appointmentSalon,
            element: <AppointmentSalon />,
          },
          {
            path: path.statistic,
            element: <Statistic />,
          },
          {
            path: path.manageMaintenance,
            element: <ManageMaintenance />,
          },
          {
            path: path.manageGuarantee,
            element: <ManageGuarantee />,
          },
          {
            path: path.manageTransaction,
            element: <ManageTransaction />,
          },
          {
            path: path.manageBuyCar,
            element: <ManageBuyCar />,
          },
          {
            path: path.manageBuyMaintenance,
            element: <ManageBuyMaintenance />,
          },
          {
            path: path.manageAccessory,
            element: <ManageAccessory />,
          },
          {
            path: path.manageProcess,
            element: <ManageProcess />,
          },
          {
            path: path.manageStage,
            element: <ManageStage />,
          },
          {
            path: path.processForm,
            element: <ProcessForm />,
          },
          {
            path: path.manageDealerProcess,
            element: <ManageProcessDealer />,
          },
          {
            path: path.manageAccessoryTransaction,
            element: <ManageAccessoryTransaction />,
          },
          {
            path: path.managePromotion,
            element: <ManagePromotion />,
          },
          {
            path: path.managePayment,
            element: <ManagePayment />,
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
          {
            path: path.manageSalonAdmin,
            element: <ManageSalonAdmin />,
          },
          {
            path: path.manageUserAdmin,
            element: <ManageUserAdmin />,
          },
        ],
      },
    ],
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
    path: path.contact,
    element: <Contact />,
  },

  {
    path: path.listSalon,
    element: <ListSalonOto />,
  },
  {
    path: path.ListPackage,
    element: <ListPackage />,
  },
  {
    path: path.news,
    element: <News />,
  },
  {
    path: path.detailNew,
    element: <DetailNews />,
  },
  {
    path: path.promotionDetail,
    element: <PromotionDetail />,
  },
  {
    path: path.listPromotion,
    element: <ListAllPromotion />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
