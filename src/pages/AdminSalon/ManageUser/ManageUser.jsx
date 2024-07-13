import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import permissionApi from "../../../apis/permission.api";
import salonApi from "../../../apis/salon.api";
import { toast } from "react-toastify";
import { debounce, set } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Label } from "reactstrap";
const LIMIT = 5;
export default function ManageUser() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailRole, setDetailRole] = useState(false);
  const [detailRoleSalon, setDetailRoleSalon] = useState(false);
  const [detailRoleCalender, setDetailRoleCalender] = useState(false);
  const [detailRoleMaintenance, setDetailRoleMaintenance] = useState(false);
  const [detailRoleInvoice, setDetailRoleInvoice] = useState(false);
  const [detailRoleWRT, setDetailRoleWRT] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [salonId, setSalonId] = useState("");
  const [salon, setSalon] = useState({});
  const [permission, setPermission] = useState([]);
  //const testArr = ["getCar", "postCar", "deleteCar", "getCalender", "postCalender", "deleteCaleder", "getSalon", "patchSalon"];
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showManageRole, setShowManageRole] = useState(false);
  const [roles, setRoles] = useState([])
  const [isAddRole, setIsAddRole] = useState(false)
  const [nameRole, setNameRole] = useState("")
  const [idRole, setIdRole] = useState("")
  const handleShowManageRole = () => {
    setShowManageRole(true);
  };
  const handleCloseManageRole = () => {
    setShowManageRole(false);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loading(1, searchValue);
    }, 1000);
  };
  const loading = async (page, search) => {
    let res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalonId(res.data.salon.salon_id);
      setSalon(res.data.salon);
      let res2 = await permissionApi.getPermission({
        salonId: res.data.salon.salon_id,
        page,
        per_page: LIMIT,
        q: search,
      });
      console.log("res2 : ", res2)
      if (res2?.data?.salonDb?.employees) {
        setEmployees(res2.data.salonDb.employees);
        setTotalPage(res2.data.total_page);
      }
    }
  };
 const loadingAllRoleOfSalon = async () => {
      try{
        let res = await permissionApi.getAllRoleOfSalon()
        if(res?.data?.data){
          setRoles(res.data.data)
        }
      }catch(e){
         console.log(e)
      }
  }
  useEffect(() => {
    loading(page, search);
  }, [page, search]);
  useEffect(() => {
    loadingAllRoleOfSalon()
  }, [])
  const handleShowUpdate = (employee) => {
    loading();
    if(roles?.length > 0){
      setIdRole(roles[0].id)
    }
    let listPermission = employee.permissions;
    let objectPermission = {};
    if (listPermission && listPermission.length > 0) {
      listPermission.forEach((permission) => {
        objectPermission[permission] = permission;
      });
      setPermission(objectPermission);
    }
    setEmployee(employee);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleToggleDetailRole = () => {
    setDetailRole(!detailRole);
  };

  const handleToggleDetailRoleSalon = () => {
    setDetailRoleSalon(!detailRoleSalon);
  };
  const handleToggleDetailRoleInvoice = () => {
    setDetailRoleInvoice(!detailRoleInvoice);
  };
  const handleToggleDetailRoleCalender = () => {
    setDetailRoleCalender(!detailRoleCalender);
  };
  const handleToggleDetailRoleMaintenance = () => {
    setDetailRoleMaintenance(!detailRoleMaintenance)
  }
  const handleToggleDetailRoleWRT = () => {
    setDetailRoleWRT(!detailRoleWRT)
  }
  const handleSetPermission = (e, name) => {
    if (e.target.checked) {
        setPermission((prevPermission) => [...prevPermission, name]);
    } else {
        setPermission((prevPermission) =>
            prevPermission.filter((permission) => permission !== name)
        );
    }
};
  const handleSavePermission = () => {
    let listPermission = [];
    listPermission = Object.keys(permission).filter(
      (key) => permission[key] !== null
    );
    permissionApi.postPermission(salonId, listPermission, employee.user_id);
    toast.success("Cập nhật quyền thành công");
    loading();
    handleCloseUpdate();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm số 0 phía trước nếu cần
    const year = date.getFullYear().toString(); // Lấy năm

    return `${day}/${month}/${year}`;
  };

  const handleShowAddRole = (e) => {
    e.preventDefault()
    setIsAddRole(!isAddRole);
    setPermission([])
  }
  const handleSaveRole = async() => {
     try{
        let res = await permissionApi.createRole(salonId, nameRole, permission)
        if(res?.data?.status === "success"){
          toast.success("Tạo Role thành công")
          setPermission([])
        }else{
          toast.error("Tạo Role thất bại")
        }
     }catch(e){

     }
  }
  const handleAssignPermission = async () =>{
    try{
       console.log("id : ", idRole)
       console.log("idemploy : ", employee.user_id)
       let res = await permissionApi.assignRole(employee.user_id, idRole)
       console.log("res assign : ", res)
       if(res?.data?.status === "success"){
        toast.success("gán quyền thành công")
       }else{
        toast.error("Gán quyền thất bại")
       }
    }catch(e){
      console.log(e)
    }
  }
  const handleUpdateRole = async () => {
     try{
        let res = await permissionApi.updateRole(idRole,nameRole,permission, salonId)
        console.log("res update : ", res)
     }catch(e){
      console.log(e)
     }
  }
  const handleChangeIdRole = (e) => {
    console.log("id role : ", e.target.value)
    setIdRole(e.target.value)
  }
  console.log("permissions : ", permission)
  console.log("id : ", idRole)
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
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ width: "100px" }}>Tìm kiếm:</span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  style={{ width: "100%" }}
                  placeholder="Nhập tên khách hàng"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={handleShowManageRole}
              >
                Quản lý quyền
              </button>
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
                {employees && employees.length > 0 ? (
                  employees.map((employee, index) => {
                    if (salon.user_id !== employee.user_id) {
                      return (
                        <tr style={{ background: "rgb(247 247 247)" }}>
                          <td className="text-center">
                            {LIMIT * (page - 1) + (index + 1)}
                          </td>
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
                    } else {
                      return "";
                    }
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="fst-italic">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {employees && employees.length > 0 && (
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
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        size="lg"
        backdrop="static"
      >
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
              <div className="name-box col-6">
                <label>Nhóm quyền</label>
                <Form.Select onChange={handleChangeIdRole} value={idRole}>
                {roles?.length > 0 && roles.map((role, index) =>{
                  return(
                    <option key={index} value={role.id}>
                       {role.name}
                    </option>
                  )
                })}
                </Form.Select>
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
              <span className="mx-2" onClick={handleAssignPermission}>
                Cập nhật
              </span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={showManageRole}
        onHide={handleCloseManageRole}
        size="lg"
        backdrop="static"
      >
        <Form noValidate>
          <Modal.Header closeButton>
            <Modal.Title> Quản lý quyền</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="name-box d-flex justify-content-between align-items-center">
                <div className="col-6">
                  <label>Danh sách các role</label>
                  <Form.Select
                    className="form-control"
                    readOnly
                  >
                     {roles?.length > 0 && roles.map((role) => {
                      return (
                        <option onClick={() => setPermission(role.permissions)}>{role.name}</option>
                      )
                     })}
                  </Form.Select>
                </div>
                {isAddRole === true ? (
                  <button
                  className="btn btn-success"
                  //onClick={(e) => handleShowAddRole(e)}
                >
                  Cập  nhật Role
                </button>
                ): (
                  <button
                className="btn btn-success"
                onClick={(e) => handleShowAddRole(e)}
              >
                Tạo  Role
              </button>
                )}
                
              </div>
              {isAddRole === true ? (
                <Form.Group className="col-6 mt-3">
                <Label>Tên Role: </Label>
                <Form.Control
                   type="text"
                   onChange={(e) => setNameRole(e.target.value)}
                >
          
                </Form.Control>
              </Form.Group>
              ): ""}
              <div className="list-role-container col-6">
                <p className="permisstion-text">
                  <strong>Quyền hạn</strong> cho Role
                </p>
                <div className="list-role-box">
                  <div className="list-role">
                    <div
                      className="role-item"
                      onClick={() => handleToggleDetailRoleSalon()}
                    >
                      <div className="left-role-item">
                        <i className="fa-solid fa-chevron-right"></i>
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
                              permission?.length >0 && permission?.includes("R_SL")
                            }
                            value={permission.R_SL}
                            onChange={(e) => handleSetPermission(e, "R_SL")}
                          />
                          <div className="role-detail">
                            <p className="role-text-top">Xem thông tin salon</p>
                            <p className="get-method">GET</p>
                          </div>
                        </div>
                        <div className="role-item-detail role-patch">
                          <input
                            type="checkbox"
                            className="switch-toggle"
                            value={permission.U_SL}
                            checked={
                             permission?.length >0 && permission?.includes("U_SL")
                            }
                            onChange={(e) => handleSetPermission(e, "U_SL")}
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
                            <i className="fa-solid fa-chevron-right"></i>
                          ) : (
                            <i className="fa-solid fa-angle-down"></i>
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
                                permission?.length >0 && permission?.includes("R_CAR")
                               }
                              value={permission.R_CAR}
                              onChange={(e) => handleSetPermission(e, "R_CAR")}
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
                              value={permission.C_CAR}
                              onChange={(e) => handleSetPermission(e, "C_CAR")}
                              checked={
                                permission?.length >0 && permission?.includes("C_CAR")
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
                              value={permission.D_CAR}
                              checked={
                                permission?.length >0 && permission?.includes("D_CAR")
                               }
                              onChange={(e) => handleSetPermission(e, "D_CAR")}
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
                              value={permission.U_CAR}
                              checked={
                                permission?.length >0 && permission?.includes("U_CAR")
                               }
                              onChange={(e) => handleSetPermission(e, "U_CAR")}
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
                      <div
                        className="role-item"
                        onClick={() => handleToggleDetailRoleCalender()}
                      >
                        <div className="left-role-item">
                          <i className="fa-solid fa-chevron-right"></i>
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
                                permission?.length >0 && permission?.includes("R_APM")
                               }
                              value={permission.R_APM}
                              onChange={(e) => handleSetPermission(e, "R_APM")}
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
                              value={permission.D_APM}
                              checked={
                                permission?.length >0 && permission?.includes("D_APM")
                               }
                              onChange={(e) => handleSetPermission(e, "D_APM")}
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
                              value={permission.U_APM}
                              checked={
                                permission?.length >0 && permission?.includes("U_APM")
                               }
                              onChange={(e) => handleSetPermission(e, "U_APM")}
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
                      <div
                        className="role-item"
                        onClick={() => handleToggleDetailRoleWRT()}
                      >
                        <div className="left-role-item">
                          <i class="fa-solid fa-chevron-right"></i>
                          <span>Quản lí bảo hành</span>
                        </div>
                        <div className="right-role-item">
                          <input type="checkbox" className="switch-toggle" />
                        </div>
                      </div>
                      {detailRoleWRT === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission?.length >0 && permission?.includes("R_WRT")
                               }
                              value={permission.R_WRT}
                              onChange={(e) => handleSetPermission(e, "R_WRT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông gói bảo hành
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-post">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.C_WRT}
                              onChange={(e) => handleSetPermission(e, "C_WRT")}
                              checked={
                                permission?.length >0 && permission?.includes("C_WRT")
                               }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Thêm gói bảo hành
                              </p>
                              <p className="post-method">POST</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-delete">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.D_WRT}
                              checked={
                                permission?.length >0 && permission?.includes("D_WRT")
                               }
                              onChange={(e) => handleSetPermission(e, "D_WRT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xóa gói bảo hành
                              </p>
                              <p className="delete-method">DELETE</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.U_WRT}
                              checked={
                                permission?.length >0 && permission?.includes("U_WRT")
                               }
                              onChange={(e) => handleSetPermission(e, "U_WRT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật gói bảo hành
                              </p>
                              <p className="patch-method">PATCH</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="role-item"
                        onClick={() => handleToggleDetailRoleMaintenance()}
                      >
                        <div className="left-role-item">
                          <i class="fa-solid fa-chevron-right"></i>
                          <span>Quản lí bảo dưỡng</span>
                        </div>
                        <div className="right-role-item">
                          <input type="checkbox" className="switch-toggle" />
                        </div>
                      </div>
                      {detailRoleMaintenance === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission?.length >0 && permission?.includes("R_MT")
                               }
                              value={permission.R_MT}
                              onChange={(e) => handleSetPermission(e, "R_MT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông gói bảo dưỡng
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-post">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.C_MT}
                              onChange={(e) => handleSetPermission(e, "C_MT")}
                              checked={
                                permission?.length >0 && permission?.includes("C_MT")
                               }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Thêm gói bảo dưỡng
                              </p>
                              <p className="post-method">POST</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-delete">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.D_MT}
                              checked={
                                permission?.length >0 && permission?.includes("D_MT")
                               }
                              onChange={(e) => handleSetPermission(e, "D_MT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xóa gói bảo dưỡng
                              </p>
                              <p className="delete-method">DELETE</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.U_MT}
                              checked={
                                permission?.length >0 && permission?.includes("U_MT")
                               }
                              onChange={(e) => handleSetPermission(e, "U_MT")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật gói bảo dưỡng
                              </p>
                              <p className="patch-method">PATCH</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="role-item"
                        onClick={() => handleToggleDetailRoleInvoice()}
                      >
                        <div className="left-role-item">
                          <i class="fa-solid fa-chevron-right"></i>
                          <span>Quản lí giao dịch</span>
                        </div>
                        <div className="right-role-item">
                          <input type="checkbox" className="switch-toggle" />
                        </div>
                      </div>
                      {detailRoleInvoice === true ? (
                        <div className="role-item-detail-container">
                          <div className="role-item-detail role-get">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              checked={
                                permission?.length >0 && permission?.includes("R_IV")
                               }
                              value={permission.R_IV}
                              onChange={(e) => handleSetPermission(e, "R_IV")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xem thông tin giao dịch
                              </p>
                              <p className="get-method">GET</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-post">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.C_IV}
                              onChange={(e) => handleSetPermission(e, "C_IV")}
                              checked={
                                permission?.length >0 && permission?.includes("C_IV")
                               }
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Thêm thông tin giao dịch
                              </p>
                              <p className="post-method">POST</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-delete">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.D_IV}
                              checked={
                                permission?.length >0 && permission?.includes("D_IV")
                               }
                              onChange={(e) => handleSetPermission(e, "D_IV")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Xóa thông tin giao dịch
                              </p>
                              <p className="delete-method">DELETE</p>
                            </div>
                          </div>
                          <div className="role-item-detail role-patch">
                            <input
                              type="checkbox"
                              className="switch-toggle"
                              value={permission.U_IV}
                              checked={
                                permission?.length >0 && permission?.includes("U_IV")
                               }
                              onChange={(e) => handleSetPermission(e, "U_IV")}
                            />
                            <div className="role-detail">
                              <p className="role-text-top">
                                Cập nhật thông tin giao dịch
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
            <Button variant="secondary" onClick={handleCloseManageRole}>
              Đóng
            </Button>
            <Button
              variant="primary"
              // onClick={handleUpdateCar}
              disabled={isLoading}
            >
              {isLoading && <Spinner animation="border" size="sm" />}
              {isAddRole === true ? (
                 <span className="mx-2" onClick={handleSaveRole}>
                 Tạo
               </span>
              ): (
                <span className="mx-2" onClick={handleUpdateRole}>
                Cập nhật
              </span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
