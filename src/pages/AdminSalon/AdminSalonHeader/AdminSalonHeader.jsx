import React, { useEffect, useState } from "react";
import "./AdminSalonHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../../constants/path";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import { useSocketContext } from "../../../context/SocketContext";
import telephoneRing from "../../../assets/sounds/telephone_ring.mp3";
import notificationSound from "../../../assets/sounds/notification.mp3";
import { Button, Modal } from "react-bootstrap";

const intervalDuration = 3000;
let timerId;
let timeOut;
export default function AdminSalonHeader() {
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const { socket } = useSocketContext();
  const [salon, setSalon] = useState({});
  const navigate = useNavigate();
  const [showCall, setShowCall] = useState(false);
  const handleCloseCall = () => setShowCall(false);
  const handleShowCall = () => setShowCall(true);
  const [dataResponseFromVideoCall, setDataResponseFromVideoCall] = useState(
    {}
  );
  const soundPhoneRing = new Audio(telephoneRing);
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
    socket?.on("notification", (data) => {
      const sound = new Audio(notificationSound);
      sound.play();
      toast.success(data);
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
      clearTimeout(timeOut);
      toast.error("Cuộc gọi đã kết thúc");
      handleEndCall();
    });
    return () => {
      socket?.off("receiveEndCallVideo");
    };
  }, [socket]);
  const handleEndCall = () => {
    clearInterval(timerId);
    handleCloseCall();
  };
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
    <nav className="topnav shadow navbar-light d-flex">
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
      <div className="navbar-brand">
        <Link to="/admin" className="text-decoration-none text-white">
          <i className="fa-solid fa-car"></i>{" "}
          <span className="mx-2">SALON OTO ADMIN</span>
        </Link>
      </div>
      <div className="nav-right">
        <div className="btn-group mr-auto"></div>

        <div className="btn-group">
          <div className="dropdown">
            <button
              type="button"
              className="btn dropdown-toggle text-white d-flex justify-content-between align-items-center"
              data-bs-toggle="dropdown"
            >
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "6px",
                }}
              >
                <img
                  src={userInfo?.avatar}
                  alt=""
                  className="w-100 h-100 object-cover rounded-circle"
                />
              </div>
              <span className="text-white">{userInfo?.fullname}</span>
            </button>
            <div className="dropdown-menu dropdown-menu-right ">
              <Link className="dropdown-item" to="/profile">
                Tài khoản
              </Link>
              <Link className="dropdown-item" to="/">
                Thoát
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
