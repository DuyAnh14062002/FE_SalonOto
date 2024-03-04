import Header from "../../components/Header";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="container-homepage">
      <Header otherPage={false} />
      <div className="destination__container">
        <img
          className="bg__img__1"
          src="../../../public/image/bg-dots.png"
          alt="bg"
        />
        <img
          className="bg__img__2"
          src="../../../public/image/bg-arrow.png"
          alt="bg"
        />
        <div className="socials">
          <span>
            <i className="ri-twitter-fill"></i>
          </span>
          <span>
            <i className="ri-facebook-fill"></i>
          </span>
          <span>
            <i className="ri-instagram-line"></i>
          </span>
          <span>
            <i className="ri-youtube-fill"></i>
          </span>
        </div>
        <div className="content">
          <h1>
            Khám phá <br />
            các gói
            <br />
            <span> Salon oto</span>
          </h1>
          <p>
            Chúng tôi cung cấp cho bạn các gói dịch vụ tốt nhất giúp quản lí bạn
            quản lí Salon Oto của mình một cách hiệu quả
          </p>
          <button className="btn">Mua Ngay</button>
        </div>
        <div className="destination__grid">
          <div className="destination__card">
            <div className="card__content">
              <h4>Gói Salon oto cơ bản</h4>
              <ul>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí xe, thông tin giới thiệu
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí tin tức
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí bảo hành,bảo dưỡng
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-xmark"
                    style={{ color: "red" }}
                  ></i>{" "}
                  quản lí Nhân viên
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-xmark"
                    style={{ color: "red" }}
                  ></i>{" "}
                  quản lí kho phụ tùng
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-xmark"
                    style={{ color: "red" }}
                  ></i>{" "}
                  Xem báo cáo thống kê
                </li>
              </ul>
              <button className="btn">Mua ngay</button>
            </div>
          </div>
          <div className="destination__card">
            <div className="card__content">
              <h4>Gói salon oto nâng cao</h4>
              <ul>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí xe, thông tin giới thiệu
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí tin tức
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí bảo hành,bảo dưỡng
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí Nhân viên
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí kho phụ tùng
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  Xem báo cáo thống kê
                </li>
              </ul>
              <button className="btn">Mua ngay</button>
            </div>
          </div>
          <div className="destination__card">
            <div className="card__content">
              <h4>Gói quản lý phụ tùng</h4>
              <ul>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí phụ tùng, vật liệu
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí đồ chơi, linh kiện
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  quản lí đơn hàng
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "green" }}
                  ></i>{" "}
                  Xem báo cáo thống kê
                </li>
              </ul>
              <button className="btn">Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
