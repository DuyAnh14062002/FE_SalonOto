import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import maintenanceApi from "../../../apis/maintenance.api";
import salonApi from "../../../apis/salon.api";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import warrantyApi from "../../../apis/warranty.api";
export default function ManageGuarantee() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [warranties, setWarranties] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [warrantyItem, setWarrantyItem] = useState([])
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
      loadingWarranty(res.data.salon.salon_id)
      setSalon(res.data.salon)
    }
  };
  const loadingWarranty= async(id) =>{
    let res = await warrantyApi.getAllWarranty(id)
    if(res?.data?.warranties){
      setWarranties(res.data.warranties)
    }
  }
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
  const handleShowDelete = (warrantyItem) => {
    setShowDelete(true);
    setWarrantyItem(warrantyItem);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowUpdate = (warrantyItem) => {
    setShowUpdate(true);
    setWarrantyItem(warrantyItem);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const onChange = (e) => {
    setWarrantyItem({ ...warrantyItem, [e.target.name]: e.target.value });
  };
  const handleAddMaintenance = async(e) =>{
    e.preventDefault();
    setIsLoading(true);
    let res = await warrantyApi.createWarranty(salon.salon_id, warrantyItem)
    console.log("res create warranty : ", res)
    if(res?.data?.status === "success"){
      toast.success("Thêm gói bảo hành thành công")
      handleCloseAdd()
      loadingWarranty(salon.salon_id)
      setWarrantyItem({})
    }else{
      toast.error("Thêm gói bảo hành thất bại")
    }
    setIsLoading(false)
  }
  const handleUpdateMaintenance = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    let res = await warrantyApi.updateWarranty(salon.salon_id, warrantyItem)
    if(res?.data?.status === "success"){
      toast.success("Cập nhật gói bảo hành thành công")
      handleCloseUpdate()
      loadingWarranty(salon.salon_id)
      setWarrantyItem({})
    }else{
      toast.error("Cập nhật gói bảo hành thất bại")
    }
    setIsLoading(false)
  }

  const handleDelete = async() =>{
    let res = await warrantyApi.deleteWarranty(salon.salon_id, warrantyItem.warranty_id)
    if(res?.data?.status === "success"){
      toast.success("Xóa gói bảo hành thành công")
      handleCloseDelete()
      loadingWarranty(salon.salon_id)
      setWarrantyItem({})
    }else{
      toast.error("Xóa gói bảo hành thất bại")
    }
  }
  return (
    <>
    <div id="content" className="container-fluid">
    <div className="card">
      <div className="card-header fw-bold">
        <h4 className="text-center fw-bold py-1 my-0">
          Danh sách các gói bảo hành
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
              placeholder="Nhập tên gói bảo hành"
            />
            <button className="btn btn-primary mx-2">Tìm kiếm</button>
          </div>
          {(permissions?.includes("OWNER") ||
            permissions.includes("C_MT")) && (
            <button className="btn btn-success" onClick={handleShowAdd}>
              Thêm gói bảo hành mới
            </button>
          )}
        </div>
        <table className="table mt-4 table-hover" style={{width:"100%"}}>
          <thead>
            <tr>
              <th scope="col" className="text-center">
                STT
              </th>
              <th scope="col" style={{width:"20%"}}>Tên gói bảo hành</th>
              <th scope="col">Số kilomet bảo hành</th>
              <th scope="col">Thời gian bảo hành</th>
              <th scope="col">Chính sách bảo hành</th>
              {/* <th scope="col">Ghi chú</th> */}
              <th scope="col" className="text-center" style={{width:"10%"}}>
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {warranties && warranties.length > 0 ? (
              warranties.map((maintenance, index) => (
                <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">{++index}</td>

                  <td>{maintenance.name}</td>
                  <td>{maintenance.limit_kilometer}</td>
                  <td>{maintenance.months}</td>
                  <td>{maintenance.policy}</td>
                  {/* <td>{maintenance.note}</td> */}
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
  <Modal show={showAdd} onHide={handleCloseAdd}>
        <Form onSubmit={handleAddMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới gói bảo hành </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên gói bảo hành</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số kilomet bảo hành</Form.Label>
              <Form.Control
                required
                type="number"
                name="limit_kilometer"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số tháng bảo hành</Form.Label>
              <Form.Control
                required
                type="number"
                name="months"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chính sách bảo hành</Form.Label>
              <Form.Control
                required
                type="text"
                name="policy"
                onChange={onChange}
              />
            </Form.Group>
            {/* <Form.Group className="mt-4">
              <Form.Label>ghi chú</Form.Label>
              <Form.Control
                required
                type="text"
                name="note"
                onChange={onChange}
              />
            </Form.Group> */}
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
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Form onSubmit={handleUpdateMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật gói bảo hành </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mt-4">
              <Form.Label>Tên gói bảo hành</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
                value={warrantyItem.name}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số kilomet bảo hành</Form.Label>
              <Form.Control
                required
                type="number"
                name="limit_kilometer"
                onChange={onChange}
                value={warrantyItem.limit_kilometer}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số tháng bảo hành</Form.Label>
              <Form.Control
                required
                type="number"
                name="months"
                onChange={onChange}
                value={warrantyItem.months}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chính sách bảo hành</Form.Label>
              <Form.Control
                required
                type="textarea"
                name="policy"
                onChange={onChange}
                value={warrantyItem.policy}
              />
            </Form.Group>
            {/* <Form.Group className="mt-4">
              <Form.Label>ghi chú</Form.Label>
              <Form.Control
                required
                type="text"
                name="note"
                onChange={onChange}
                value={warrantyItem.note}
              />
            </Form.Group> */}
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
      <Modal show={showDelete} onHide={handleCloseDelete} >
        <Modal.Header closeButton>
          <Modal.Title>Xóa dịch vụ bào dưỡng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa gói bảo hành <strong>{warrantyItem && warrantyItem.name}</strong> này
            không ?
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
  )
}
