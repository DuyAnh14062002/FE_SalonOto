import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import maintenanceApi from "../../../apis/maintenance.api";
import salonApi from "../../../apis/salon.api";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../utils/common";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 5;

export default function ManageMaintenance() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [maintenances, setMaintenances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceItem, setMaintenanceItem] = useState([]);
  const [salon, setSalon] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingMaintenance(salon?.salon_id, 1, searchValue);
    }, 1000);
  };
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchDataSalon = async (page, search) => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      loadingMaintenance(res.data.salon.salon_id, page, search);
      setSalon(res.data.salon);
    }
  };
  const loadingMaintenance = async (salonId, page, search) => {
    try {
      let res = await maintenanceApi.getAllMaintenanceOfSalon(
        salonId,
        page,
        LIMIT,
        search
      );
      if (res?.data?.maintenance) {
        setMaintenances(res.data.maintenance);
        setTotalPage(res.data.total_page);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadingUser();
    fetchDataSalon(page, search);
  }, [page, search]);
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
      loadingMaintenance(salon.salon_id, page, search);
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
      loadingMaintenance(salon.salon_id, page, search);
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
      loadingMaintenance(salon.salon_id, page, search);
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
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ width: "100px" }}>Tìm kiếm:</span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  style={{ width: "100%" }}
                  placeholder="Nhập tên dịch vụ"
                  value={search}
                  onChange={handleSearch}
                />
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
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

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
            {maintenances && maintenances.length > 0 && (
              <div className="d-flex justify-content-center ">
                <PaginationControl
                  page={page}
                  total={totalPage * LIMIT || 0}
                  limit={LIMIT}
                  changePage={(page) => {
                    setPage(page);
                  }}
                  ellipsis={1}
                />
              </div>
            )}
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
                as="textarea"
                type="text"
                name="description"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                required
                type="number"
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
                as="textarea"
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
                type="number"
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
