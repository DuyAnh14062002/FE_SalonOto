import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import invoiceApi from "../../../apis/invoice.api";
import salonApi from "../../../apis/salon.api";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../utils/common";
import processApi from "../../../apis/process.api";
import ProcessForm from "../../ProcessForm/ProcessForm";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { debounce } from "lodash";
import paymentMethodApi from "../../../apis/paymentMethod.api";
import paymentRequestApi from "../../../apis/paymentRequest.api";
import carApi from "../../../apis/car.api";
const LIMIT = 5;

export default function ManageBuyCar() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [BuyCarInfor, setBuyCarInfor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [salon, setSalon] = useState({});
  const [carId, setCarId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showWarranty, setShowWarranty] = useState(false);
  const [warranty, setWarranty] = useState({});
  const [filter, setFilter] = useState("all");
  const [selectedProcess, setSelectedProcess] = useState("");
  const [listProcess, setListProcess] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [showModalProcess, setShowModalProcess] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [methodPaymentId, setMethodPaymentId] = useState("");

  const fetchListPaymentMethod = async () => {
    const res = await paymentMethodApi.getAllPaymentMethod();
    if (res?.data?.data?.length > 0) {
      setListPaymentMethod(res.data.data);
      setMethodPaymentId(res.data.data[0].id);
    }
  };
  useEffect(() => {
    fetchListPaymentMethod();
  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingInvoice(salon?.salon_id, 1, searchValue);
    }, 1000);
  };
  const handleShowProcess = (invoice) => {
    setCarId(invoice?.legals_user?.car_id);
    setSelectedInvoice(invoice);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
  };
  const getAllEmployeeOfSalons = async (salonId) => {
    let res = await salonApi.getAllEmployee(salonId);
    if (res?.data?.data?.length > 0) {
      setEmployees(res.data.data);
      setEmployeeId(res.data.data[0].user_id);
    }
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "done") {
      return invoice.done;
    } else if (filter === "processing") {
      return !invoice.done;
    }
    return true;
  });
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchAllProcess = async () => {
    const res = await processApi.getAllProcess({
      salonId: salon.salon_id,
    });
    if (res?.data?.data?.length > 0) {
      setListProcess(res.data.data);
      setSelectedProcess(res.data.data[0].id);
    }
  };
  const loadingInvoice = async (salon_id, page, search) => {
    let res = await invoiceApi.getAllInvoiceBuyCar(salon_id, {
      page: page,
      per_page: LIMIT,
      q: search,
    });

    if (res?.data?.invoices) {
      setInvoices(res?.data?.invoices);
      setTotalPage(res.data.total_page);
    }
  };

  const fetchDataSalon = async (page, search) => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      getAllEmployeeOfSalons(res.data.salon.salon_id);
      loadingInvoice(res.data.salon.salon_id, page, search);
      setSalon(res.data.salon);
    }
  };
  const fetchAllCars = async (salonId) => {
    let res = await carApi.getAllCarOfSalon(salonId, 1, 1000000, "", "1");
    if (res?.data?.cars?.length > 0) {
      setCars(res?.data?.cars);
      setCarId(res.data.cars[0]?.car_id);
    }
  };
  useEffect(() => {
    if (salon?.salon_id) {
      fetchAllCars(salon.salon_id);
    }
  }, [salon]);
  useEffect(() => {
    loadingUser();
    fetchDataSalon(page, search);
  }, [page, search]);
  useEffect(() => {
    if (salon?.salon_id) {
      fetchAllProcess();
    }
  }, [salon.salon_id]);

  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDelete(true);
  };
  const onChange = (e) => {
    setBuyCarInfor({ ...BuyCarInfor, [e.target.name]: e.target.value });
  };
  const handleAddBuyCar = async (e) => {
    e.preventDefault();
    let res = await invoiceApi.createBuyCarInvoice(
      salon.salon_id,
      carId,
      BuyCarInfor,
      selectedProcess,
      employeeId
    );

    if (res?.data?.status === "success") {
      toast.success("Thêm thông tin giao dịch thành công");
      handleCloseAdd();
      loadingInvoice(salon.salon_id, 1, search);
      setBuyCarInfor({});
      await paymentRequestApi.createPaymentRequest({
        cusPhone: BuyCarInfor.phone,
        cusFullname: BuyCarInfor.fullname,
        amount: BuyCarInfor.expense,
        salonId: salon.salon_id,
        methodPaymentId,
        invoiceId: res.data.invoice.invoice_id,
      });
    } else {
      toast.error("Thêm thông tin giao dịch thất bại");
    }
  };
  const handleSetCarId = (e) => {
    setCarId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const res = await invoiceApi.deleteInvoiceBuyCar({
        salonId: salon.salon_id,
        invoiceId: selectedInvoice.invoice_id,
      });
      if (res?.data?.status === "success") {
        loadingInvoice(salon.salon_id, 1, search);
        toast.success("Xóa giao dịch thành công");
        setSelectedInvoice({});
        handleCloseDelete();
      } else {
        toast.error("Xóa giao dịch thất bại");
      }
    } catch (error) {}
  };
  const handleShowWarranty = async (invoice) => {
    setShowWarranty(true);
    setWarranty(invoice);
  };
  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };

  const handleProcessChange = (event) => {
    setSelectedProcess(event.target.value);
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
              <div className="d-flex align-items-center">
                <span>Lọc: </span>
                <select
                  className="form-select mx-2"
                  aria-label=""
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="all">Tất cả</option>
                  <option value="done">Giao dịch đã hoàn thành</option>
                  <option value="processing">Giao dịch đang xử lý</option>
                </select>
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_BC")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm giao dịch mua xe
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "18%" }}>
                    Tên khách hàng
                  </th>
                  <th scope="col">Số điện thoại</th>
                  {/* <th scope="col">Email</th> */}
                  <th scope="col">Tên xe</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Nhân viên bán</th>
                  <th scope="col">Trạng thái</th>

                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "18%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices && filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

                      <td>{invoice.fullname}</td>
                      <td>{invoice.phone}</td>
                      {/* <td>{invoice.email}</td> */}
                      <td>{invoice.carName}</td>
                      <td>{formatCurrency(invoice.expense)}</td>
                      <td>{invoice?.employee_id?.fullname}</td>
                      <td>
                        {invoice?.done ? (
                          <span className="badge bg-success">Hoàn thành</span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Đang xử lý
                          </span>
                        )}
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-info btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Xem tiến trình"
                          onClick={() => handleShowProcess(invoice)}
                        >
                          <i className="fas fa-tasks"></i>
                        </button>
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white mx-2"
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
                            className="btn btn-success btn-sm rounded-0 text-white"
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
                            className="btn btn-danger btn-sm rounded-0 text-white mx-2"
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
                    <td colSpan="8" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {filteredInvoices && filteredInvoices.length > 0 && (
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
              <Form.Select
                aria-label="Default select example"
                onChange={handleSetCarId}
                value={carId}
              >
                {cars?.length > 0 &&
                  cars.map((item, index) => {
                    return (
                      <option value={item.car_id} key={index}>
                        {item.car_id.slice(0, 6) +
                          " - " +
                          item.name +
                          " - " +
                          item.type +
                          " - " +
                          item.origin}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Biển số xe</Form.Label>
              <Form.Control
                required
                type="text"
                name="licensePlate"
                onChange={onChange}
              />
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
            <Form.Group className="mt-4">
              <Form.Label>Chi tiết các khoản tiền</Form.Label>
              <Form.Control as="textarea" name="note" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chọn loại quy trình</Form.Label>
              <Form.Select
                onChange={handleProcessChange}
                value={selectedProcess}
              >
                {listProcess?.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chọn nhân viên bán xe</Form.Label>
              <Form.Select
                onChange={(e) => setEmployeeId(e.target.value)}
                value={employeeId}
              >
                {employees?.map((employee, index) => (
                  <option key={index} value={employee.user_id}>
                    {employee.fullname}
                  </option>
                ))}
              </Form.Select>
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
          <Modal.Title>Xóa tính năng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa giao dịch mua xe này không ?</span>
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
      <Modal show={showWarranty} onHide={handleCloseWarranty} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thêm cho giao dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mt-4">
            <Form.Label>Mã giao dịch</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={warranty?.invoice_id}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Biển số xe</Form.Label>
            <Form.Control
              required
              type="text"
              name="limit_kilometer"
              value={warranty?.licensePlate}
              readOnly
            />
          </Form.Group>
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
              style={{ minHeight: "150px" }}
              value={warranty?.policy}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Chi tiết các khoản tiền</Form.Label>
            <Form.Control
              readOnly
              as="textarea"
              name="note"
              value={warranty?.note}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarranty}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalProcess}
        onHide={handleCloseModalProcess}
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tiến trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProcessForm
            invoice={selectedInvoice}
            salonId={salon.salon_id}
            carId={carId}
            handleCloseModalProcess={handleCloseModalProcess}
            loadingInvoice={loadingInvoice}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
