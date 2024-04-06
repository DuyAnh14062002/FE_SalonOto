import React, { useState } from 'react'
import { Form,Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss"
export default function ManageUser() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [detailRole , setDetailRole] = useState(false)
  const handleShowUpdate = () =>{
     console.log("oke")
     setShowUpdate(true)
  }
  const handleCloseUpdate = () =>{
    setShowUpdate(false)
  }
  const handleToggleDetailRole = () =>{
    setDetailRole(!detailRole)
  }
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
               <tr
                  style={{ background: "rgb(247 247 247)" }}
                >
                  <td className="text-center">1</td>

                  <td>Đào Duy Anh</td>
                  <td>0384496705</td>
                  <td>Nam</td>
                  <td>51/34 linh chiểu thủ đức</td>
                  <td>14/06/2002</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      onClick={() => handleShowUpdate()}
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
            {/* {cars && cars.length > 0 ? (
              cars.map((car, index) => (
                <tr
                  key={index}
                  style={{ background: "rgb(247 247 247)" }}
                >
                  <td className="text-center">{++index}</td>

                  <td>{car.name}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.price}</td>
                  <td className="text-center">
                  <button
                        className="btn btn-warning btn-sm rounded-0 text-white"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="info"
                       // onClick={() => handleShowInfor(car)}
                      >
                        <i className="fa-solid fa-circle-question"></i>
                      </button>
                    <button
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      //onClick={() => handleShowUpdate(car)}
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="fst-italic">
                  Không có dữ liệu nào
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    <Modal show={showUpdate} onHide={handleCloseUpdate} size='lg'>
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title> Cập nhật quyền nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                <div className='name-box col-6'>
                  <label>Tên nhân viên</label>
                  <input className='form-control' value="Đào Duy Anh" readOnly></input>
                </div>
                <div className='list-role-container col-6'>
                  <p className='permisstion-text'><strong>Quyền hạn</strong>  Các quyền hạn được cho phép cho nhân viên này</p>
                  <div className='list-role-box'>
                  <div className='list-role'>
                    <div className='role-item'>
                      <div className='left-role-item'>
                        <i class="fa-solid fa-chevron-right"></i>
                        <span>Quản lí Salon</span>
                      </div>
                      <div className='right-role-item'>
                        <input type='checkbox' className='switch-toggle'/>
                      </div>
                    </div>
                    <div className='role-item-box'>
                      <div className='role-item' onClick={() => handleToggleDetailRole()}>
                        <div className='left-role-item'>
                          {detailRole === false ? (<i class="fa-solid fa-chevron-right"></i>) : (<i class="fa-solid fa-angle-down"></i>)}
                          <span>Quản lí xe hơi</span>
                        </div>
                        <div className='right-role-item'>
                          <input type='checkbox' className='switch-toggle'/>
                        </div>
                      </div>
                      {
                        detailRole === true ? (
                          <div className='role-item-detail-container'>
                          <div className='role-item-detail role-get'>
                             <input type='checkbox' className='switch-toggle'/>
                             <div className='role-detail'>
                                <p className='role-text-top'>Xem thông tin xe hơi</p>
                                <p className='get-method'>GET</p>
                             </div>
                          </div>
                          <div className='role-item-detail role-post'>
                          <input type='checkbox' className='switch-toggle'/>
                             <div className='role-detail'>
                                <p className='role-text-top'>Thêm thông tin xe hơi</p>
                                <p className='post-method'>POST</p>
                             </div>
                          </div>
                          <div className='role-item-detail role-delete'>
                          <input type='checkbox' className='switch-toggle'/>
                             <div className='role-detail'>
                                <p className='role-text-top'>Xóa thông tin xe hơi</p>
                                <p className='delete-method'>DELETE</p>
                             </div>
                          </div>
                          <div className='role-item-detail role-patch'>
                          <input type='checkbox' className='switch-toggle'/>
                             <div className='role-detail'>
                                <p className='role-text-top'>Cập nhật thông tin xe hơi</p>
                                <p className='patch-method'>PATCH</p>
                             </div>
                          </div>
                       </div>
                        ): ""
                      }
                      <div className='role-item'>
                        <div className='left-role-item'>
                          <i class="fa-solid fa-chevron-right"></i>
                          <span>Quản lí bảo hành</span>
                        </div>
                        <div className='right-role-item'>
                          <input type='checkbox' className='switch-toggle'/>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" 
              onClick={handleCloseUpdate}>
                Đóng
              </Button>
              <Button
                variant="primary"
               // onClick={handleUpdateCar}
                disabled={isLoading}
              >
                {isLoading && <Spinner animation="border" size="sm" />}
                <span className="mx-2">Cập nhật</span>
              </Button>
            </Modal.Footer>
          </Form>
    </Modal>
    </>
  )
}
