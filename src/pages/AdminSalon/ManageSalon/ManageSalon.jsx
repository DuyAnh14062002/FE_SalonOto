import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageSalon.scss";
import userApi from "../../../apis/user.api";
import paymentMethodApi from "../../../apis/paymentMethod.api";
import { set } from "lodash";

export default function ManageSalon() {
  const [salon, setSalon] = useState({});
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const [banner, setBanner] = useState();
  const [permissions, setPermission] = useState([]);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [paymentMethodItem, setPaymentMethodItem] = useState({});
  const [showUpdatePaymentMethod, setShowUpdatePaymentMethod] = useState(false);
  const [showDeletePaymentMethod, setShowDeletePaymentMethod] = useState(false);

  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  const fetchListPaymentMethod = async () => {
    const res = await paymentMethodApi.getAllPaymentMethod();
    console.log(res);
    if (res?.data?.data) {
      setListPaymentMethod(res.data.data);
    }
  };
  useEffect(() => {
    fetchListPaymentMethod();
  }, []);

  useEffect(() => {
    fetchDataSalon();
    loadingUser();
  }, []);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const onChange = (e) => {
    setSalon({ ...salon, [e.target.name]: e.target.value });
  };
  const handleOnChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleOnChangeBanner = (e) => {
    setBanner(e.target.files[0]);
  };

  const HandleUpdateSalon = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", salon.name);
    form.append("address", salon.address);
    form.append("email", salon.email);
    form.append("phoneNumber", salon.phoneNumber);
    if (image) {
      form.append("image", image);
    }
    if (banner) {
      form.append("banner", banner);
    }
    let res = await salonApi.UpdateSalon(salon.salon_id, form);
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Cập nhật thông tin salon thành công!!!");
    }
    fetchDataSalon();
    handleClose();
  };
  const handleShowAddPaymentMethod = () => {
    setShowAddPaymentMethod(true);
  };
  const handleCloseAddPaymentMethod = () => {
    setShowAddPaymentMethod(false);
  };

  const onChangePaymentMethod = (e) => {
    setPaymentMethodItem({
      ...paymentMethodItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await paymentMethodApi.createPaymentMethod(paymentMethodItem);
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Thêm hình thức thanh toán thành công!!!");
      fetchListPaymentMethod();

      handleCloseAddPaymentMethod();
      setPaymentMethodItem({});
    } else {
      toast.error("Thêm hình thức thanh toán thất bại!!!");
    }
    setIsLoading(false);
  };
  const handleShowUpdatePaymentMethod = (item) => {
    setPaymentMethodItem(item);
    console.log(item);
    setShowUpdatePaymentMethod(true);
  };
  const handleCloseUpdatePaymentMethod = () => {
    setShowUpdatePaymentMethod(false);
  };
  const handleShowDeletePaymentMethod = (item) => {
    setPaymentMethodItem(item);
    setShowDeletePaymentMethod(true);
  };
  const handleCloseDeletePaymentMethod = () => {
    setShowDeletePaymentMethod(false);
  };
  const handleUpdatePaymentMethod = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await paymentMethodApi.updatePaymentMethod(paymentMethodItem);
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Cập nhật hình thức thanh toán thành công!!!");
      fetchListPaymentMethod();
      handleCloseUpdatePaymentMethod();
      setPaymentMethodItem({});
    } else {
      toast.error("Cập nhật hình thức thanh toán thất bại!!!");
    }

    setIsLoading(false);
  };
  const handleDeletePaymentMethod = async () => {
    let res = await paymentMethodApi.deletePaymentMethod(paymentMethodItem.id);
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Xóa hình thức thanh toán thành công!!!");
      fetchListPaymentMethod();
      handleCloseDeletePaymentMethod();
      setPaymentMethodItem({});
    } else {
      toast.error("Xóa hình thức thanh toán thất bại!!!");
    }
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">Quản Lý Salon</h4>
          </div>
          <div className="card-body">
            <div className="my-3 d-flex justify-content-center align-items-center">
              {(permissions?.includes("OWNER") ||
                permissions.includes("U_SL")) && (
                <button className="btn btn-success" onClick={handleShow}>
                  Cập nhật thông tin salon
                </button>
              )}
            </div>
            <div className="row">
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Tên salon</span>
                <p>{salon && salon.name}</p>
              </div>
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Địa chỉ</span>
                <p>{salon && salon.address}</p>
              </div>
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Email</span>
                <p>{salon && salon.email}</p>
              </div>
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Số điện thoại</span>
                <p>{salon && salon.phoneNumber}</p>
              </div>
              <div className="col-3"></div>
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Ảnh Salon</span>

                <div
                  className="image-salon-admin mt-3"
                  style={{ backgroundImage: `url(${salon.image})` }}
                ></div>
              </div>
              <div
                className="col-3"
                style={{ margin: "10px 0", fontSize: "18px" }}
              >
                <span className="fw-bold text-uppercase">Ảnh Banner</span>
                <div
                  className="banner-salon-admin mt-3"
                  style={{ backgroundImage: `url(${salon.banner})` }}
                ></div>
              </div>
              <div className="col-3"></div>
            </div>

            <h4 className="text-center fw-bold py-1 my-0 mt-5 text-uppercase">
              Danh sách các hình thức thanh toán
            </h4>

            <div className="my-3 d-flex justify-content-end align-items-center">
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_PMT")) && (
                <button
                  className="btn btn-success"
                  onClick={handleShowAddPaymentMethod}
                >
                  Thêm hình thức thanh toán
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" className="text-center">
                    Kiểu phương thức
                  </th>
                  <th scope="col" className="text-center">
                    Tên chủ tài khoản
                  </th>
                  <th scope="col" className="text-center">
                    Số tài khoản
                  </th>

                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "10%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {listPaymentMethod && listPaymentMethod.length > 0 ? (
                  listPaymentMethod.map((item, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.type}</td>
                      <td className="text-center">{item.fullname}</td>
                      <td className="text-center">{item.content}</td>

                      <td className="text-center">
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_PMT")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdatePaymentMethod(item)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_PMT")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDeletePaymentMethod(item)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Form noValidate>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật thông tin Salon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              controlId="formFile"
              className="mt-3 d-flex justify-content-center"
            >
              <Image src={salon.image} rounded width="200" height="auto" />
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
                name="address"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                value={salon.email}
                onChange={onChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                value={salon.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Hình ảnh</Form.Label>
              <br />
              <input type="file" onChange={(e) => handleOnChangeImage(e)} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Banner</Form.Label>
              <br />
              <input type="file" onChange={(e) => handleOnChangeBanner(e)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={(e) => HandleUpdateSalon(e)}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showAddPaymentMethod}
        onHide={handleCloseAddPaymentMethod}
        backdrop="static"
      >
        <Form onSubmit={handleAddPaymentMethod}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới hình thức thanh toán </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>
                Kiểu phương thức thanh toán (momo,vietcombank,...)
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="type"
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                name="content"
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên chủ tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddPaymentMethod}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Thêm</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showUpdatePaymentMethod}
        onHide={handleCloseUpdatePaymentMethod}
        backdrop="static"
      >
        <Form onSubmit={handleUpdatePaymentMethod} noValidate>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật hình thức thanh toán </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>
                Kiểu phương thức thanh toán (momo,vietcombank,...)
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="type"
                value={paymentMethodItem.type}
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                name="content"
                value={paymentMethodItem.content}
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên chủ tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                value={paymentMethodItem.fullname}
                onChange={onChangePaymentMethod}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseUpdatePaymentMethod}
            >
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showDeletePaymentMethod}
        onHide={handleCloseDeletePaymentMethod}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa phương thức thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa thanh toán này không</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletePaymentMethod}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletePaymentMethod}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
