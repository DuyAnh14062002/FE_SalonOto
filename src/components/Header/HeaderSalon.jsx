import React from "react";
import "./HeaderSalon.scss";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderSalon() {
  const navigate = useNavigate();
  // const backListSalon = () => {
  //   navigate("/listSalon");
  // };
  return (
    <div className="container-header">
      <div className="back-home">
        {/* <i className="fa-solid fa-arrow-left" onClick={backListSalon}></i> */}
      </div>
      <div
        className="logo"
        style={{
          backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/logo.png?1699270212851.jpg)`,
        }}
      ></div>
      <div className="main-menu">
        <ul className="d-flex align-items-center">
          <Link to="/salonOto/:123" className="item-menu">
            Trang chủ
          </Link>
          <Link className="item-menu">Giới thiệu</Link>
          <Link className="item-menu">Tin tức</Link>
          <Link className="item-menu">Dịch vụ</Link>
          <Link className="item-menu">Bảo dưỡng</Link>
          <Link to="/salonOto/contact" className="item-menu">
            Liên hệ
          </Link>
          <div class="text-dark position-relative">
            <i class="fa-regular fa-bell fs-4"></i>
            <span
              class="badge rounded-pill badge-notification bg-danger position-absolute"
              style={{ top: "-10px", left: "17px" }}
            >
              9
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
}
