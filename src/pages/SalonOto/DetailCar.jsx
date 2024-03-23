import React from "react";
import "./DetailCar.scss";
import HeaderSalon from "../../components/Header/HeaderSalon";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FooterSalon from "../../components/Footer/FooterSalon";
export default function DetailCar() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
      <HeaderSalon />

      <div className="detail-car-container">
        <div className="header-menu">
          <span>Trang chủ</span>{" "}
          <span>
            {" "}
            <i className="fa-solid fa-angle-right"></i>{" "}
          </span>{" "}
          <span>Xe mazda</span>{" "}
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>{" "}
          <span>mazda 3</span>
        </div>
        <div className="detail-option">
          <div className="sumary">
            <div className="box-sumary">
              <i className="fa-regular fa-star"></i>
              <span>TỔNG QUAN</span>
            </div>
          </div>
          <div className="sumary">
            <div className="box-sumary">
              <i className="fa-solid fa-gear"></i>
              <span>THÔNG SỐ KỸ THUẬT</span>
            </div>
          </div>
          <div className="sumary">
            <div className="box-sumary">
              <i className="fa-solid fa-dollar-sign"></i>
              <span>DỰ TÍNH CHI PHÍ</span>
            </div>
          </div>
        </div>
        <div className="detail-car">
          <div className="car-image">
            <div
              className="main-image"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/products/z4887061899879-10dac384e4991ed265f9f67a1e3c84f9.jpg?v=1702520973857)`,
              }}
            ></div>
            <div className="sub-image">
              <div
                className="sub-image-item"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/products/z4887061899879-10dac384e4991ed265f9f67a1e3c84f9.jpg?v=1702520973857)`,
                }}
              ></div>
              <div
                className="sub-image-item"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/products/z4887061886414-08fd47bb22f61c7bc3b3e9ba40c73a75.jpg?v=1702520975280)`,
                }}
              ></div>
              <div
                className="sub-image-item"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/products/z4887061882451-a26a67b469c393fcc93eaf6dba21a4d3.jpg?v=1702520976273)`,
                }}
              ></div>
            </div>
          </div>
          <div className="specifications-car">
            <h4 className="name-car">Mazda 3 Sport 2021</h4>
            <h4 className="price-car">515.000.000 đ</h4>
            <p>Hẵng sản xuất : Mazda</p>
            <p>Model xe : 3 Sport</p>
            <p>Dòng xe : Hatchback</p>
            <p>Dung tích xe: 1.5</p>
            <p>Số cửa : 4</p>
            <p>Số ghế ngồi : 5</p>
            <p>Số km đã đi : 32.000 km</p>
            <p>Hộp số : Số tự động</p>
            <p>Năm sản xuất : 2021</p>
            <p>Màu nội thất : Đen</p>
            <p>Màu ngoại thất : Trắng</p>
            <button className="call-hotline">GỌI HOTLINE 0384496705</button>
          </div>
        </div>
        <div className="rate-detail">
          <h4 className="rate-title">ĐÁNH GIÁ CHI TIẾT</h4>
          <p className="comment-detail">
            Salon ô tô Đức Thiện vừa về chiếc bán tải Mazda BT50 số tự động 1
            cầu sản xuất 2015 cá nhân 1 chủ từ đầu biển Hà Nội chạy 10 vạn km
            full lịch sử hãng. Xe còn rất mới, nội thất máy gầm bệ còn rất sáng
            chủ xe đi cực kỳ giữ gìn, sửa chữa bảo dưỡng toàn bộ trong hãng, mới
            thay dàn lốp mới date 2022 dầy cộp, sơn zin còn đến 85% xe lên bậc
            bước và lắp thùng đầy đủ... Đánh giá xe Mazda BT50 2.2L 4x2AT 2015
            sau 8 năm sử dụng Sau hơn 8 năm sử dụng theo cảm nhận của các kỹ
            thuật viên ô tô Đức Thiện đánh giá chiếc Mazda BT50 2015 bản 1 cầu
            số tự động thì nó còn khá mới so với các chiếc xe cùng đời. Với việc
            bác chủ xe chỉ sửa chữa bảo dưỡng thay thế toàn bộ trong hãng từ
            thay dầu, lọc gió dầu máy... theo định kỳ thì máy móc gầm bệ của xe
            vẫn còn rất sáng. Nội thất ghế lái cũng có dấu hiệu rạn nứt nhăn
            nheo nhưng hàng ghế sau vẫn còn rất mới hầu như không có người ngồi.
            Xe cũng được bác chủ lên bậc bước chân và nắp thùng cơ cho xe.
          </p>
        </div>
        <div className="estimate-cost">
          <div className="title-box">
            <span className="title-estimate">Dự tính chi phí</span>
          </div>
          <div className="location-register">
            <span>Nơi đăng ký : </span>
            <select>
              <option>Hà nội</option>
              <option>TP Hồ chí Minh</option>
              <option>TP Đã nẵng</option>
            </select>
          </div>
          <div className="caculate-cost">
            <div className="cost">
              <span>Giá đàm phán: </span> <span>515.000.000 đ</span>
            </div>
            <div className="cost">
              <span>Phí trước bạ: </span> <span>7.600.000 đ</span>
            </div>
            <div className="cost">
              <span>Phí sử dụng đường bộ (01 năm):</span>{" "}
              <span>1.560.000 đ</span>
            </div>
            <div className="cost">
              <span>Bảo hiểm trách nhiệm dân sự (01 năm): </span>{" "}
              <span>437.000 đ</span>
            </div>
            <div className="cost">
              <span>Phí đăng kí biển số: </span> <span>20.000.000 đ</span>
            </div>
            <div className="cost">
              <span>Phí đăng kiểm: </span> <span>340.000 đ</span>
            </div>
            <div className="Total">
              <span>Phí đăng kiểm: </span>{" "}
              <span className="price">340.000 đ</span>
            </div>
          </div>
        </div>
        <div className="relate-product-container">
          <h4>SẢN PHẨM LIÊN QUAN</h4>
          <Carousel responsive={responsive}>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
            <div className="item-relate-product">
              <div
                className="image-car-relate"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/201812241b8c41e9-df8-5a46.jpg?v=1673497900437)`,
                }}
              ></div>
              <div className="name-product-relate">Mazda 3 sản xuất 2017</div>
              <div className="price-product-relate">518.000.000 đ</div>
            </div>
          </Carousel>
        </div>
      </div>
      <FooterSalon />
    </>
  );
}
