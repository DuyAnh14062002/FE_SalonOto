import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { path } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
import authApi from "../../apis/auth.api";
import purchaseApi from "../../apis/purchase.api";
import { useAuthContext } from "./../../context/AuthContext";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { formatTimeDifference } from "../../utils/common";
import notificationApi from "../../apis/notification.api";
import { toast } from "react-toastify";
import notificationSound from "../../assets/sounds/notification.mp3";
import { useSocketContext } from "../../context/SocketContext";
import telephoneRing from "../../assets/sounds/telephone_ring.mp3";
import userApi from "../../apis/user.api";
const intervalDuration = 3000;
let timerId;
let timeOut;
export default function Header(props) {
  const { otherPage } = props;
  const soundPhoneRing = new Audio(telephoneRing);
  const { socket } = useSocketContext();
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const [dataResponseFromVideoCall, setDataResponseFromVideoCall] = useState(
    {}
  );
  const [showCall, setShowCall] = useState(false);
  const handleCloseCall = () => setShowCall(false);
  const handleShowCall = () => setShowCall(true);
  const [listNotification, setListNotification] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { setProfile } = useAuthContext();

  useEffect(() => {
    const loading = async () => {
      let res = await purchaseApi.getPurchase();
      if (res?.data?.purchasedPackages) {
        setPurchasedPackages(res.data.purchasedPackages);
      }
    };
    loading();
  }, []);

  //socket
  useEffect(() => {
    socket?.on("notification", (data) => {
      // console.log("data", data);
      const sound = new Audio(notificationSound);
      sound.play();
      toast.success(data);
      fetchAllNotificationUser();
    });
    socket?.on("receiveCallVideo", (data) => {
      soundPhoneRing.play();
      timerId = setInterval(() => {
        soundPhoneRing.play();
      }, intervalDuration);

      timeOut = setTimeout(() => {
        handleEndCall();
      }, 24000);
      handleShowCall();
      setDataResponseFromVideoCall({
        senderName: data.senderName,
        senderImage: data.senderImage,
        linkVideoCall: data.linkVideoCall,
        senderId: data.senderId,
      });
    });

    return () => {
      socket?.off("notification");
      socket?.off("receiveCallVideo");
    };
  }, [timerId, socket]);
  useEffect(() => {
    socket?.on("receiveEndCallVideo", () => {
      toast.error("Cuộc gọi đã kết thúc");
      handleEndCall();
      clearTimeout(timeOut);
    });
    return () => {
      socket?.off("receiveEndCallVideo");
    };
  }, [socket, timeOut]);

  const fetchAllNotificationUser = async () => {
    try {
      const res = await notificationApi.getAllNotificationUser();
      // console.log("res notification user", res);
      setListNotification(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
  // console.log("listNotification", listNotification);
  let handleLogout = async () => {
    try {
      await authApi.logout({ user_id: userInfo.user_id });
      setProfile(null);
    } catch (error) {
      console.log("error:", error);
    }

    dispatch(logoutUser());
    navigate("/login");
  };
  const HandleMessage = () => {
    navigate("/message");
  };
  const handleEndCall = () => {
    clearInterval(timerId);
    clearTimeout(timeOut);
    handleCloseCall();
  };
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
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa thông báo?");
      if (!confirm) return;

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
  const handleAcceptInvite = async (id, token) => {
    try {
      await notificationApi.updateNotificationUser({
        id: id,
      });
      await userApi.acceptInvite({
        token,
      });
      toast.success("Chấp nhận lời mời thành công");
      fetchAllNotificationUser();
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
                  {(notification.types === "appointment" ||
                    notification.types === "permission") && (
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
                  )}
                  {notification.types === "invite" && (
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          notification.avatar ||
                          "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BCnRaxZCfRkAX8a1rU3&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfD29zpAHOxBSwhZkEnW47vMd-hoaCLBDDjywB4cGeF7YA&oe=662C6938"
                        }
                        alt=""
                        className="rounded-circle"
                        style={{ width: "56px", height: "56px" }}
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          className="notify-title"
                          style={notification.read ? {} : { fontWeight: "500" }}
                        >
                          {notification.description}
                        </div>
                        <div
                          className={
                            notification.read
                              ? "text-muted mt-1 d-flex justify-content-between align-items-center"
                              : "text-primary mt-1 d-flex justify-content-between align-items-center"
                          }
                          style={notification.read ? {} : { fontWeight: "500" }}
                        >
                          <span>{formattedTimeDifference}</span>
                          <div className="d-flex justify-content-end align-items-center">
                            {!notification.read && (
                              <i
                                className="fa-solid fa-check text-success mx-2"
                                title="Chấp nhận"
                                onClick={() =>
                                  handleAcceptInvite(
                                    notification.id,
                                    notification.data
                                  )
                                }
                              ></i>
                            )}

                            <i
                              className="fa-regular fa-trash-can text-danger mx-2"
                              title="Xóa thông báo"
                              onClick={() =>
                                handleDeleteNotify(notification.id)
                              }
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
  // video call
  const handleAnswer = () => {
    socket?.emit("answerCallVideo", {
      receiverId: dataResponseFromVideoCall.senderId,
      linkVideoCall: dataResponseFromVideoCall.linkVideoCall,
    });
    handleCloseCall();
    clearInterval(timerId);
    navigate(dataResponseFromVideoCall.linkVideoCall);
  };
  const handleRefuse = () => {
    handleEndCall();
    socket?.emit("refuseCallVideo", {
      receiverId: dataResponseFromVideoCall.senderId,
    });

    handleCloseCall();
  };
  return otherPage === true ? (
    <nav style={{ backgroundColor: "rgb(1 37 255 / 70%)", padding: "5px 5px" }}>
      <Modal show={showCall} backdrop="static">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={dataResponseFromVideoCall.senderImage}
              alt="image_user"
              className="w-25 h-25 rounded-circle"
            />
            <div className="mt-3 fw-bold fs-3">
              {dataResponseFromVideoCall.senderName} đang gọi đến bạn{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleRefuse}>
            Từ chối
          </Button>
          <Button variant="success" className="mx-3" onClick={handleAnswer}>
            Trả lời
          </Button>
        </Modal.Footer>
      </Modal>
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
          <Link to="/appointment">Lịch hẹn</Link>
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
      <Modal show={showCall} backdrop="static">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={dataResponseFromVideoCall.senderImage}
              alt="image_user"
              className="w-25 h-25 rounded-circle"
            />
            <div className="mt-3 fw-bold fs-3">
              {dataResponseFromVideoCall.senderName} đang gọi đến bạn{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleRefuse}>
            Từ chối
          </Button>
          <Button variant="success" className="mx-3" onClick={handleAnswer}>
            Trả lời
          </Button>
        </Modal.Footer>
      </Modal>
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
          <Link to="/appointment">Lịch hẹn</Link>
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
