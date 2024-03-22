import React, { useEffect, useState } from 'react'
import AdminSalonSidebar from '../AdminSalonSidebar'
import { Outlet } from "react-router-dom";
import AdminSalonHeader from '../AdminSalonHeader/AdminSalonHeader';
import "./AdminSalonLayout.scss"
import { Form, Image, } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import salonApi from '../../../apis/salon.api';
import { toast } from 'react-toastify';

export default function AdminSalonLayout({ children }) {
  const [statusSalon, setStatusSalon] = useState("")
  const [salon, setSalon] = useState({});
  const [show, setShow] = useState(true)
  const [image, setImage] = useState()
  const [banner, setBanner] = useState()
  const loading = async() => {
    let res = await salonApi.getSalonInfor()
    if(res?.data?.status){
      setStatusSalon(res.data.status)
    }
    if(res?.data?.salon){
      setSalon(res.data.salon)
    }
}
  useEffect(() => {
     loading()
  },[])
      const handleClose = () =>{
        setShow(false)
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
    const HandleAddSalon = async (e) =>{
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
       let res = await salonApi.AddSalon(form)
       if(res?.data?.tatus && res.data.tatus === "success" ){
        loading()
        setStatusSalon("true")
        toast.success("Thêm salon thành công.Chào mừng bạn đến trang quản lí salon của bạn")
       }
    }
  return (
    <>
       {statusSalon === "failed" ?
       <>
      <AdminSalonHeader/>
       <Modal show={show} onHide={handleClose} >
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Để bắt đầu quản lí.Vui lòng nhập thông tin Salon của bạn</Modal.Title>
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
              <Button variant="primary" onClick = {(e) => HandleAddSalon(e)}>
                Hoàn thành
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
       </>
        :  <div>
      <AdminSalonHeader />
      <AdminSalonSidebar />
      <div id="wp-content">
        {children}
        <Outlet />
      </div>
    </div>}
    </>
  )
}
