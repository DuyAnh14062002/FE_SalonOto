import React, { useEffect, useState } from "react";
import "./HeaderSalon.scss";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import notificationApi from "../../apis/notification.api";
import salonApi from "../../apis/salon.api";
import { formatTimeDifference } from "../../utils/common";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
export default function HeaderSalon() {
  const idSalon = localStorage.getItem("idSalon") || "";
  const userIdSalon = localStorage.getItem("userIdSalon")
  const userInfor = JSON.parse(localStorage.getItem("profile"))
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [salon, setSalon] = useState({});
  const [listNotification, setListNotification] = useState([]);
  const navigate = useNavigate();
  const backListSalon = () => {
    navigate("/listSalon");
  };
  const handleMessage = () => {
    navigate("/message")
  }
  const HandleMessageNavigate = () =>{
    navigate("/message")
  }
  const fetchAllNotificationSalon = async () => {
    try {
      const res = await notificationApi.getAllNotificationSalon({
        salonId: idSalon,
      });
      setListNotification(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getSalonInfo = async () => {
      try {
        const res = await salonApi.getSalonInfor();
        setSalon(res.data.salon);
      } catch (error) {
        console.log(error);
      }
    };
    getSalonInfo();
  }, []);

  useEffect(() => {
    if (salon?.salon_id === idSalon) {
      fetchAllNotificationSalon();
    }
  }, [salon?.salon_id, idSalon]);
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
        if (salon?.salon_id === idSalon) {
          fetchAllNotificationSalon();
        }
      });
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, salon]);

  const numberOfNotification = listNotification.filter(
    (notification) => !notification.read
  ).length;
  const handleDetailNotification = async (id, idAppoint) => {
    try {
      await notificationApi.updateNotificationSalon({
        id: id,
        salonId: idSalon,
      });
      if (idAppoint) {
        navigate(`/notification-salon/${idAppoint}`);
      } else {
        navigate(`/notification-salon/b8e75977-48c9-4a30-83c8-e88e7c8d0909`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteNotify = async (id) => {
    try {
      await notificationApi.deleteNotificationSalon({
        id: id,
        salonId: idSalon,
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
                        className="notify-title "
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

  return (
    <div className="container-header">
      <div className="back-home">
        <i className="fa-solid fa-arrow-left" onClick={backListSalon}></i>
      </div>
      <div
        className="logo"
        style={{
          backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/logo.png?1699270212851.jpg)`,
        }}
      ></div>
      <div className="main-menu">
        <ul className="d-flex align-items-center">
          <Link to={`/salonOto/${idSalon}`} className="item-menu">
            Trang chủ
          </Link>
          <Link className="item-menu">Giới thiệu</Link>
          <Link className="item-menu">Tin tức</Link>
          <Link className="item-menu">Dịch vụ</Link>
          <Link className="item-menu">Bảo dưỡng</Link>
          <Link to="/salonOto/contact" className="item-menu">
            Liên hệ
          </Link>
          {
            userIdSalon === userInfor.user_id ? (
              <div className="messenger" onClick={HandleMessageNavigate}>
                <i class="fa-brands fa-facebook-messenger"></i>
              </div>
            ) : ( <button onClick={handleMessage}>Nhắn tin với salon</button>)
          }
          {salon?.salon_id === idSalon && (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose={true}
            >
              <div
                class="text-dark position-relative"
                style={{ cursor: "pointer" }}
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
          )}
        </ul>
      </div>
    </div>
  );
}
