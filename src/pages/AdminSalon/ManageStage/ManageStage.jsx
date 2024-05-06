import React from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import processApi from "../../../apis/process.api";
import userApi from "../../../apis/user.api";
export default function ManageStage() {
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [salon, setSalon] = useState({});
  const [permissions, setPermission] = useState([]);
  const [contents, setContents] = useState([""]);

  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };

  useEffect(() => {
    loadingUser();
  }, []);

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleShowUpdate = (process) => {
    setShowUpdate(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = (car) => {
    setShowAdd(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (process) => {
    setShowDelete(true);
  };
  const onChange = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value });
  };

  const handleUpdateStage = async () => {
    setIsLoading(true);
    let res = await processApi.getAllProcess();
    handleCloseUpdate();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Cập nhật thông tin giai đoạn thành công");
      setIsLoading(false);
    } else {
      toast.error("Cập nhật thông tin giai đoạn thất bại");
      setIsLoading(false);
    }
  };

  const handleAddStage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await processApi.getAllProcess();

    handleCloseAdd();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Thêm thông tin giai đoạn thành công");
      setIsLoading(false);
    } else {
      toast.error("Thêm thông tin giai đoạn thất bại");
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    let res = await processApi.getAllProcess();

    handleCloseDelete();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Xóa thông tin giai đoạn thành công");
    } else {
      toast.error("Xóa thông tin giai đoạn thất bại");
    }
  };

  const handleAddContent = (index) => {
    const newContents = [...contents];
    newContents.splice(index + 1, 0, "");
    setContents(newContents);
  };

  const handleRemoveContent = (index) => {
    setContents((prevContents) => {
      const newContents = [...prevContents];
      newContents.splice(index, 1);
      return newContents;
    });
  };

  const handleChange = (index, e) => {
    const newContents = [...contents];
    newContents[index] = e.target.value;
    setContents(newContents);
  };
  const handleSubmit = () => {
    // Xử lý khi người dùng nhấn nút "Cập nhật"
    // Sử dụng contents để lấy danh sách các nội dung đã nhập
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các giai đoạn
            </h4>
          </div>
          <div className="card-body">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between">
                <select class="form-select">
                  <option value="1">Quy trình mua xe</option>
                  <option value="2">Quy trình hoa tiêu</option>
                </select>
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("postCar")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm giai đoạn
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên giai đoạn</th>
                  <th scope="col">Nội dung giai đoạn</th>

                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    1
                  </th>
                  <td>giai đoạn 1</td>
                  <td>
                    <ul>
                      <li>Đăng ký mua xe</li>
                      <li>Thanh toán</li>
                      <li>Nhận xe</li>
                    </ul>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      onClick={handleShowUpdate}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      to="/"
                      className="btn btn-danger btn-sm rounded-0 text-white"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={handleShowDelete}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Form noValidate>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật giai đoạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên giai đoạn</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Nội dung giai đoạn</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                onChange={onChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Đóng</Button>
            <Button
              variant="primary"
              onClick={handleUpdateStage}
              disabled={isLoading}
            >
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm giai đoạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên giai đoạn</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            {contents.map((content, index) => (
              <div key={index} className="w-100">
                <div className="w-100 d-flex align-items-end mt-4">
                  <Form.Group style={{ width: "75%" }}>
                    <Form.Label>Nội dung {index + 1}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={content}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleAddContent(index)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                  {index > 0 && (
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleRemoveContent(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa giai đoạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa giai đoạn này không ?</span>
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
  );
}
