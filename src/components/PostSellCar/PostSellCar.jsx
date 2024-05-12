import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./PostSellCar.scss"
import salonApi from "../../apis/salon.api";
import dealerApi from "../../apis/dealer.api";
export default function PostSellCar() {
  const [show, setShow] = useState(false)
  const [listSalon, setListSalon] = useState([])
  const [infoCar, setInfoCar] = useState({})
  const [image, setImage] = useState([]);
  const [salonId, setSalonId] = useState([])

  const handleShowModal = () =>{
    setShow(true)
  }
  const handleCloseModal = () => {
    setShow(false)
  }
  const loadingSalon = async () => {
    let res = await salonApi.getAllSalon();
    if (res?.data?.salons?.salons) {
      setListSalon(res.data.salons.salons);
      setSalonId([res.data.salons.salons[0].salon_id])
    }
  };
  const handleChangeInfoCar = (e, name) => {
     setInfoCar({...infoCar, [name] : e.target.value})
  }
  useEffect(() =>{
     loadingSalon()
  }, [])
  const handleSentPost = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if(infoCar?.title){
      form.append("title", infoCar.title);
    }
    if(infoCar?.brand){
      form.append("brand", infoCar.brand);
    }
    if(infoCar?.type){
      form.append("type", infoCar.type);
    }
    if(infoCar?.mfg){
      form.append("mfg", infoCar.mfg);
    }
    if(infoCar?.version){
      form.append("version", infoCar.version);
    }
    if(infoCar?.gear){
      form.append("gear", infoCar.gear);
    }
    if(infoCar?.fuel){
      form.append("fuel", infoCar.fuel);
    }
    if(infoCar?.origin){
      form.append("origin", infoCar.origin);
    }
    if(infoCar?.design){
      form.append("design", infoCar.design);
    }
    if(infoCar?.seat){
      form.append("seat", infoCar.seat);
    }
    if(infoCar?.color){
      form.append("color", infoCar.color);
    }
    if(infoCar?.licensePlate){
      form.append("licensePlate", infoCar.licensePlate);
    }
    if(infoCar?.ownerNumber){
      form.append("ownerNumber", infoCar.ownerNumber);
    }
    if(infoCar?.kilometer){
      form.append("kilometer", infoCar.kilometer);
    }
    if(infoCar?.price){
      form.append("price", infoCar.price);
    }
    // if(infoCar?.registrationDeadline){
    //   form.append("registrationDeadline", infoCar.registrationDeadline);
    // }
    if(infoCar?.address){
      form.append("address", infoCar.address);
    }
    if (image) {
      image.forEach((item) => {
        form.append("image", item);
      });
    }
    if(salonId){
      // salonId.forEach((item) => {
      //   form.append("salons", item);
      // });
      form.append("salons", salonId )
    }
    console.log("form : ", form)
    let res = await dealerApi.sentPost(form)
    console.log("res : ", res)
  }
  const handleChooseSalon = (e) => {
    let id = e.target.value
    setSalonId(id);
  }
  console.log("infoCar : ", infoCar)
  return (
    <>
      <Header otherPage={true} />
      <div className="body-post-sell">
        <div className="post-sell-container">
          <div className="left-post-sell">
            <div className="title">Hình ảnh sản phẩm</div>
            <div className="image-post-sell">
              <input type="file" />
              <i class="fa-solid fa-camera"></i>
              <label>Đăng từ 1 đến 20 hình</label>
            </div>
          </div>
          <div className="right-post-sell">
            <div className="title">Thông tin chi tiết</div>
            <input
              placeholder="Hãng xe"
              type="text"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "brand")}
            />
            <input
              placeholder="Dòng xe"
              type="text"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "type")}
            />
            <input
              placeholder="Năm sản xuất"
              type="text"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "mfg")}
            />
            <input
              placeholder="Phiên bản"
              type="text"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "version")}
            />
            <div className="gear-infor">
              <div className="gear-title">Hộp số</div>
              <button className="gear-name active">Tự động</button>
              <button className="gear-name">Số sàn</button>
              <button className="gear-name">Bán tự động</button>
            </div>
            <div className="fuel-infor">
              <div className="fuel-title">Nhiên liệu</div>
              <button className="fuel-name active">Xăng</button>
              <button className="fuel-name">Dầu</button>
              <button className="fuel-name">Động cơ Hybrid</button>
              <button className="fuel-name">Điện</button>
            </div>
            <div className="infor-post-sell-2">
              <div className="left-infor">
                <input
                  placeholder="Xuất xứ"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "origin")}
                />
                <input
                  placeholder="Số chỗ"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "seat")}
                />
                <input
                  placeholder="Biển số xe"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "licensePlate")}
                />
                <div className="is-accessory">
                  <span>Có phụ kiện đi kèm</span> <br/>
                  <button className="yes">Có</button>
                  <button className="no">Không</button>
                </div>
              </div>
              <div className="right-infor">
                <input
                  placeholder="Kiểu dáng"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "design")}
                />
                <input
                  placeholder="Màu sắc"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "color")}
                />
                <input
                  placeholder="Số đời chủ"
                  type="text"
                  className="car-detail-input"
                  onChange={(e) => handleChangeInfoCar(e, "ownerNumber")}
                />
                <div className="is-regis">
                  <span>Còn hạn đăng kiểm</span> <br/>
                  <button className="yes">Có</button>
                  <button className="no">Không</button>
                </div>
              </div>
            </div>
            <input
              placeholder="Số Km đã đi"
              type="number"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "kilometer")}
            />
            <input
              placeholder="Giá bán"
              type="text"
              inputMode="decimal"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "price")}
            />
            <h4 className="title-and-description">Tiêu đề bài đăng và Mô tả chi tiết</h4>
            <input
              placeholder="Tiêu đề gửi"
              type="text"
              className="car-detail-input"
              onChange={(e) => handleChangeInfoCar(e, "title")}
            />
            <button className="btn-post-sell-car" onClick={handleShowModal}>Gửi tin cho salon</button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleCloseModal} backdrop="static">
        <Form noValidate onSubmit={handleSentPost}>
          <Modal.Header closeButton>
            <Modal.Title>Chọn Salon ô tô muốn gửi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <select className="select-salon-car-sell" onChange={(e)=>handleChooseSalon(e)}>
              {listSalon && listSalon.length > 0 && listSalon.map((item) => {
                return(
                  <option value={item.salon_id}>{item.name}</option>
                )
              })}
             </select>
          </Modal.Body>
          <Modal.Footer>
           <Button variant="primary" onClick={handleCloseModal} type="submit" >
              Gửi
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
