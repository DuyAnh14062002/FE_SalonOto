import React, { useEffect, useState } from "react";
import "./DetailCar.scss";
import HeaderSalon from "../../components/Header/HeaderSalon";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FooterSalon from "../../components/Footer/FooterSalon";
import { useParams } from "react-router-dom";
import carApi from "../../apis/car.api";
export default function DetailCar() {
  const [car, setCar] = useState({})
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState("")
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

  const params = useParams();
  useEffect(() => {
    const loading = async () =>{
       let res = await carApi.getDetailCar(params.id)
       if(res?.data?.car){
        setCar(res.data.car)
        setImages(res.data.car.image)
        setMainImage(res.data.car.image[0])
       }
    }
    loading()
  }, [params.id])
  return (
    <>
      <HeaderSalon />

      <div className="detail-car-container">
        <div className="header-menu">
          <span>Trang chủ</span>
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>
          <span>{car.brand}</span>
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>
          <span>{car.name}</span>
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
                backgroundImage: `url(${mainImage})`,
              }}
            ></div>
             <Carousel responsive={responsive} className="sub-image" showArrows={true}>
             {images && images.length > 0 && images.map((image) => {
                return (
                  <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                  onClick={() => setMainImage(image)}
                ></div>
                )
              })}
             </Carousel>
          </div>
          <div className="specifications-car">
            <h4 className="name-car">{car.name}</h4>
            <h4 className="price-car">{car.price} đ</h4>
            <p>Hẵng sản xuất : {car.brand}</p>
            <p>Model xe : {car.model}</p>
            <p>Dòng xe : {car.type}</p>
            <p>Dung tích xe: {car.capacity}</p>
            <p>Số cửa : {car.door}</p>
            <p>Số ghế ngồi : {car.seat}</p>
            <p>Số km đã đi : {car.kilometer} km</p>
            <p>Hộp số : {car.gear}</p>
            <p>Năm sản xuất : {car.origin}</p>
            <p>Màu nội thất : {car.inColor}</p>
            <p>Màu ngoại thất : {car.outColor}</p>
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
