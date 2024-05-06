import React from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import processApi from "../../../apis/process.api";
import userApi from "../../../apis/user.api";
export default function ManageProcess() {
  const [listProcess, setListProcess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [process, setProcess] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [salon, setSalon] = useState({});
  const [permissions, setPermission] = useState([]);

  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchData = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon?.process) {
      setListProcess(res?.data?.salon?.process);
    }
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  useEffect(() => {
    fetchData();
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
    setProcess({ ...process, [e.target.name]: e.target.value });
  };

  const handleUpdateProcess = async () => {
    setIsLoading(true);
    let res = await processApi.getAllProcess();
    fetchData();
    handleCloseUpdate();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Cập nhật thông tin quy trình thành công");
      setIsLoading(false);
    } else {
      toast.error("Cập nhật thông tin quy trình thất bại");
      setIsLoading(false);
    }
  };

  const handleAddProcess = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await processApi.getAllProcess();
    fetchData();
    handleCloseAdd();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Thêm thông tin quy trình thành công");
      setIsLoading(false);
    } else {
      toast.error("Thêm thông tin quy trình thất bại");
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    let res = await processApi.getAllProcess();
    fetchData();
    handleCloseDelete();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Xóa thông tin quy trình thành công");
    } else {
      toast.error("Xóa thông tin quy trình thất bại");
    }
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các quy trình
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
                  placeholder="Nhập tên quy trình"
                />
                <button className="btn btn-primary mx-2">Tìm kiếm</button>
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("postCar")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm quy trình
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên quy trình</th>
                  <th scope="col">Mô tả quy trình</th>

                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-center">
                    1
                  </th>
                  <td>Quy trình mua xe</td>
                  <td>Quy trình mua xe</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning mx-2"
                      onClick={handleShowUpdate}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleShowDelete}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>

                {listProcess && listProcess.length > 0 ? (
                  listProcess.map((process, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">{++index}</td>

                      <td>{process.name}</td>
                      <td>{process.description}</td>

                      <td className="text-center">
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("patchCar")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(process)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("deleteCar")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(process)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* <td colSpan="6" className="fst-italic">
                      Không có dữ liệu nào
                    </td> */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Form noValidate>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật quy trình</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên quy trình</Form.Label>
              <Form.Control
                required
                type="text"
                value={process.name}
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Mô tả quy trình</Form.Label>
              <Form.Control
                required
                type="text"
                value={process.description}
                name="description"
                onChange={onChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Đóng</Button>
            <Button
              variant="primary"
              onClick={handleUpdateProcess}
              disabled={isLoading}
            >
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Form onSubmit={handleAddProcess}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm quy trình mới </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên quy trình</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Mô tả quy trình</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                onChange={onChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Thêm</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa quy trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa quy trình này không ?</span>
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
