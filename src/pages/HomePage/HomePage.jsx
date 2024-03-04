import React from "react";
import "./HomePage.scss"
import Header from "../../parts/Header";
export default function HomePage() {
  return (
    <div class="container-homepage">
    <Header ortherPage = {false}/>
    <div class="destination__container">
      <img class="bg__img__1" src="../../../public/image/bg-dots.png" alt="bg" />
      <img class="bg__img__2" src="../../../public/image/bg-arrow.png" alt="bg" />
      <div class="socials">
        <span><i class="ri-twitter-fill"></i></span>
        <span><i class="ri-facebook-fill"></i></span>
        <span><i class="ri-instagram-line"></i></span>
        <span><i class="ri-youtube-fill"></i></span>
      </div>
      <div class="content">
        <h1>Khám phá <br />các gói<br /><span> Salon oto</span></h1>
        <p>
        Chúng tôi cung cấp cho bạn các gói dịch vụ tốt nhất giúp quản lí
        bạn quản lí Salon Oto của mình một cách hiệu quả
        </p>
        <button class="btn">Mua Ngay</button>
      </div>
      <div class="destination__grid">
        <div class="destination__card">
          <div class="card__content">
            <h4>Gói Salon oto cơ bản</h4>
            <ul>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí xe, thông tin giới thiệu</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí tin tức</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí bảo hành,bảo dưỡng</li>
              <li> <i class="fa-solid fa-circle-xmark" style={{color: "red"}}></i> quản lí Nhân viên</li>
              <li> <i class="fa-solid fa-circle-xmark" style={{color: "red"}}></i> quản lí kho phụ tùng</li>
              <li> <i class="fa-solid fa-circle-xmark" style={{color: "red"}}></i> Xem báo cáo thống kê</li>
            </ul>
            <button class="btn">Mua ngay</button>
          </div>
        </div>
        <div class="destination__card">
          <div class="card__content">
            <h4>Gói salon oto nâng cao</h4>
            <ul>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí xe, thông tin giới thiệu</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí tin tức</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí bảo hành,bảo dưỡng</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí Nhân viên</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí kho phụ tùng</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> Xem báo cáo thống kê</li>
            </ul>
            <button class="btn">Mua ngay</button>
          </div>
        </div>
        <div class="destination__card">
          <div class="card__content">
            <h4>Gói quản lý phụ tùng</h4>
            <ul>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí phụ tùng, vật liệu</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí đồ chơi, linh kiện</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> quản lí đơn hàng</li>
              <li> <i class="fa-solid fa-circle-check" style={{color: "green"}}></i> Xem báo cáo thống kê</li>
            </ul>
            <button class="btn">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
