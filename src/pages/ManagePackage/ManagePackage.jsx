import image_package from "../../assets/images/package.jpg";
import "./ManagePackage.scss";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
export default function ManagePackage() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowInfo = () => setShowInfo(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseInfo = () => setShowInfo(false);
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h4 className="text-center fw-bold py-1 my-0">Danh sách các gói</h4>
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
                  placeholder="Nhập tên gói dịch vụ"
                />
                <button className="btn btn-primary mx-2">Tìm kiếm</button>
              </div>
              <button className="btn btn-success" onClick={handleShow}>
                Thêm gói
              </button>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" className="text-center">
                    Ảnh
                  </th>
                  <th scope="col" className="text-center">
                    Tên gói
                  </th>
                  <th scope="col">Mô tả gói</th>
                  <th scope="col" className="text-center">
                    Giá
                  </th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">1</td>
                  <td className="text-center">
                    <img width="200" height="200" src={image_package} alt="" />
                  </td>
                  <td className="text-center">
                    <Link to="/" className="text-decoration-none ">
                      Quản lý salon
                    </Link>
                  </td>
                  <td>Đây là gói quản lí salon dễ dàng và hiệu quả</td>
                  <td className="text-center">2.000.000 đ</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="info"
                      onClick={handleShowInfo}
                    >
                      <i className="fa-solid fa-circle-question"></i>
                    </button>
                    <button
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      onClick={handleShowEdit}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <Link
                      to="/"
                      className="btn btn-danger btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">2</td>
                  <td className="text-center">
                    <img width="200" height="200" src={image_package} alt="" />
                  </td>
                  <td className="text-center">
                    <Link to="/" className="text-decoration-none ">
                      Quản lý salon
                    </Link>
                  </td>
                  <td>Đây là gói quản lí salon dễ dàng và hiệu quả</td>
                  <td className="text-center">2.000.000 đ</td>
                  <td className="text-center">
                    <Link
                      to="/"
                      className="btn btn-warning btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="info"
                    >
                      <i className="fa-solid fa-circle-question"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-danger btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">2</td>
                  <td className="text-center">
                    <img width="200" height="200" src={image_package} alt="" />
                  </td>
                  <td className="text-center">
                    <Link to="/" className="text-decoration-none ">
                      Quản lý salon
                    </Link>
                  </td>
                  <td>Đây là gói quản lí salon dễ dàng và hiệu quả</td>
                  <td className="text-center">2.000.000 đ</td>
                  <td className="text-center">
                    <Link
                      to="/"
                      className="btn btn-warning btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="info"
                    >
                      <i className="fa-solid fa-circle-question"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-danger btn-sm rounded-0 text-white"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa fa-trash"></i>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav className="d-flex justify-content-center ">
              <ul id="product-pagination" className="pagination">
                <li className="page-item">
                  <button
                    onclick=""
                    className="page-link"
                    to="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    3
                  </Link>
                </li>

                <li className="page-item" id="nextPageButton">
                  <button
                    onclick=""
                    className="page-link"
                    to="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Thêm gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Hình ảnh gói</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group className="mt-3 feature">
                <Form.Label>Chọn tính năng</Form.Label>
                <Form.Check type="checkbox" label="Quản lý nhân viên" />
                <Form.Check type="checkbox" label="Quản lý tin tức" />
                <Form.Check type="checkbox" label="Quản lý kho phụ tùng" />
                <Form.Check type="checkbox" label="Xem báo cáo thống kê" />
                <Form.Check type="checkbox" label="Quản lý xem xe" />
                <Form.Check
                  type="checkbox"
                  label="Quản lý thông tin giới thiệu"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Thêm gói
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Hình ảnh gói</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group className="mt-3 feature">
                <Form.Label>Chọn tính năng</Form.Label>
                <Form.Check type="checkbox" label="Quản lý nhân viên" />
                <Form.Check type="checkbox" label="Quản lý tin tức" />
                <Form.Check type="checkbox" label="Quản lý kho phụ tùng" />
                <Form.Check type="checkbox" label="Xem báo cáo thống kê" />
                <Form.Check type="checkbox" label="Quản lý xem xe" />
                <Form.Check
                  type="checkbox"
                  label="Quản lý thông tin giới thiệu"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleCloseEdit}>
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showInfo} onHide={handleCloseInfo}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Xem chi tiết gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group
                controlId="formFile"
                className="mt-3 d-flex justify-content-center"
              >
                <Image src={image_package} rounded width="200" height="auto" />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control required type="text" value="Quản lí sa lon" />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value="Đây là gói quản lí salon dễ dàng và hiệu quả"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control required type="text" value="2000000" />
              </Form.Group>
              <Form.Group className="mt-3 feature">
                <Form.Label>Các tính năng</Form.Label>
                <Form.Check type="checkbox" checked label="Quản lý nhân viên" />
                <Form.Check type="checkbox" checked label="Quản lý tin tức" />
                <Form.Check
                  type="checkbox"
                  checked
                  label="Quản lý kho phụ tùng"
                />

                <Form.Check type="checkbox" checked label="Quản lý xem xe" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseInfo}>
                Đóng
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
}
