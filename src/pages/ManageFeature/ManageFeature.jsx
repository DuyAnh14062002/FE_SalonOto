import "./ManageFeature.scss";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
export default function ManageFeature() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các tính năng
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
              <button className="btn btn-success" onClick={handleShow}>
                Thêm tính năng
              </button>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên tính năng</th>
                  <th scope="col">Mô tả tính năng</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">1</td>

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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
                  <td className="text-center">3</td>

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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
                  <td className="text-center">4</td>

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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
                  <td className="text-center">5</td>

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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
                  <td className="text-center">6</td>

                  <td>
                    <Link to="/" className="text-decoration-none ">
                      Quản lý xe, thông tin giới thiệu
                    </Link>
                  </td>
                  <td>
                    Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                    một cách hiệu quả và dễ dàng
                  </td>

                  <td className="text-center">
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
                <li className="page-item">
                  <Link className="page-link" to="/">
                    4
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    5
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
              <Modal.Title>Thêm tính năng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên tính năng</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả tính năng</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật tính năng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên tính năng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value="Quản lí xe, thông tin xe được giới thiệu"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả tính năng</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value="Đây là tính năng giúp bạn quản lý xe và thông tin giới thiệu
                  một cách hiệu quả và dễ dàng"
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
      </div>
    </>
  );
}
