import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import maintenanceApi from "../../../apis/maintenance.api";
import salonApi from "../../../apis/salon.api";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../utils/common";
export default function ManageMaintenance() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [maintenances, setMaintenances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceItem, setMaintenanceItem] = useState([]);
  const [salon, setSalon] = useState({});
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      loadingMaintenance(res.data.salon.salon_id);
      setSalon(res.data.salon);
    }
  };
  const loadingMaintenance = async (id) => {
    let res = await maintenanceApi.getAllMaintenanceOfSalon(id);
    if (res?.data?.maintenance) {
      setMaintenances(res.data.maintenance);
    }
  };
  useEffect(() => {
    loadingUser();
    fetchDataSalon();
  }, []);
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = (car) => {
    setShowAdd(true);
  };
  const handleShowDelete = (maintenanceItem) => {
    setShowDelete(true);
    setMaintenanceItem(maintenanceItem);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowUpdate = (maintenanceItem) => {
    setShowUpdate(true);
    setMaintenanceItem(maintenanceItem);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const onChange = (e) => {
    setMaintenanceItem({ ...maintenanceItem, [e.target.name]: e.target.value });
  };
  const handleAddMaintenance = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await maintenanceApi.createMaintenance(
      maintenanceItem.name,
      maintenanceItem.description,
      maintenanceItem.cost
    );
    console.log("res create maintenance : ", res);
    if (res?.data?.status === "success") {
      toast.success("Thêm dịch vụ bảo dưỡng thành công");
      handleCloseAdd();
      loadingMaintenance(salon.salon_id);
      setMaintenanceItem({});
    } else {
      toast.error("Thêm dịch vụ bảo dưỡng thất bại");
    }
    setIsLoading(false);
  };
  const handleUpdateMaintenance = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await maintenanceApi.updateMaintenance(
      maintenanceItem.maintenance_id,
      maintenanceItem.name,
      maintenanceItem.description,
      maintenanceItem.cost
    );
    if (res?.data?.status === "success") {
      toast.success("Cập nhật dịch vụ bảo dưỡng thành công");
      handleCloseUpdate();
      loadingMaintenance(salon.salon_id);
      setMaintenanceItem({});
    } else {
      toast.error("Cập nhật dịch vụ bảo dưỡng thất bại");
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    let res = await maintenanceApi.deleteMaintenance(
      maintenanceItem.maintenance_id
    );
    if (res?.data?.status === "success") {
      toast.success("Xóa dịch vụ bảo dưỡng thành công");
      handleCloseDelete();
      loadingMaintenance(salon.salon_id);
      setMaintenanceItem({});
    } else {
      toast.error("Xóa dịch vụ bảo dưỡng thất bại");
    }
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các dịch vụ bảo dưỡng
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
                  placeholder="Nhập tên dịch vụ "
                />
                <button className="btn btn-primary mx-2">Tìm kiếm</button>
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_MT")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm dịch vụ bảo dưỡng mới
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Tên dịch vụ bảo dưỡng
                  </th>
                  <th scope="col">Mô tả chi tiết</th>
                  <th scope="col" className="text-center">
                    Giá
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
                {maintenances && maintenances.length > 0 ? (
                  maintenances.map((maintenance, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">{++index}</td>

                      <td>{maintenance.name}</td>
                      <td>{maintenance.description}</td>
                      <td className="text-center">
                        {formatCurrency(maintenance.cost)}
                      </td>
                      <td className="text-center">
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_MT")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(maintenance)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_MT")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(maintenance)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
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
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới dịch vụ bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên dịch vụ bảo dưỡng</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                required
                type="text"
                name="cost"
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
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
        <Form onSubmit={handleUpdateMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật dịch vụ bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên dịch vụ bảo dưỡng</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
                value={maintenanceItem.name}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                onChange={onChange}
                value={maintenanceItem.description}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                required
                type="text"
                name="cost"
                onChange={onChange}
                value={maintenanceItem.cost}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa dịch vụ bào dưỡng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa dịch vụ bảo dưỡng{" "}
            <strong>{maintenanceItem && maintenanceItem.name}</strong> này không
            ?
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
  );
}
