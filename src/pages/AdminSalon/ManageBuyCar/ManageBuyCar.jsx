import React, { useEffect, useState } from 'react'
import userApi from '../../../apis/user.api';
import invoiceApi from '../../../apis/invoice.api';
import salonApi from '../../../apis/salon.api';
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';

export default function ManageBuyCar() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [invoices, setInvoices] = useState([])
  const [BuyCarInfor, setBuyCarInfor] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [salon, setSalon] = useState({});
  const [carId, setCarId] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [showWarranty, setShowWarranty] = useState(false);
  const [warranty, setWarranty] = useState({})
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const loadingInvoice = async(salon_id) => {
    let res = await invoiceApi.getAllInvoiceBuyCar(salon_id)
    console.log("res invoice : ", res)
    if(res?.data?.invoices){
      setInvoices(res.data.invoices)
    }
  }
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon?.cars) {
      setCars(res.data.salon.cars);
    }
    if (res?.data?.salon) {
      console.log("salonId: ", res.data.salon.salon_id)
      loadingInvoice(res.data.salon.salon_id)
      setSalon(res.data.salon)
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
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };
  const onChange = (e) => {
    setBuyCarInfor({ ...BuyCarInfor, [e.target.name]: e.target.value });
  };
  const handleAddBuyCar = async(e) =>{
     e.preventDefault();
     console.log("BuyCarInfor : ", carId)
     let res = invoiceApi.createBuyCarInvoice(salon.salon_id,carId,BuyCarInfor )
     console.log("res create buy car : ", res)
     toast.success("Thêm thông tin giao dịch thành công")
     handleCloseAdd()
     loadingInvoice(salon.salon_id)
     setBuyCarInfor({})
    //  if(res?.data?.status === "success"){
    //   toast.success("Thêm thông tin giao dịch thành công")
    //   handleCloseAdd()
    //   loadingInvoice(salon.salon_id)
    //   setBuyCarInfor({})
    // }else{
    //   toast.error("Thêm thông tin giao dịch thất bại")
    // }
  }
  const handleSetCarId =(item)=>{
    console.log("item : ", item)
     setCarId(item.car_id)
  }
  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const handeSearch = async() => {
     let res = await invoiceApi.getInvoiceBuyCarByPhone(searchInput)
     console.log("search : ", res)
  }
  const handleDelete = () => {
    
  }
  const handleShowWarranty = async (invoice) => {
    setShowWarranty(true);
    setWarranty(invoice)
  };
  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };
  return (
    <>
        <div id="content" className="container-fluid">
    <div className="card">
      <div className="card-header fw-bold">
        <h4 className="text-center fw-bold py-1 my-0">
          Danh sách các giao dịch mua xe
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
              placeholder="Nhập số điện thoại"
              onChange={(e) => handleChangeSearch(e)}
            />
            <button className="btn btn-primary mx-2" onClick={handeSearch}>Tìm kiếm</button>
          </div>
          {(permissions?.includes("OWNER") ||
            permissions.includes("C_BC")) && (
            <button className="btn btn-success" onClick={handleShowAdd}>
              Thêm giao dịch mua xe
            </button>
          )}
        </div>
        <table className="table mt-4 table-hover" style={{width:"100%"}}>
          <thead>
            <tr>
              <th scope="col" className="text-center">
                STT
              </th>
              <th scope="col" style={{width:"20%"}}>Tên khách hàng</th>
              <th scope="col">số điện thoại</th>
              <th scope="col">email</th>
              <th scope="col">tên xe</th>
              <th scope="col">tổng tiền</th>
              <th scope="col" className="text-center" style={{width:"15%"}}>
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">{++index}</td>

                  <td>{invoice.fullname}</td>
                  <td>{invoice.phone}</td>
                  <td>{invoice.email}</td>
                  <td>{invoice.carName}</td>
                  <td>{invoice.expense}</td>
                  <td className="text-center">
                  <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowWarranty(invoice)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                    {(permissions?.includes("OWNER") ||
                      permissions.includes("U_IV")) && (
                      <button
                        className="btn btn-success btn-sm rounded-0 text-white mx-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit"
                        //onClick={() => handleShowUpdate(maintenance)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    )}
                    {(permissions?.includes("OWNER") ||
                      permissions.includes("D_IV")) && (
                      <button
                        to="/"
                        className="btn btn-danger btn-sm rounded-0 text-white"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                        //onClick={() => handleShowDelete(maintenance)}
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
        <Form onSubmit={handleAddBuyCar}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới giao dịch mua xe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chọn xe</Form.Label>
              <Form.Select aria-label="Default select example">
                {cars?.length > 0 && cars.map((item, index) => {
                    return(
                      <option value={item.car_id} key={index} onClick={() => handleSetCarId(item)}>{item.name}</option>
                    )
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tổng tiền</Form.Label>
              <Form.Control
                required
                type="text"
                name="expense"
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
          <Modal.Title>Xóa tính năng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn giao dịch mua xe này
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
      <Modal show={showWarranty} onHide={handleCloseWarranty}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin bảo hành cho xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Số kilomet bảo hành</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={warranty?.limit_kilometer}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Số tháng bảo hành</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={warranty?.months}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Chính sách bảo hành</Form.Label>
            <Form.Control
              as="textarea"
              //placeholder="Leave a comment here"
              style={{ minHeight: '150px' }}
              value={warranty?.policy}
              readOnly
            />
            
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarranty}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
