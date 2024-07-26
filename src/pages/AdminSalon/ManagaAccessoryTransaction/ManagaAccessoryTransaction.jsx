import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import salonApi from "../../../apis/salon.api";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { PaginationControl } from "react-bootstrap-pagination-control";
import AccessoryApi from "../../../apis/accessory.api";
import { formatCurrency } from "../../../utils/common";
import "./ManagaAccessoryTransaction.scss";
import paymentMethodApi from "../../../apis/paymentMethod.api";
import paymentRequestApi from "../../../apis/paymentRequest.api";
import { debounce } from "lodash";
const LIMIT = 4;

export default function ManagaAccessoryTransaction() {
  const [invoiceAccessory, setInvoiceAccessory] = useState([]);
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showInfor, setShowInfor] = useState(false);
  const [accessory, setAccessory] = useState([]);
  const [accessoryItem, setAccessoryItem] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceChoose, setInvoiceChoose] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [methodPaymentId, setMethodPaymentId] = useState("");
  const [salon, setSalon] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchAccessory, setSearchAccessory] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingInvoiceBuyAccessory(1, searchValue);
    }, 1000);
  };
  const fetchListPaymentMethod = async () => {
    const res = await paymentMethodApi.getAllPaymentMethod();
    if (res?.data?.data) {
      setListPaymentMethod(res.data.data);
      setMethodPaymentId(res.data.data[0].id);
    }
  };

  useEffect(() => {
    fetchListPaymentMethod();
  }, []);
  let loadingInvoiceBuyAccessory = async (page, search) => {
    try {
      let res = await AccessoryApi.getInvoiceBuyAccessory(page, LIMIT, search);
      console.log("res : ", res);
      if (res?.data?.invoices) {
        setInvoiceAccessory(res.data.invoices);
        setTotalPage(res.data.total_page);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const loadingPermistion = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  useEffect(() => {
    loadingInvoiceBuyAccessory(page, search);
    loadingPermistion();
    fetchDataSalon();
  }, [page, search]);
  useEffect(() => {
    if (salon?.salon_id) {
      loadingAccessory(salon.salon_id, searchAccessory);
    }
  }, [salon, searchAccessory]);
  const handleAddInvoiceBuyAccessory = async (e) => {
    e.preventDefault();
    const listAccessoryChecked = accessory.filter((item) => item.checked);
    const listAccessoryId = listAccessoryChecked.map((item) => ({
      accessory_id: item.accessory_id.toString(),
      quantity: item.quantity,
    }));
    try {
      let res = await AccessoryApi.createInvoiceBuyAccessory(
        data,
        listAccessoryId
      );
      console.log("res : ", res);
      if (res?.data?.status === "success") {
        toast.success("Thêm giao dịch phụ tùng thành công ! ");
        handleCloseAdd();
        loadingInvoiceBuyAccessory();
        setData({});
        await paymentRequestApi.createPaymentRequest({
          cusPhone: data.phone,
          cusFullname: data.fullname,
          amount: res.data.accessoryInvoice.expense,
          salonId: salon.salon_id,
          methodPaymentId,
          invoiceId: res.data.accessoryInvoice.invoice_id,
        });
      } else {
        toast.error("Thêm giao dịch phụ tùng thất bại ! ");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowInfor = (invoice) => {
    setShowInfor(true);
    setInvoiceChoose(invoice);
  };
  const handleCloseInfor = () => {
    setShowInfor(false);
  };
  const handleShowDelete = (invoice) => {
    setShowDelete(true);
    setInvoiceChoose(invoice);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowUpdate = (invoice) => {
    setShowUpdate(true);
    setAccessory((prev) =>
      prev?.map((accessory) => {
        if (invoice.accessories.find((f) => f.name === accessory.name)) {
          return {
            ...accessory,
            checked: true,
            quantity: invoice.accessories.find((f) => f.name === accessory.name)
              .quantity,
          };
        }
        return { ...accessory, checked: false, quantity: 0 };
      })
    );
    setData(invoice);
    setInvoiceChoose(invoice);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const loadingAccessory = async (salon_id, search) => {
    let res = await AccessoryApi.getAccessory(salon_id, 1, 10000, search);

    if (res?.data?.accessory) {
      const allAccessory = res.data.accessory;
      const newAllAccessory = allAccessory.map((item) => {
        return { ...item, checked: false, quantity: 0 };
      });
      setAccessory(newAllAccessory);
    }
  };

  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  const handleChangeAccessory = (data) => {
    const newAllAccessory = accessory.map((item) => {
      if (item.accessory_id === data.accessory_id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setAccessory(newAllAccessory);
  };
  const onChangeQuantity = (data, e) => {
    const newAllAccessory = accessory.map((item) => {
      if (item.accessory_id === data.accessory_id) {
        return { ...item, quantity: e.target.value };
      }
      return item;
    });
    setAccessory(newAllAccessory);
  };
  const handleDelete = async () => {
    try {
      let res = await AccessoryApi.deleteInvoiceBuyAccessory(
        invoiceChoose.invoice_id
      );
      if (res?.data?.status === "success") {
        toast.success("Xóa giao dịch thành công");
        handleCloseDelete();
        loadingInvoiceBuyAccessory();
        setInvoiceChoose({});
      } else {
        toast.error("Xóa giao dịch thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log("invoiceChoose : ", invoiceChoose);
  const handleUpdateInvoiceBuyAccessory = async (e) => {
    e.preventDefault();
    const listAccessoryChecked = accessory.filter((item) => item.checked);
    const listAccessoryId = listAccessoryChecked.map((item) => ({
      accessory_id: item.accessory_id.toString(),
      quantity: item.quantity,
    }));
    try {
      let res = await AccessoryApi.updateInvoiceBuyAccessory(
        data,
        listAccessoryId,
        invoiceChoose.invoice_id
      );
      if (res?.data?.status === "success") {
        toast.success("Cập nhật giao dịch thành công !");
        handleCloseDelete();
        loadingInvoiceBuyAccessory();
        setData({});
      } else {
        toast.error("Cập nhật giao dịch thất bại !");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchAccessory = (e) => {
    setSearchAccessory(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      loadingAccessory(salon.salon_id, 1, searchValue);
    }, 1000);
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các giao dịch phụ tùng
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
              <button className="btn btn-success" onClick={handleShowAdd}>
                Thêm giao dịch phụ tùng
              </button>
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Tên khách hàng
                  </th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Ngày mua</th>
                  <th scope="col">Tổng tiền</th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "15%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceAccessory && invoiceAccessory.length > 0 ? (
                  invoiceAccessory.map((invoice, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td> {LIMIT * (page - 1) + (index + 1)}</td>
                      <td>{invoice.fullname}</td>
                      <td>{invoice.email}</td>
                      <td>{invoice.phone}</td>
                      <td>{invoice.invoiceDate}</td>
                      <td>{formatCurrency(invoice.total)}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowInfor(invoice)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_AC")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(invoice)}
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
                            onClick={() => handleShowDelete(invoice)}
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
            {invoiceAccessory && invoiceAccessory.length > 0 && (
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
        <Form onSubmit={handleAddInvoiceBuyAccessory}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới giao dịch phụ tùng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-3">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chọn hình thức thanh toán</Form.Label>

              <Form.Select
                onChange={(e) => setMethodPaymentId(e.target.value)}
                value={methodPaymentId}
              >
                {listPaymentMethod?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.type} - {item.content}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3 wrap-accessory">
              <Form.Label>Chọn các phụ tùng sửa chữa</Form.Label>
              <div className="d-flex align-items-center">
                <span style={{ width: "80px" }}>Tìm kiếm:</span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  style={{ width: "60%" }}
                  placeholder="Nhập tên phụ tùng"
                  value={searchAccessory}
                  onChange={handleSearchAccessory}
                />
              </div>
              <div className="row list-accessory">
                {accessory &&
                  accessory.map((item, index) => (
                    <div className="accessory-box">
                      <div
                        className="col-md-4"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Check
                          key={index}
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleChangeAccessory(item)}
                          value={item.accessory_id}
                          label={item?.name}
                        />
                        <div
                          className="image-accessory-transaction"
                          style={{
                            backgroundImage: `url(${item.icon})`,
                            marginLeft: "10px",
                          }}
                        ></div>
                      </div>
                      <div className="col-md-8">
                        <div className="quantity-accessory">
                          <label>Số lượng : </label>
                          <input
                            type="number"
                            min="0"
                            name={item.name}
                            onChange={(e) => onChangeQuantity(item, e)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
      <Modal
        show={showInfor}
        onHide={handleCloseInfor}
        size="lg"
        backdrop="static"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title> Thông tin chi tiết giao dịch phụ tùng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
            <div style={{margin: "15px 0"}}>Mã giao dịch: {invoiceChoose?.invoice_id}</div>
              <h2 className="text-center">Bảng phụ tùng sửa chữa</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên phụ tùng</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày mua</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.accessories?.length > 0 &&
                    invoiceChoose.accessories.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInfor}>
              Đóng
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa giao dịch phụ tùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa giao dịch này không ?</span>
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
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
        <Form onSubmit={handleUpdateInvoiceBuyAccessory}>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật giao dịch bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-3">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChange}
                value={data.fullname}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                onChange={onChange}
                value={data.email}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                onChange={onChange}
                value={data.phone}
              />
            </Form.Group>
            <Form.Group className="mt-3 wrap-accessory">
              <Form.Label>Chọn các phụ tùng sửa chữa</Form.Label>
              <div className="row">
                {accessory &&
                  accessory.map((item, index) => (
                    <div className="accessory-box">
                      <div className="col-md-4">
                        <Form.Check
                          key={index}
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleChangeAccessory(item)}
                          value={item.accessory_id}
                          label={item?.name}
                        />
                        <div
                          className="icon-accesory"
                          style={{ backgroundImage: `url(${item.icon})` }}
                        ></div>
                      </div>
                      <div className="col-md-8">
                        <div className="quantity-accessory">
                          <label>Số lượng : </label>
                          <input
                            type="number"
                            name={item.name}
                            onChange={(e) => onChangeQuantity(item, e)}
                            value={item.quantity}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
    </>
  );
}
