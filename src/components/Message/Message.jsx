import React, { useState, useEffect, useCallback} from "react";
import "./Message.scss";
import { useNavigate } from "react-router-dom";
import messageApi from "../../apis/message.api";
import userApi from "../../apis/user.api";
import { useSocketContext } from "../../context/SocketContext";
import salonApi from "../../apis/salon.api";
import { toast } from "react-toastify";
import notificationSound from "../../assets/sounds/notification.mp3"
import classnames from "classnames"
import MessageItem from "./MessageItem";
// import useListenMessages from './useListtenMessage'
// import { useDispatch, useSelector } from "react-redux";
// import { getMessage } from "../../redux/slices/MessageSlice";
export default function Message() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [change, setChange] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const idSalon = localStorage.getItem("idSalon");
  const [messages, setMessages] = useState([]);
  const { onlineUsers } = useSocketContext();
  const { socket } = useSocketContext();
  const getDetailSalon = async () => {
    let res = await salonApi.getDetailSalon(idSalon);
    console.log("res salon : ", res);
    if (res?.data?.salon) {
      setUser(res.data.salon);
    }
  };
  const handleNewMessage = useCallback((newMessage) => {
   
    newMessage.shouldShake = true
    console.log("newMessage:",newMessage)
    if(newMessage.senderId !== user.id && newMessage.receiverId !== user.id){
      loadingAllUser()
    }else{
      setMessages([newMessage,...messages ]);
    }
    const sound = new Audio(notificationSound)
    sound.play()
    toast.success("Bạn có một tin nhắn mới")
  }, [messages,setMessages]);

  useEffect(() => {
    socket?.on("newMessage",handleNewMessage)
    return () => socket?.off("newMessage");
  }, [socket, handleNewMessage]);

  useEffect(() => {
    getDetailSalon();
  }, [idSalon]);

  useEffect(() => {
    loadingAllUser();
  }, []);

  useEffect(() => {
    loadingMessage();
  }, [user, idSalon]);

  // const dispatch =  useDispatch()
  // const messages = useSelector(
  //   (state) => state.messageSlice.messages
  // );
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
      setMessages([res.data.message,...messages]);
    }
    if(users && users.length < 1){
      loadingAllUser()
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
      console.log("chatting users : ", res.data.chattingUsers)
      if(user?.salon_id && idSalon === user.salon_id){
        setUser(res.data.chattingUsers[0])
      }
    }
  };
  const handleOnMessage = async(userCurrent) => {
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
  //useListenMessages(messages,setMessages)
  return (
    <div className="message-container">
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
                    style={{ backgroundImage: `url(${user.image})` , marginRight: "2px"}}
                  >
                    {isOnline === true ? (
                      <div className="person-active"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-box">
                    <div className="message-name">{user.name}</div>
                    <div className="message-text-sidebar">
                      <span className="text-sender">{user.message && user.message.sender !== "" ? user.message.sender + ": ": ""}</span> 
                      <span className="text-message">{user.message && user.message.message} </span>
                      <span className="text-time">{user.message && user.message.time}</span>
                    </div>
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
            <i class="fa-solid fa-video"></i>
            <i class="fa-solid fa-right-from-bracket" onClick={backHome}></i>
          </div>
        </div>
        <div className="message-main-content">
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              const shakeClass = message.shouldShake === true ? "shake" : ""
              if(shakeClass === "shake"){
                message.shouldShake = false
              }
              return(
                <MessageItem message={message.message} user = {user} receiverId = {message.receiverId} key={index} shakeClass = {shakeClass}/>
              )
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
    </div>
  );
}
