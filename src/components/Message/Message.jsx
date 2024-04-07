import React, { useState, useEffect, useCallback } from "react";
import "./Message.scss";
import { useNavigate } from "react-router-dom";
import messageApi from "../../apis/message.api";
import { useSocketContext } from "../../context/SocketContext";
import salonApi from "../../apis/salon.api";
import notificationSound from "../../assets/sounds/notification.mp3";
import phoneCallSound from "../../assets/sounds/phone_call.mp3";
import endCallSound from "../../assets/sounds/end_call.mp3";
import MessageItem from "./MessageItem";
import { randomID } from "../../utils/common";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import telephoneRing from "../../assets/sounds/telephone_ring.mp3";
import noUserImage from "../../assets/images/no-user-image.webp";

const intervalDuration = 3000;
let timerId;
let timeOut;
export default function Message() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.userSlice.userInfo);
  const soundPhoneCall = new Audio(phoneCallSound);
  const soundEndCall = new Audio(endCallSound);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [showCall, setShowCall] = useState(false);
  const idSalon = localStorage.getItem("idSalon");
  const [messages, setMessages] = useState([]);
  const { onlineUsers } = useSocketContext();
  const { socket } = useSocketContext();
  const soundPhoneRing = new Audio(telephoneRing);
  const [dataResponseFromVideoCall, setDataResponseFromVideoCall] = useState(
    {}
  );
  const [showCallForReceiver, setShowCallForReceiver] = useState(false);
  const handleNewMessage = useCallback(
    (newMessage) => {
      newMessage.shouldShake = true;
      if (
        newMessage.senderId !== user.id &&
        newMessage.receiverId !== user.id
      ) {
        loadingAllUser();
      } else {
        setMessages([newMessage, ...messages]);
      }
      const sound = new Audio(notificationSound);
      sound.play();
    },
    [messages, setMessages]
  );
  // useEffect
  useEffect(() => {
    socket?.on("newMessage", handleNewMessage);
    socket?.on("receiveAnswerCallVideo", (data) => {
      clearInterval(timerId);
      const linkVideoCall = data.linkVideoCall;
      navigate(linkVideoCall);
      window.location.reload();
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("receiveAnswerCallVideo");
    };
  }, [socket, handleNewMessage]);
  useEffect(() => {
    socket?.on("receiveRefuseCallVideo", () => {
      soundEndCall.play();
      clearTimeout(timeOut);
      clearInterval(timerId);
      toast.error("Người dùng từ chối cuộc gọi");
      handleCloseCall();
    });
    return () => {
      socket?.off("receiveRefuseCallVideo");
    };
  }, [socket, timerId, timeOut]);
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
        handleEndCallForReceiver();
      }, 24000);

      handleShowCallForReceiver();
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
      clearTimeout(timeOut);
      handleEndCallForReceiver();
      toast.error("Cuộc gọi đã kết thúc");
    });
    return () => {
      socket?.off("receiveEndCallVideo");
    };
  }, [socket]);
  useEffect(() => {
    getDetailSalon();
  }, [idSalon]);
  useEffect(() => {
    loadingAllUser();
  }, []);
  useEffect(() => {
    loadingMessage();
  }, [user, idSalon]);

  // end useEffect
  const handleCloseCallForReceiver = () => setShowCallForReceiver(false);
  const handleShowCallForReceiver = () => setShowCallForReceiver(true);
  const getDetailSalon = async () => {
    let res = await salonApi.getDetailSalon(idSalon);
    if (res?.data?.salon) {
      setUser(res.data.salon);
    }
  };

  const backHome = () => {
    navigate("/");
  };
  const handleChangeTextMessage = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = async () => {
    let res = "";
    if (user?.salon_id) {
      res = await messageApi.postMessage(user.salon_id, text);
      setText("");
    }
    if (user?.id) {
      res = await messageApi.postMessage(user.id, text);
      setText("");
    }
    if (res?.data?.message) {
      setMessages([res.data.message, ...messages]);
    }
    if (users && users.length < 1) {
      loadingAllUser();
    }
  };
  const loadingMessage = async () => {
    let res = {};
    if (user?.salon_id) {
      res = await messageApi.getMessage(user.salon_id);
    }
    if (user?.id) {
      res = await messageApi.getMessage(user.id);
    }
    if (res?.data?.messages) {
      const reversedMessages = res.data.messages.reverse();
      //dispatch(getMessage(reversedMessages))
      setMessages(reversedMessages);
    } else {
      setMessages([]);
    }
  };
  const loadingAllUser = async () => {
    let res = await messageApi.getChatingUser();
    //let res = await userApi.getAllUsers()
    if (res?.data?.chattingUsers && res.data.chattingUsers.length > 0) {
      setUsers(res.data.chattingUsers);
      if (user?.salon_id && idSalon === user.salon_id) {
        setUser(res.data.chattingUsers[0]);
      }
    }
  };
  const handleOnMessage = async (userCurrent) => {
    let res = {};
    if (userCurrent?.salon_id) {
      res = await messageApi.getMessage(userCurrent.salon_id);
    }
    if (userCurrent?.id) {
      res = await messageApi.getMessage(userCurrent.id);
    }
    if (res?.data?.messages) {
      const reversedMessages = res.data.messages.reverse();
      //dispatch(getMessage(reversedMessages))
      setMessages(reversedMessages);
    } else {
      setMessages([]);
    }
    setUser(userCurrent);
  };
  const handleCloseCall = () => {
    setShowCall(false);
  };
  const handleShowCall = () => setShowCall(true);
  const handleCallVideo = async () => {
    console.log("profile", profile);
    let res = "";
    let receiverId = "";
    if (user?.salon_id) {
      receiverId = user.salon_id;
      res = await messageApi.postMessage(user.salon_id, "Cuộc gọi video");
      setText("");
    }
    if (user?.id) {
      receiverId = user.id;
      res = await messageApi.postMessage(user.id, "Cuộc gọi video");
      setText("");
    }
    if (res?.data?.message) {
      setMessages([res.data.message, ...messages]);
    }
    if (users && users.length < 1) {
      loadingAllUser();
    }
    const roomId = randomID(5);
    const linkVideoCall = `/room/${roomId}`;
    handleShowCall();
    soundPhoneCall.play();
    timerId = setInterval(() => {
      soundPhoneCall.play();
    }, intervalDuration);

    timeOut = setTimeout(() => {
      handleEndCall();
    }, 24000);

    socket?.emit("callVideo", {
      senderName: profile.fullname,
      senderImage: profile.avatar || noUserImage,
      linkVideoCall,
      senderId: profile.user_id,
      receiverId,
    });
  };
  const handleEndCall = () => {
    clearInterval(timerId);
    handleCloseCall();
    socket?.emit("endCallVideo", {
      senderId: profile.user_id,
      receiverId: user.id,
    });
  };
  const handleEndCallForReceiver = () => {
    clearInterval(timerId);
    handleCloseCallForReceiver();
  };
  const handleAnswer = () => {
    socket?.emit("answerCallVideo", {
      receiverId: dataResponseFromVideoCall.senderId,
      linkVideoCall: dataResponseFromVideoCall.linkVideoCall,
    });
    handleCloseCallForReceiver();
    clearInterval(timerId);
    navigate(dataResponseFromVideoCall.linkVideoCall);
  };
  const handleRefuse = () => {
    console.log("refuse");
    socket?.emit("refuseCallVideo", {
      receiverId: dataResponseFromVideoCall.senderId,
    });
    handleEndCallForReceiver();
  };
  return (
    <div className="message-container">
      <Modal show={showCallForReceiver} backdrop="static">
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
      <div className="message-sidebar">
        <div className="message-sidebar-top">
          <span className="title-message">Nhắn tin</span>
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <div className="message-sidebar-search">
          <input type="text" placeholder="Tìm kiếm..."></input>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="message-sidebar-bottom">
          {users &&
            users.length > 0 &&
            users.map((user) => {
              const isOnline = onlineUsers.includes(user.id);
              return (
                <div
                  className="message-person"
                  onClick={() => handleOnMessage(user)}
                >
                  <div
                    className="person-image"
                    style={{ backgroundImage: `url(${user.image})` }}
                  >
                    {isOnline === true ? (
                      <div className="person-active"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-box">
                    <div className="message-name">{user.name}</div>
                    <div className="message-text">You: Ok 11h40 AM</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="message-main">
        <div className="message-main-top">
          <div className="message-main-top-infor">
            <div
              className="message-main-top-image"
              style={{ backgroundImage: `url(${user.image})` }}
            >
              <div className="person-active"></div>
            </div>
            <div className="message-main-top-box">
              <div className="message-main-top-name">{user.name}</div>
              <div className="message-main-top-active-text">Đang hoạt động</div>
            </div>
          </div>
          <div className="message-main-top-option">
            <i class="fa-solid fa-video" onClick={handleCallVideo}></i>
            <i class="fa-solid fa-right-from-bracket" onClick={backHome}></i>
          </div>
        </div>
        <div className="message-main-content">
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              const shakeClass = message.shouldShake === true ? "shake" : "";
              if (shakeClass === "shake") {
                message.shouldShake = false;
              }
              return (
                <MessageItem
                  message={message.message}
                  user={user}
                  receiverId={message.receiverId}
                  key={index}
                  shakeClass={shakeClass}
                />
              );
            })}
        </div>
        <div className="message-main-bottom">
          <div className="acttachment">
            <i class="fa-solid fa-image"></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nhập văn bản..."
              onChange={(e) => handleChangeTextMessage(e)}
              value={text}
            ></input>
            <i class="fa-solid fa-face-smile"></i>
          </div>
          <div className="send">
            <i
              class="fa-solid fa-location-arrow"
              onClick={handleSendMessage}
            ></i>
          </div>
        </div>
      </div>
      <Modal show={showCall} onHide={handleCloseCall} backdrop="static">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={user.image} alt="image_user" className="w-25 h-25" />
            <div className="mt-3 fw-bold fs-3">{user.name}</div>
            <p>Đang gọi...</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleEndCall}>
            Tắt cuộc gọi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
