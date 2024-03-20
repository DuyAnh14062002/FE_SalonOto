import React from 'react'
import { Form,Image, } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from '../../../apis/salon.api';
import carApi from '../../../apis/car.api';
export default function ManageCar() {
 const [cars, setCars] = useState([])
 const [car, setCar] = useState("")
 const [showInfor, setShowInfor] = useState(false)
 const [showUpdate, setShowUpdate] = useState(false)
 const [showAdd, setShowAdd] = useState(false)
 const [showDelete, setShowDelete] = useState(false)
 const [image, setImage] = useState("")
 const [salon, setSalon] = useState({});
 const fetchDataSalon = async() =>{
  const res = await salonApi.getSalonInfor()
  console.log("res salon : ", res)
  if(res?.data?.salon?.cars){
    setCars(res.data.salon.cars)
  }
  if(res?.data?.salon){
    setSalon(res.data.salon)
  }
}
useEffect(() => {
  fetchDataSalon();
},[]);
  const handleCloseInfor = () =>{
    setShowInfor(false)
  }
  const handleShowInfor = (car) =>{
    setShowInfor(true)
    setCar(car)
  }
  const handleCloseUpdate = () =>{
    setShowUpdate(false)
  }
  const handleShowUpdate = (car) =>{
    setShowUpdate(true)
    setCar(car)
  }
  const handleCloseAdd = () =>{
    setShowAdd(false)
  }
  const handleShowAdd = (car) =>{
    setShowAdd(true)
  }
  const handleCloseDelete = () =>{
    setShowDelete(false)
  }
  const handleShowDelete = (car) =>{
    setShowDelete(true)
    setCar(car)
    console.log("car : ", car)
  }
   const onChange = (e) => {
      setCar({...car, [e.target.name] : e.target.value})
   }
   const handleOnChangeImage = (e) =>{
    setImage(e.target.files[0])
   }

   const handleUpdateCar = async() =>{
    const form = new FormData();
    form.append("name", car.name);
    form.append("description", car.description);
    form.append("email", car.email);
    form.append("origin", car.origin);
    form.append("brand", car.brand);
    form.append("model", car.model);
    form.append("type", car.type);
    form.append("capacity", car.capacity);
    form.append("door", car.door);
    form.append("seat", car.seat);
    form.append("kilometer", car.kilometer);
    form.append("gear", car.gear);
    form.append("inColor", car.inColor);
    form.append("outColor", car.outColor);
    form.append("price", car.price);
    if(image){
      form.append("image", image);
    }
   let res =  await carApi.updateCar(car.car_id, form)
    
    fetchDataSalon()
    handleCloseUpdate();
    if(res?.data?.status && res.data.status === "success"){
      toast.success("Cập nhật thông tin xe thành công")
    }else{
      toast.error("Cập nhật thông tin xe thất bại")
    }
    
   }

   const handleAddCar = async () =>{
    const form = new FormData();
    form.append("name", car.name);
    form.append("description", car.description);
    form.append("email", car.email);
    form.append("origin", car.origin);
    form.append("brand", car.brand);
    form.append("model", car.model);
    form.append("type", car.type);
    form.append("capacity", car.capacity);
    form.append("door", car.door);
    form.append("seat", car.seat);
    form.append("kilometer", car.kilometer);
    form.append("gear", car.gear);
    form.append("inColor", car.inColor);
    form.append("outColor", car.outColor);
    form.append("price", car.price);
    form.append("salonSalonId", salon.salon_id)
    if(image){
      form.append("image", image);
    }
     let res =  await carApi.addCar(form)
    fetchDataSalon()
    handleCloseUpdate();
    if(res?.data?.status && res.data.status === "success"){
      toast.success("Thêm thông tin xe thành công")
    }else{
      toast.error("Thêm thông tin xe thất bại")
    }
   }
   const handleDelete = async () =>{
      let res = await carApi.deleteCar(car.car_id)
      fetchDataSalon()
      handleCloseDelete()
      if(res?.data?.status && res.data.status === "success"){
        toast.success("Xóa thông tin xe thành công")
      }else{
        toast.error("Xóa thông tin xe thất bại")
      }
   }
  return (
    <>
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header fw-bold">
          <h4 className="text-center fw-bold py-1 my-0">
            Danh sách các xe
          </h4>
        </div>
        <div className="card-body">
          <div className="my-3 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between">
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                style={{ width: "65%" }}
                placeholder="Nhập tên tính năng"
              />
              <button className="btn btn-primary mx-2">Tìm kiếm</button>
            </div>
            <button className="btn btn-success" onClick={handleShowAdd}>
              Thêm xe mới
            </button>
          </div>
          <table className="table mt-4 table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  STT
                </th>
                <th scope="col">Tên xe</th>
                <th scope="col">nhẵn hiệu</th>
                <th scope="col">modal</th>
                <th scope="col">giá</th>
                <th scope="col" className="text-center">
                  Tác vụ
                </th>
              </tr>
            </thead>
            <tbody>
              {cars && cars.length > 0 ? (
                cars.map((car, index) => (
                  <tr
                    key={index}
                    style={{ background: "rgb(247 247 247)" }}
                  >
                    <td className="text-center">{++index}</td>

                    <td>{car.name}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.price}</td>
                    <td className="text-center">
                    <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowInfor(car)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                      <button
                        className="btn btn-success btn-sm rounded-0 text-white mx-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit"
                        onClick={() => handleShowUpdate(car)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        to="/"
                        className="btn btn-danger btn-sm rounded-0 text-white"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                        onClick={() => handleShowDelete(car)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="fst-italic">
                    Không có dữ liệu nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal show={showInfor} onHide={handleCloseInfor}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title> Thông tin xe chi tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mt-4">
                <Form.Label>Tên xe</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.name}
                  name="name"
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.description}
                  name="description"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Nhãn hiệu</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.brand}
                  name='brand'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Dòng xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.origin}
                  name='origin'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Năm sản xuất</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.type}
                  name='type'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số cửa</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.door}
                  name='door'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số ghế ngồi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.seat}
                  name='seat'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Hộp số</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.gear}
                  name='gear'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Dung tích xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.capacity}
                  name='capacity'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số Kilomet đã đi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.kilometer}
                  name='kilometer'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.model}
                  name='model'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.price}
                  name='price'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu nội thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.inColor}
                  name='inColor'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu ngoại thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.outColor}
                  name='outColor'
                />
              </Form.Group>
              <Form.Group
                controlId="formFile"
                className="mt-3 d-flex justify-content-center"
              >
                <Image
                  src={car.image}
                  rounded
                  width="200"
                  height="auto"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseInfor}>
                Đóng
              </Button>
            </Modal.Footer>
          </Form>
    </Modal>
     <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title> Thông tin xe chi tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mt-4">
                <Form.Label>Tên xe</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.name}
                  name="name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.description}
                  name="description"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Nhãn hiệu</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.brand}
                  name='brand'
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Dòng xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.origin}
                  name='origin'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Năm sản xuất</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.type}
                  name='type'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số cửa</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.door}
                  name='door'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số ghế ngồi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.seat}
                  name='seat'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Hộp số</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.gear}
                  name='gear'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Dung tích xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.capacity}
                  name='capacity'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số Kilomet đã đi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  value={car.kilometer}
                  name='kilometer'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.model}
                  name='model'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.price}
                  name='price'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu nội thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.inColor}
                  name='inColor'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu ngoại thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={car.outColor}
                  name='outColor'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
              className='mt-3'
              >
               <Form.Label style = {{marginRight : "3px"}}>Hình ảnh</Form.Label><br/>
               <input type='file' onChange={(e) => handleOnChangeImage(e)}/> 
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseInfor}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleUpdateCar}>
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
    </Modal>
    
    <Modal show={showAdd} onHide={handleCloseAdd}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title> Thông tin xe chi tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mt-4">
                <Form.Label>Tên xe</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="description"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Nhãn hiệu</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='brand'
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Dòng xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='origin'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Năm sản xuất</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='type'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số cửa</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='door'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số ghế ngồi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='seat'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Hộp số</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='gear'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Dung tích xe</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='capacity'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số Kilomet đã đi</Form.Label>
                <Form.Control
                  type="text"
                  rows={4}
                  name='kilometer'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name='model'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name='price'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu nội thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name='inColor'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Màu ngoại thất</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name='outColor'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
              className='mt-3'
              >
               <Form.Label style = {{marginRight : "3px"}}>Hình ảnh</Form.Label><br/>
               <input type='file' onChange={(e) => handleOnChangeImage(e)}/> 
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleAddCar}>
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
    </Modal>
    <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa tính năng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Bạn có chắc chắn muốn xóa xe{" "}
              <strong>{car && car.name}</strong> này không ?
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
  </>
  )
}
