import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { path } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
import authApi from "../../apis/auth.api";
import purchaseApi from "../../apis/purchase.api";
import {useAuthContext} from "./../../context/AuthContext"
import { OverlayTrigger, Popover } from "react-bootstrap";
import { formatTimeDifference } from "../../utils/common";
import notificationApi from "../../apis/notification.api";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

export default function Header(props) {
  const { otherPage } = props;
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [listNotification, setListNotification] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {setProfile} = useAuthContext()
  let handleLogout = async () => {
    try {
      await authApi.logout({ user_id: userInfo.user_id });
      setProfile(null)
    } catch (error) {
      console.log("error:", error);
    }

    dispatch(logoutUser());
    navigate("/login");
  };
  const HandleMessage = () =>{
     navigate("/message")
  }
  useEffect(() =>{
    const loading = async() =>{
         let res = await purchaseApi.getPurchase()
         if(res?.data?.purchasedPackages){
          setPurchasedPackages(res.data.purchasedPackages)
         }
        }})
  const fetchAllNotificationUser = async () => {
    try {
      const res = await notificationApi.getAllNotificationUser();
      setListNotification(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  //socket
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: {
        userId: profile.user_id,
      },
    });
    socket.on("connect", () => {
      console.log("socket connected");
      socket.on("notification", (data) => {
        toast.success(data);
        fetchAllNotificationUser();
      });
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    return () => {
      socket.disconnect();
    };
  }, [profile.user_id]);
  useEffect(() => {
    const fetchAllNotificationUser = async () => {
      try {
        const res = await notificationApi.getAllNotificationUser();
        setListNotification(res.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllNotificationUser();
  }, []);
  useEffect(() => {
    const loading = async () => {
      let res = await purchaseApi.getPurchase();
      if (res?.data?.purchasedPackages) {
        setPurchasedPackages(res.data.purchasedPackages);
      }
    };
    loading();
  }, []);

  const numberOfNotification = listNotification.filter(
    (notification) => !notification.read
  ).length;
  const handleDetailNotification = async (id, idAppoint) => {
    try {
      await notificationApi.updateNotificationUser({
        id: id,
      });
      navigate(`/notification-user/${idAppoint}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteNotify = async (id) => {
    try {
      await notificationApi.deleteNotificationUser({
        id: id,
      });
      const newListNotification = listNotification.filter(
        (notification) => notification.id !== id
      );
      setListNotification(newListNotification);
    } catch (error) {
      console.log(error);
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="fw-bold">
        Thông báo
      </Popover.Header>
      <Popover.Body>
        <div
          className="d-flex flex-column"
          style={{ width: "100%", overflowY: "scroll", maxHeight: "400px" }}
        >
          {listNotification.length > 0 ? (
            listNotification.map((notification) => {
              const timeNotify = new Date(notification.create_at);
              const timeNow = new Date();
              const timeDifference = timeNow.getTime() - timeNotify.getTime();
              const formattedTimeDifference =
                formatTimeDifference(timeDifference);
              return (
                <button key={notification.id} className="notify p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        notification.avatar ||
                        "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BCnRaxZCfRkAX8a1rU3&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfD29zpAHOxBSwhZkEnW47vMd-hoaCLBDDjywB4cGeF7YA&oe=662C6938"
                      }
                      alt=""
                      className="rounded-circle"
                      style={{ width: "56px", height: "56px" }}
                      onClick={() =>
                        handleDetailNotification(
                          notification.id,
                          notification.data
                        )
                      }
                    />
                    <div style={{ marginLeft: "10px" }}>
                      <div
                        className="notify-title"
                        style={notification.read ? {} : { fontWeight: "500" }}
                        onClick={() =>
                          handleDetailNotification(
                            notification.id,
                            notification.data
                          )
                        }
                      >
                        {notification.description}
                      </div>
                      <div
                        className={
                          notification.read
                            ? "text-muted d-flex justify-content-between align-items-center"
                            : "text-primary d-flex justify-content-between align-items-center"
                        }
                        style={notification.read ? {} : { fontWeight: "500" }}
                      >
                        <span>{formattedTimeDifference}</span>

                        <i
                          class="fa-regular fa-trash-can text-danger mx-2"
                          title="Xóa thông báo"
                          onClick={() => handleDeleteNotify(notification.id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center p-5">Không có thông báo nào</div>
          )}
        </div>
      </Popover.Body>
    </Popover>
  );
  return otherPage === true ? (
    <nav style={{ backgroundColor: "rgb(1 37 255 / 70%)", padding: "5px 5px" }}>
      <div className="nav__logo">
        <img
          src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
          alt="logo"
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
      </div>
      <ul className="nav__links">
        <li className="link">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="link">
          <Link to={path.ListPackage}>Gói dịch vụ</Link>
        </li>
        <li className="link">
          <Link to="/listSalon">Salon Oto</Link>
        </li>
        <li className="link">
          <Link to="/">Liên hệ</Link>
        </li>
        <li className="link">
          <Link to="/">Tin tức</Link>
        </li>
        {purchasedPackages && purchasedPackages.length > 0 && (
          <li className="link">
            <Link to={path.adminSalon}>Quản lý</Link>
          </li>
        )}
        <li className="link">
          <Link to="/appointment">Quản lý lịch hẹn</Link>
        </li>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          rootClose={true}
        >
          <div
            class="text-white position-relative"
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            <i class="fa-regular fa-bell fs-4"></i>
            <span
              class="badge rounded-pill badge-notification bg-danger position-absolute"
              style={{ top: "-10px", left: "17px" }}
            >
              {numberOfNotification > 0 && numberOfNotification}
            </span>
          </div>
        </OverlayTrigger>
      </ul>
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" />
        <span>
          <i className="ri-search-line"></i>
        </span>
      </div>
      <div className="container-box">
      <div className="messenger" onClick={HandleMessage}>
        <i class="fa-brands fa-facebook-messenger"></i>
      </div>
      <Link
        to={path.profile}
        className="account-profile"
        style={{ textDecoration: "none", position: "relative" }}
      >
        <span className="icon-user">
          <i className="ri-user-3-fill"></i>
        </span>
        <span style={{ fontSize: "15px" }}>
          {userInfo?.fullname || userInfo?.username}
        </span>
        <div className="profile-arrow">
          <div className="virtual_class"></div>
          <div className="arrow position-absolute"></div>
          <div className="position-absolute sub-profile">
            <Link to={path.profile}>Thông tin cá nhân</Link>
            <Link onClick={handleLogout}>Đăng xuất</Link>
          </div>
        </div>
      </Link>
      </div>
     
    </nav>
  ) : (
    <nav>
      <div className="nav__logo">
        <img
          src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
          alt="logo"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <ul className="nav__links">
        <li className="link">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="link">
          <Link to={path.ListPackage}>Gói dịch vụ</Link>
        </li>
        <li className="link">
          <Link to="/listSalon">Salon Oto</Link>
        </li>
        <li className="link">
          <Link to="/">Liên hệ</Link>
        </li>
        <li className="link">
          <Link to="/">Tin tức</Link>
        </li>
        {purchasedPackages && purchasedPackages.length > 0 && (
          <li className="link">
            <Link to={path.adminSalon}>Quản lý</Link>
          </li>
        )}
        <li className="link">
          <Link to="/appointment">Quản lý lịch hẹn</Link>
        </li>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          rootClose={true}
        >
          <div
            class="text-white position-relative"
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            <i class="fa-regular fa-bell fs-4"></i>
            <span
              class="badge rounded-pill badge-notification bg-danger position-absolute"
              style={{ top: "-10px", left: "17px" }}
            >
              {numberOfNotification > 0 && numberOfNotification}
            </span>
          </div>
        </OverlayTrigger>
      </ul>
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" />
        <span>
          <i className="ri-search-line"></i>
        </span>
      </div>
      <div className="container-box">
      <div className="messenger" onClick={HandleMessage}>
        <i class="fa-brands fa-facebook-messenger"></i>
      </div>
      <Link
        to={path.profile}
        className="account-profile"
        style={{ textDecoration: "none", position: "relative" }}
      >
        <span className="icon-user">
          <i className="ri-user-3-fill"></i>
        </span>
        <span style={{ fontSize: "15px" }}>
          {userInfo?.fullname || userInfo?.username}
        </span>
        <div className="profile-arrow">
          <div className="virtual_class"></div>
          <div className="arrow position-absolute"></div>
          <div className="position-absolute sub-profile">
            <Link to={path.profile}>Thông tin cá nhân</Link>
            <Link onClick={handleLogout}>Đăng xuất</Link>
          </div>
        </div>
      </Link>
      </div>
    </nav>
  );
}
