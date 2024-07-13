import React, { useEffect, useState } from "react";
import "./HeaderSalon.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import notificationApi from "../../apis/notification.api";
import salonApi from "../../apis/salon.api";
import { formatTimeDifference } from "../../utils/common";
import { toast } from "react-toastify";
import notificationSound from "../../assets/sounds/notification.mp3";
import { useSocketContext } from "../../context/SocketContext";
import telephoneRing from "../../assets/sounds/telephone_ring.mp3";
import { path } from "../../constants/path";

const intervalDuration = 3000;
let timerId;
let timeOut;
export default function HeaderSalon() {
  const idSalon = localStorage.getItem("idSalon") || "";
  const userIdSalon = localStorage.getItem("userIdSalon");
  const userInfor = JSON.parse(localStorage.getItem("profile"));
  const [salon, setSalon] = useState({});
  const soundPhoneRing = new Audio(telephoneRing);
  const [listNotification, setListNotification] = useState([]);
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const [showCall, setShowCall] = useState(false);
  const handleCloseCall = () => setShowCall(false);
  const handleShowCall = () => setShowCall(true);
  const [dataResponseFromVideoCall, setDataResponseFromVideoCall] = useState(
    {}
  );
  console.log("listNotification", listNotification);
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
    socket?.on("notification", (data) => {
      const sound = new Audio(notificationSound);
      sound.play();
      toast.success(data);
      if (salon.salon_id === idSalon) {
        fetchAllNotificationSalon();
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salon, socket]);
  useEffect(() => {
    socket?.on("receiveEndCallVideo", () => {
      handleEndCall();
      clearTimeout(timeOut);
      toast.error("Cuộc gọi đã kết thúc");
    });
    return () => {
      socket?.off("receiveEndCallVideo");
    };
  }, [socket]);

  const backListSalon = () => {
    navigate("/listSalon");
  };
  const handleMessage = () => {
    navigate("/message");
  };
  const HandleMessageNavigate = () => {
    navigate("/message");
  };
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
  const handleEndCall = () => {
    clearInterval(timerId);
    handleCloseCall();
  };
  const numberOfNotification = listNotification?.filter(
    (notification) => !notification.read
  ).length;
  const handleDetailNotification = async (id, idAppoint) => {
    try {
      await notificationApi.updateNotificationSalon({
        id: id,
        salonId: idSalon,
      });
      fetchAllNotificationSalon();
      navigate(`/adminSalon/appointment`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNotify = async (id) => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa thông báo?");
      if (!confirm) return;
      await notificationApi.deleteNotificationSalon({
        id: id,
        salonId: idSalon,
      });
      const newListNotification = listNotification?.filter(
        (notification) => notification.id !== id
      );
      setListNotification(newListNotification);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigateDetail = (id) => {
    navigate(`/CarPostDetail/${id}`);
  };
  const handleBlockUser = async (postId, id) => {
    try {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn chặn người dùng này?"
      );
      if (!confirm) return;
      let res = await salonApi.blockUser(postId);

      if (res?.data?.status === "success") {
        //loading new notification after block
        await notificationApi.deleteNotificationSalon({
          id: id,
          salonId: idSalon,
        });
        const newListNotification = listNotification?.filter(
          (notification) => notification.id !== id
        );
        setListNotification(newListNotification);
        toast.success("Chặn người dùng thành công");
      } else {
        toast.error("Chặn người dùng thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateReadNotification = async (id) => {
    try {
      await notificationApi.updateNotificationSalon({
        id: id,
        salonId: salon.salon_id,
      });
      fetchAllNotificationSalon();
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
          {listNotification?.length > 0 ? (
            listNotification.map((notification) => {
              const formattedTimeDifference = formatTimeDifference(
                notification.create_at
              );
              return (
                <button key={notification.id} className="notify p-2">
                  {(notification.types === "appointment" ||
                    notification.types === "appointment-process") && (
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
                            className="fa-regular fa-trash-can text-danger mx-2"
                            title="Xóa thông báo"
                            onClick={() => handleDeleteNotify(notification.id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  )}
                  {notification.types === "request" && (
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
                            className="fa-regular fa-trash-can text-danger mx-2"
                            title="Xóa thông báo"
                            onClick={() => handleDeleteNotify(notification.id)}
                          ></i>
                        </div>
                        {notification?.types === "request" ? (
                          <div className="Request-box">
                            <button
                              className="block-user"
                              onClick={() => {
                                handleBlockUser(
                                  notification?.data,
                                  notification?.id
                                );
                                updateReadNotification(notification.id);
                              }}
                            >
                              Chặn
                            </button>
                            <button
                              className="see-detail"
                              onClick={() => {
                                handleNavigateDetail(notification.data);
                                updateReadNotification(notification.id);
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
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
                        onClick={() => updateReadNotification(notification.id)}
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          className="notify-title"
                          style={notification.read ? {} : { fontWeight: "500" }}
                          onClick={() =>
                            updateReadNotification(notification.id)
                          }
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
                  {notification.types === "salon-payment" && (
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          notification.avatar ||
                          "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BCnRaxZCfRkAX8a1rU3&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfD29zpAHOxBSwhZkEnW47vMd-hoaCLBDDjywB4cGeF7YA&oe=662C6938"
                        }
                        alt=""
                        className="rounded-circle"
                        style={{ width: "56px", height: "56px" }}
                        onClick={() => {
                          updateReadNotification(notification.id);
                          navigate("/adminSalon/managePayment");
                        }}
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          className="notify-title "
                          style={notification.read ? {} : { fontWeight: "500" }}
                          onClick={() => {
                            updateReadNotification(notification.id);
                            navigate("/adminSalon/managePayment");
                          }}
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
                            className="fa-regular fa-trash-can text-danger mx-2"
                            title="Xóa thông báo"
                            onClick={() => handleDeleteNotify(notification.id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  )}
                  {notification.types === "connection" && (
                    <div className="d-flex">
                      <img
                        src={
                          notification.avatar ||
                          "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BCnRaxZCfRkAX8a1rU3&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfD29zpAHOxBSwhZkEnW47vMd-hoaCLBDDjywB4cGeF7YA&oe=662C6938"
                        }
                        alt=""
                        className="rounded-circle"
                        style={{ width: "56px", height: "56px" }}
                        onClick={() => {
                          navigate("/adminSalon/manageDealerProcess");
                          updateReadNotification(notification.id);
                        }}
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          className="notify-title"
                          style={notification.read ? {} : { fontWeight: "500" }}
                          onClick={() => {
                            navigate("/adminSalon/manageDealerProcess");
                            updateReadNotification(notification.id);
                          }}
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
                            className="fa-regular fa-trash-can text-danger mx-2"
                            title="Xóa thông báo"
                            onClick={() => handleDeleteNotify(notification.id)}
                          ></i>
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
  return (
    <div className="container-header">
      <div className="back-home">
        <i className="fa-solid fa-arrow-left" onClick={backListSalon}></i>
      </div>
      {/* <div
        className="logo"
        style={{
          backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/logo.png?1699270212851.jpg)`,
        }}
      ></div> */}
      <div className="main-menu">
        <ul className="d-flex align-items-center">
          <Link to={`/salonOto/${idSalon}`} className="item-menu">
            Trang chủ
          </Link>
          <Link className="item-menu">Giới thiệu</Link>
          <Link className="item-menu">Khuyến mãi</Link>
          <Link className="item-menu" to={path.accessory}>
            Phụ tùng
          </Link>
          <Link className="item-menu" to={path.listMaintenance}>
            Bảo dưỡng
          </Link>
          <Link to={path.contact} className="item-menu">
            Liên hệ
          </Link>
          {userIdSalon === userInfor?.user_id ? (
            <div className="messenger mx-3" onClick={HandleMessageNavigate}>
              <i className="fa-brands fa-facebook-messenger"></i>
            </div>
          ) : (
            <button onClick={handleMessage}>Nhắn tin với salon</button>
          )}
          {salon?.salon_id === idSalon && (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose={true}
            >
              <div
                className="text-dark position-relative"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-regular fa-bell fs-4"></i>
                <span
                  className="badge rounded-pill badge-notification bg-danger position-absolute"
                  style={{ top: "-10px", left: "17px" }}
                >
                  {numberOfNotification > 0 && numberOfNotification}
                </span>
              </div>
            </OverlayTrigger>
          )}
        </ul>
      </div>
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
    </div>
  );
}
