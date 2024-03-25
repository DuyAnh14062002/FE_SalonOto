import React from "react";
import "./HeaderSalon.scss";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";

export default function HeaderSalon(props) {
  const idSalon = localStorage.getItem("idSalon");
  const navigate = useNavigate();
  const backListSalon = () => {
    navigate("/listSalon");
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
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
          <Link to="/" className="notify p-2">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-1/423237019_955661016238189_1658928640593291933_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaQOOvv3h_SnUdMydQttizzN1LzqD88YTM3UvOoPzxhO96F__0JtBghCicgvHtT_xeTmOhTge5QNvYejNpg3QF&_nc_ohc=dIunBgmLHUEAX9aO2aD&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfDI81_2yJVpsgqivkGG2o_lZhaOaebS1YJWVsO1TqmtWg&oe=66043193"
                alt=""
                className="rounded-circle"
                style={{ width: "56px", height: "56px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <div className="notify-title">
                  <strong>Đặng Đức Ba</strong> vừa đặt một lịch hẹn với salon
                  của bạn
                </div>
                <div className="text-muted">2 phút trước</div>
              </div>
            </div>
          </Link>
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
                9
              </span>
            </div>
          </OverlayTrigger>
        </ul>
      </div>
    </div>
  );
}
