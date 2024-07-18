import React, { useEffect, useState } from "react";
import "./DetailCar.scss";
import HeaderSalon from "../../components/Header/HeaderSalon";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FooterSalon from "../../components/Footer/FooterSalon";
import { useParams, useNavigate } from "react-router-dom";
import carApi from "../../apis/car.api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { formatCurrency } from "../../utils/common";
export default function DetailCar() {
  const [car, setCar] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const [showWarranty, setShowWarranty] = useState(false);
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
    const loading = async () => {
      let res = await carApi.getDetailCar(params.id);
      if (res?.data?.car) {
        setCar(res.data.car);
        setImages(res.data.car.image);
        if (res.data.car?.image?.length > 0) {
          setMainImage(res.data.car?.image[0]);
        }
      }
    };
    loading();
  }, [params.id]);
  const handleAppointment = () => {
    navigate("/booking", {
      state: {
        carId: params.id,
      },
    });
  };
  const handleShowDetailWarranty = () => {};
  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };
  const handleShowWarranty = () => {
    setShowWarranty(true);
  };
  console.log("car : ", car);
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
            <div className="box-sumary ">
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
            <Carousel
              responsive={responsive}
              className="sub-image"
              showArrows={true}
            >
              {images &&
                images?.length > 0 &&
                images.map((image) => {
                  return (
                    <div
                      key={image}
                      className="sub-image-item"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                      onClick={() => setMainImage(image)}
                    ></div>
                  );
                })}
            </Carousel>
          </div>
          <div className="specifications-car">
            <h4 className="name-car">{car.name}</h4>
            <h4 className="price-car">{formatCurrency(car.price)} </h4>
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
            <button className="btn mt-1" onClick={handleAppointment}>
              Đặt lịch xem xe ngay
            </button>
            <button className="btn mt-1" onClick={handleShowWarranty}>
              Xem chính sách bảo hành
            </button>
          </div>
        </div>
      </div>
      <FooterSalon />
      <Modal show={showWarranty} onHide={handleCloseWarranty} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin bảo hành cho xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Số kilomet bảo hành</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={car?.warranties?.limit_kilometer}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Số tháng bảo hành</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={car?.warranties?.months}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Chính sách bảo hành</Form.Label>
            <Form.Control
              as="textarea"
              //placeholder="Leave a comment here"
              style={{ minHeight: "150px" }}
              value={car?.warranties?.policy}
              readOnly
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarranty}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
