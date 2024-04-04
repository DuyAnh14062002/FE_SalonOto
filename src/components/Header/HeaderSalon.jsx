import React from "react";
import "./HeaderSalon.scss";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderSalon(props) {
  
  const idSalon=localStorage.getItem("idSalon")
  const userIdSalon = localStorage.getItem("userIdSalon")
  const userInfor = JSON.parse(localStorage.getItem("profile"))
  console.log("user id salon : ", userIdSalon)
  console.log("user id :" , userInfor.user_id)

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
        <ul>
          <Link to ={`/salonOto/${idSalon}`} className="item-menu">
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
        </ul>
      </div>
    </div>
  );
}
