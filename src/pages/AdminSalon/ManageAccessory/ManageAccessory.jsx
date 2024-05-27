import React from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import userApi from "../../../apis/user.api";
import AccessoryApi from "../../../apis/accessory.api";
import { formatCurrency } from "../../../utils/common";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 4;

export default function ManageAccessory() {
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [salon, setSalon] = useState({});
  const [permissions, setPermission] = useState([]);

  const [accessories, setAccessories] = useState([]);
  const [accessory, setAccessory] = useState({});
  const [accessoryId, setAccessoryId] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    console.log("searchValue : ", searchValue);
    debounce(() => {
      setPage(1);
      loadingAccessory(salon.salon_id, 1, searchValue);
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
      setSalon(res.data.salon);
      loadingAccessory(res.data.salon.salon_id, page, search);
    }
  };
  const loadingAccessory = async (salon_id, page, search) => {
    let res = await AccessoryApi.getAccessory(salon_id, page, LIMIT, search);
    if (res?.data?.accessory) {
      setAccessories(res.data.accessory);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    loadingUser();
    fetchDataSalon(page, search);
  }, [page, search]);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleShowUpdate = (accessory) => {
    setShowUpdate(true);
    setAccessoryId(accessory.accessory_id);
    setAccessory(accessory);
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
  const handleShowDelete = (item) => {
    setShowDelete(true);
    setAccessory(item);
  };
  const onChange = (e) => {
    setAccessory({ ...accessory, [e.target.name]: e.target.value });
  };

  const handleAddAccessory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await AccessoryApi.createAccessory(accessory);
    if (res?.data?.status === "success") {
      toast.success("Thêm phụ tùng thành công");
      handleCloseAdd();
      loadingAccessory(salon.salon_id, 1, search);
      setIsLoading(false);
      setAccessory({});
    } else {
      toast.error("Thêm phụ tùng thất bại");
    }
  };

  const handleUpdateAccessory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await AccessoryApi.updateAccessory(accessoryId, accessory);
    if (res?.data?.status === "success") {
      toast.success("Cập nhật phụ tùng thành công");
      handleCloseUpdate();
      loadingAccessory(salon.salon_id, 1, search);
      setIsLoading(false);
      setAccessory({});
    } else {
      toast.error("Cập nhật phụ tùng thất bại");
    }
  };
  const handleDelete = async () => {
    let res = await AccessoryApi.deleteAccessory(accessory.accessory_id);
    if (res?.data?.status === "success") {
      toast.success("Xóa thông tin xe thành công");
      handleCloseDelete();
      loadingAccessory(salon.salon_id, 1, search);
      setAccessory({});
    } else {
      toast.error("Xóa thông tin xe thất bại");
    }
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các phụ tùng
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
                  placeholder="Nhập tên phụ tùng"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_AC")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm mới phụ tùng
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên phụ tùng</th>
                  <th scope="col">Nhà sản xuất</th>
                  <th scope="col" className="text-center">
                    Giá
                  </th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {accessories && accessories.length > 0 ? (
                  accessories.map((item, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

                      <td>{item.name}</td>
                      <td>{item.manufacturer}</td>
                      <td className="text-center">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="text-center">
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_AC")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(item)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_AC")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(item)}
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
            {accessories && accessories.length > 0 && (
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
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
        <Form noValidate onSubmit={handleUpdateAccessory}>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật phụ tùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên phụ tùng</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
                value={accessory.name}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên nhà sản xuất</Form.Label>
              <Form.Control
                required
                type="text"
                name="manufacturer"
                onChange={onChange}
                value={accessory.manufacturer}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá phụ tùng</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                onChange={onChange}
                value={accessory.price}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddAccessory}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm phụ tùng mới </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên phụ tùng</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên nhà sản xuất</Form.Label>
              <Form.Control
                required
                type="text"
                name="manufacturer"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá phụ tùng</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
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
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa phụ tùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa phụ tùng{" "}
            <strong>{accessory?.name}</strong> này không ?
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
