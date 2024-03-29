import React from 'react'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from '../../../apis/salon.api';
import { Form, Image, } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageSalon.scss"
export default function ManageSalon() {
  const [salon, setSalon] = useState({});
  const [show, setShow] = useState(false)
  const [image, setImage] = useState()
  const [banner, setBanner] = useState()
    const fetchDataSalon = async() =>{
    const res = await salonApi.getSalonInfor()
    if(res?.data?.salon){
      setSalon(res.data.salon)
    }
  }
  useEffect(() => {
    fetchDataSalon();
  },[]);
  const handleClose = () =>{
     setShow(false)
  }
  const handleShow = () =>{
    setShow(true)
 }
 const onChange = (e) =>{
  setSalon({ ...salon, [e.target.name]: e.target.value });
 }
 const handleOnChangeImage = (e) => {
    setImage(e.target.files[0]);
 }
 const handleOnChangeBanner = (e) => {
  setBanner(e.target.files[0]);
}

 const HandleUpdateSalon = async (e) =>{
  e.preventDefault();
  const form = new FormData();
  form.append("name", salon.name);
  form.append("address", salon.address);
  form.append("email", salon.email);
  form.append("phoneNumber", salon.phoneNumber);
  if(image){
    form.append("image", image);
  }
  if(banner){
    form.append("banner", banner);
  }
  let res = await salonApi.UpdateSalon(salon.salon_id, form)
  if(res?.data?.status && res.data.status === "success"){
    toast.success("Cập nhật thông tin salon thành công!!!")
  }
  fetchDataSalon();
  handleClose()
 }
  return (
    <>
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header fw-bold">
          <h4 className="text-center fw-bold py-1 my-0">
            Quản Lí Salon
          </h4>
        </div>
        <div className="card-body">
          <div className="my-3 d-flex justify-content-between align-items-center">
            <button className="btn btn-success" onClick = {handleShow}>
               Cập nhật thông tin Salon
            </button>
          </div>
          <div className='row'>
             <div className='col-3' style = {{margin : "10px 0"}}>
              <label>Tên Salon</label><br/>
              <input className='form-group' style={{width : "100%"}} value={salon && salon.name}/>
             </div>
             <div className='col-3'  style = {{margin : "10px 0"}}>
              <label>Địa chỉ</label><br/>
              <input className='form-group' style={{width : "100%"}} value={salon && salon.address}/>
             </div>
             <div className='col-3'  style = {{margin : "10px 0"}}>
              <label>Email</label><br/>
              <input className='form-group' style={{width : "100%"}} value={salon && salon.email}/>
             </div>
             <div className='col-3'  style = {{margin : "10px 0"}}>
              <label>Số điện thoại</label><br/>
              <input className='form-group' style={{width : "100%"}} value={salon && salon.phoneNumber}/>
             </div>
             <div className='col-3'  style = {{margin : "10px 0"}}>
              <label>Ảnh Salon</label><br/>
               <div className='image-salon-admin' style = {{backgroundImage : `url(${salon.image})`}}></div>
             </div>
             <div className='col-3'  style = {{margin : "10px 0"}}>
              <label>Ảnh Banner</label><br/>
              <div className='banner-salon-admin' style={{backgroundImage : `url(${salon.banner})`}}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose} >
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật thông tin Salon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group
                controlId="formFile"
                className="mt-3 d-flex justify-content-center"
              >
                <Image
                  src={salon.image}
                  rounded
                  width="200"
                  height="auto"
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Tên Salon</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={salon.name}
                  onChange={onChange}
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={salon.address}
                  onChange={onChange}
                  name='address'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={salon.email}
                  onChange={onChange}
                  name='email'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={salon.phoneNumber}
                  onChange={onChange}
                  name='phoneNumber'
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Hình ảnh</Form.Label><br/>
                <input type='file' onChange={(e) => handleOnChangeImage(e)}/>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Banner</Form.Label><br/>
                <input type='file' onChange={(e) => handleOnChangeBanner(e)}/>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick = {(e) => HandleUpdateSalon(e)}>
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
  </>
  )
}
