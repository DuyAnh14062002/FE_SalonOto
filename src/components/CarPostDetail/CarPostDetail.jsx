import React from "react";
import "./CarPostDetail";
import Header from "../Header";
import { Carousel } from "react-bootstrap";
import "./CarPostDetail.scss"
export default function CarPostDetail() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <>
      <Header otherPage={true} />
      <div className="car-post-detail-body">
        <div className="car-post-detail-container">
          <div className="left-detail">
            <div className="car-image">
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(https://cdn.chotot.com/Dc7WJ7ml9pKSF3kbJSr38_U2p736UOZum-aJ3heUxcU/preset:view/plain/9b1e5291c7786ad995d8d0f2a63460e4-2870177156003191308.jpg)`,
                }}
              ></div>
              <Carousel
                responsive={responsive}
                className="sub-image"
                showArrows={true}
              >
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/qSnSktCh4D-ITRwpjFQyCJNmpGL3g5BrEhEMmFstCgw/preset:view/plain/d3d68ac8e752f92d834aa83b10b97d1e-2870177155819889318.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/aCSwlYM3RDdYy0L_gX4XmlXQwCwJu9Tg7ocT8SugAI8/preset:view/plain/3060856e7acb457b8ca4f54f01bef8f3-2870177156019866482.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/jHD_r5lin0ZwulOQbmZG6mmWXx8PutPj7adV2zkVhmc/preset:view/plain/ec5bf8aca0c25fb18e07c69c97501d3d-2870177155543151391.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/Ar8Zez4l4cwcqjl5O9rS0uR6yrGax8Gfd9cbuIQojzE/preset:view/plain/b4f854c6d7a6ead42eafd5933529cd7e-2870177155952831700.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/Dc7WJ7ml9pKSF3kbJSr38_U2p736UOZum-aJ3heUxcU/preset:view/plain/9b1e5291c7786ad995d8d0f2a63460e4-2870177156003191308.jpg)`,
                  }}
                ></div>
              </Carousel>
            </div>
            <div className="car-infor">
                <div className="name-car">Mazda3 Fl 1.5 luxury 2020</div>
                <div className="price">515.000.000 đ </div>
                <div className="address"><i class="fa-solid fa-location-dot"></i> Đăng Phường Quán Triều, Thành phố Thái Nguyên, Thái Nguyên</div>
                <div className="time-post"> <i class="fa-regular fa-clock"></i>  Đăng 2 tuần trước</div>
            </div>
            <div className="car-info-detail">
              <div className="car-info-detail-left">

              </div>
              <div className="car-info-detail-right">

              </div>
            </div>
          </div>
          <div className="right-detail">
            <div className="user-info">
              <div className="user-avatar" style={{backgroundImage : `url(https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fuac2%2F12897389&w=1920&q=75)`}}></div>
              <div className="right-info-user">
                <div className="name-user">Đào Duy Anh</div>
                <div className="time-active">Hoạt động 4 giờ trước</div>
              </div>
            </div>
            <div className="btn-detail">
            <button className="connection">Kết nối hoa tiêu</button>
            <button className="chat"><i class="fa-regular fa-comments"></i> Chat</button>
            <div className="chat-demo">
              <button>Xe còn không ?</button>
              <button>Xe chính chủ không ?</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
