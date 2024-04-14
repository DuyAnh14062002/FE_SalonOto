import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import permissionApi from "../../../apis/permission.api";
import { useSelector } from "react-redux";
import salonApi from "../../../apis/salon.api";
import { toast } from "react-toastify";
import { ConsoleLevel } from "@zegocloud/zego-uikit-prebuilt";
export default function ManageUser() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailRole, setDetailRole] = useState(false);
  const [detailRoleSalon, setDetailRoleSalon] = useState(false)
  const [detailRoleCalender, setDetailRoleCalender] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("")
  const [salonId, setSalonId] = useState("")
  const [salon, setSalon] = useState({})
  const [permission, setPermission] = useState({});
  //const testArr = ["getCar", "postCar", "deleteCar", "getCalender", "postCalender", "deleteCaleder", "getSalon", "patchSalon"];

  const loading = async () => {
    let res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalonId(res.data.salon.salon_id)
      setSalon(res.data.salon)
      let res2 = await permissionApi.getPermission(res.data.salon.salon_id);
      if (res2?.data?.salonDb?.employees) {
        setEmployees(res2.data.salonDb.employees);
      }
    }
  };
  useEffect(() => {
    loading();
  }, []);
  const handleShowUpdate = (employee) => {
    loading()
    let listPermission = employee.permissions
    let objectPermission = {}
    if(listPermission && listPermission.length > 0){
      listPermission.forEach((permission) => {
        objectPermission[permission] = permission
      })
      setPermission(objectPermission)
    }
    setEmployee(employee)
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleToggleDetailRole = () => {
    setDetailRole(!detailRole);
  };

  const handleToggleDetailRoleSalon = () =>{
    setDetailRoleSalon(!detailRoleSalon)
  }

  const handleToggleDetailRoleCalender = () =>{
    setDetailRoleCalender(!detailRoleCalender)
  }
  const handleSetPermission = (e, name) => {
    if (e.target.checked === true) {
      setPermission((prevPermission) => ({
        ...prevPermission,
        [name]: name,
      }));
    }else{
      setPermission((prevPermission) => ({
        ...prevPermission,
        [name]: null,
      }));
    }
  };
  const handleSavePermission = () => {
    let listPermission = [];
    listPermission = Object.keys(permission).filter(
      (key) => permission[key] !== null
    );
   permissionApi.postPermission(salonId, listPermission,employee.user_id );
   toast.success("Cập nhật quyền thành công")
   loading()
   handleCloseUpdate()
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 phía trước nếu cần
    const year = date.getFullYear().toString(); // Lấy năm
    
    return `${day}/${month}/${year}`;
  };
  console.log("permission : ", permission)
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các Nhân viên
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
                  placeholder="Nhập tên nhân viên"
                />
                <button className="btn btn-primary mx-2">Tìm kiếm</button>
              </div>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees &&
                  employees.length > 0 &&
                  employees.map((employee, index) => {
                      if(salon.user_id !== employee.user_id){
                        return (
                          <tr style={{ background: "rgb(247 247 247)" }}>
                            <td className="text-center">{index +1}</td>
                            <td>{employee.fullname}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.address}</td>
                            <td>{formatDate(employee.date_of_birth)}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-success btn-sm rounded-0 text-white mx-2"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                onClick={() => handleShowUpdate(employee)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                to="/"
                                className="btn btn-danger btn-sm rounded-0 text-white"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                //onClick={() => handleShowDelete(car)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }else{
                        return ""
                      }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showUpdate} onHide={handleCloseUpdate} size="lg">
        <Form noValidate>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật quyền nhân viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="name-box col-6">
                <label>Tên nhân viên</label>
                <input
                  className="form-control"
                  value={employee.fullname}
                  readOnly
                ></input>
              </div>
              <div className="list-role-container col-6">
                <p className="permisstion-text">
                  <strong>Quyền hạn</strong> Các quyền hạn được cho phép cho
                  nhân viên này
                </p>
                <div className="list-role-box">
                  <div className="list-role">
                    <div className="role-item" onClick={() => handleToggleDetailRoleSalon()}>
                      <div className="left-role-item">
                        <i class="fa-solid fa-chevron-right"></i>
                        <span>Quản lí Salon</span>
                      </div>
                      <div className="right-role-item">
                        <input type="checkbox" className="switch-toggle" />
                      </div>
                    </div>
                    {detailRoleSalon === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission.getSalon && permission.getSalon === "getSalon"
                              }
                              value={permission.getSalon}
                              onChange={(e) => handleSetPermission(e, "getSalon")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông tin salon
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.patchSalon}
                              checked={
                                permission.patchSalon && permission.patchSalon === "patchSalon"
                              }
                              onChange={(e) =>
                                handleSetPermission(e, "patchSalon")
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật thông tin Salon
                              </p>
                              <p className="patch-method">PATCH</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    <div className="role-item-box">
                      <div
                        className="role-item"
                        onClick={() => handleToggleDetailRole()}
                      >
                        <div className="left-role-item">
                          {detailRole === false ? (
                            <i class="fa-solid fa-chevron-right"></i>
                          ) : (
                            <i class="fa-solid fa-angle-down"></i>
                          )}
                          <span>Quản lí xe hơi</span>
                        </div>
                        <div className="right-role-item">
                          <input type="checkbox" className="switch-toggle" />
                        </div>
                      </div>
                      {detailRole === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission.getCar && permission.getCar === "getCar"
                              }
                              value={permission.getCar}
                              onChange={(e) => handleSetPermission(e, "getCar")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông tin xe hơi
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-post">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.postCar}
                              onChange={(e) =>
                                handleSetPermission(e, "postCar")
                              }
                              checked={
                                permission.postCar && permission.postCar === "postCar"
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Thêm thông tin xe hơi
                              </p>
                              <p className="post-method">POST</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-delete">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.deleteCar}
                              checked={
                                permission.deleteCar && permission.deleteCar === "deleteCar"
                              }
                              onChange={(e) =>
                                handleSetPermission(e, "deleteCar")
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xóa thông tin xe hơi
                              </p>
                              <p className="delete-method">DELETE</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.patchCar}
                              checked={
                                permission.patchCar && permission.patchCar === "patchCar"
                              }
                              onChange={(e) =>
                                handleSetPermission(e, "patchCar")
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật thông tin xe hơi
                              </p>
                              <p className="patch-method">PATCH</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="role-item"  onClick={() => handleToggleDetailRoleCalender()}>
                        <div className="left-role-item">
                          <i class="fa-solid fa-chevron-right"></i>
                          <span>Quản lí lịch hẹn</span>
                        </div>
                        <div className="right-role-item">
                          <input type="checkbox" className="switch-toggle" />
                        </div>
                      </div>
                      {detailRoleCalender === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission.getCalender && permission.getCalender === "getCalender"
                              }
                              value={permission.getCalender}
                              onChange={(e) => handleSetPermission(e, "getCalender")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông tin lịch hẹn
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-delete">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.deleteCalender}
                              checked={
                                permission.deleteCalender && permission.deleteCalender === "deleteCalender"
                              }
                              onChange={(e) =>
                                handleSetPermission(e, "deleteCalender")
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xóa thông tin lịch hẹn
                              </p>
                              <p className="delete-method">DELETE</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.patchCalender}
                              checked={
                                permission.patchCalender && permission.patchCalender === "patchCalender"
                              }
                              onChange={(e) =>
                                handleSetPermission(e, "patchCalender")
                              }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật thông tin lịch hẹn
                              </p>
                              <p className="patch-method">PATCH</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Đóng
            </Button>
            <Button
              variant="primary"
              // onClick={handleUpdateCar}
              disabled={isLoading}
            >
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2" onClick={handleSavePermission}>
                Cập nhật
              </span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
