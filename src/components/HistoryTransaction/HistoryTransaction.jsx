import React, { useEffect, useState } from "react";
import "./HistoryTransaction.scss";
import Header from "../Header";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import invoiceApi from "../../apis/invoice.api";
import ProcessForUser from "../../pages/ProcessForUser";
import { formatCurrency } from "../../utils/common";
export default function HistoryTransaction() {
  //const [dataBuyCar, setDataBuyCar] = useState([])
  const [showInfor, setShowInfo] = useState(false);
  const [invoiceChoose, setInvoiceChoose] = useState({});
  const [warranty, setWarranty] = useState({});
  const [showWarranty, setShowWarranty] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [showModalProcess, setShowModalProcess] = useState(false);
  const [satisticCustomer, setSatisticCustomer] = useState({});
  const [startType, setStartType] = useState("all");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const handleShowProcess = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
    setSelectedInvoice({});
  };
  const handleShowInfor = async (invoice) => {
    console.log("invoice : ", invoice);
    if (invoice?.type === "buy car") {
      setShowWarranty(true);
      setWarranty(invoice);
    } else if (invoice?.type === "maintenance") {
      let res = await invoiceApi.getDetailInvoiceMaintenance(invoice.invoiceId);
      console.log("res maintennace : ", res);
      if (res?.data?.invoice) {
        setInvoiceChoose(res.data.invoice);
      }
      setShowInfo(true);
    } else {
      let res = await invoiceApi.getDetailInvoiceAccessory(invoice.invoiceId);
      if (res?.data?.invoice) {
        setInvoiceChoose(res.data.invoice);
      }
      console.log("res access : ", res);
      setShowInfo(true);
    }
  };
  const handleCloseInfor = () => {
    setShowInfo(false);
  };
  const loadingSatisticCustomer = async (year, quarter, month) => {
    try {
      let res = await invoiceApi.satisticCustomer(year, quarter, month);
      console.log("res satistic :", res);
      if (res?.data) {
        setSatisticCustomer(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadingSatisticCustomer("2024", "", "");
  }, []);

  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };
  const handleFilterTransactions = async (type) => {
    console.log("oke");
    if (type === "All") {
      let res = await invoiceApi.satisticCustomer();
      if (res?.data) {
        setSatisticCustomer(res.data);
      }
    }

    if (type === "buyCar") {
      let res = await invoiceApi.satisticCustomerBuycar();
      if (res?.data) {
        setSatisticCustomer(res.data);
      }
    }
  };
  const handleSetStartType = (e) => {
    setStartType(e.target.value);
    if (e.target.value) {
      loadingSatisticCustomer("2024", "", "");
    }
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
    loadingSatisticCustomer("2024", "", e.target.value);
  };
  const handleChangeQuarter = (e) => {
    setQuarter(e.target.value);
    loadingSatisticCustomer("2024", e.target.value, "");
  };
  return (
    <>
      <Header otherPage={true} />
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>
        Thống kê của bạn
      </h2>
      <div className="satistic-time">
        <Form.Select className="satistic-time-select">
          <option>2024</option>
        </Form.Select>
        <Form.Select
          className="satistic-time-select"
          onChange={handleSetStartType}
          value={startType}
        >
          <option value="all">Tất cả</option>
          <option value="quarter">Quý</option>
          <option value="month">Tháng</option>
        </Form.Select>
        {startType === "quarter" ? (
          <Form.Select
            className="satistic-time-select"
            onChange={handleChangeQuarter}
          >
            <option value="1">Quý 1</option>
            <option value="2">Quý 2</option>
            <option value="3">Quý 3</option>
            <option value="4">Quý 4</option>
          </Form.Select>
        ) : startType === "month" ? (
          <Form.Select
            className="satistic-time-select"
            onChange={handleChangeMonth}
          >
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
            <option value="8">Tháng 8</option>
            <option value="9">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
          </Form.Select>
        ) : (
          ""
        )}
      </div>
      <div className="satistic-container">
        <div className="satistic-item satistic-total">
          <div className="satistic-money">
            {satisticCustomer.totalExpense
              ? formatCurrency(satisticCustomer.totalExpense)
              : formatCurrency(0)}
          </div>
          <div className="satistic-title">Tổng chi phí</div>
        </div>
        <div className="satistic-item satistic-buyCar">
          <div className="satistic-money">
            {satisticCustomer.totalExpenseBuyCar
              ? formatCurrency(satisticCustomer.totalExpenseBuyCar)
              : formatCurrency(0)}
          </div>
          <div className="satistic-title">Tổng chi phí mua xe</div>
        </div>
        <div className="satistic-item satistic-maintenance">
          <div className="satistic-money">
            {satisticCustomer.totalExpenseMaintenance
              ? formatCurrency(satisticCustomer.totalExpenseMaintenance)
              : formatCurrency(0)}
          </div>
          <div className="satistic-title">Tổng chi phí bảo dưỡng</div>
        </div>
        <div className="satistic-item satistic-accessory">
          <div className="satistic-money">
            {satisticCustomer.totalExpenseBuyAccessory
              ? formatCurrency(satisticCustomer.totalExpenseBuyAccessory)
              : formatCurrency(0)}
          </div>
          <div className="satistic-title">Tổng chi phí phụ tùng</div>
        </div>
      </div>
      <h2 className="text-center mt-3">Lịch sử giao dịch của bạn</h2>
      {/* <div className="row" style={{display: "flex", justifyContent : "end"}}>
        <Form.Select className="col-6" style={{width: "200px", marginRight: "210px"}} onChange={handleOnchangeTypeTran}  >
          <option value="all">Tất cả</option>
          <option value="buyCar">Mua xe</option>
          <option value="maintenance">Bảo dưỡng</option>
          <option value="accessory">Phụ tùng</option>
        </Form.Select>
      </div> */}
      <table className="table mt-4 table-hover" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Biển số xe
            </th>
            <th scope="col">Tên xe</th>
            <th scope="col">Tên Salon</th>
            <th scope="col">Số diện thoại </th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Tổng chi phí (VND)</th>
            <th scope="col">Loại giao dịch</th>
            <th scope="col" className="text-center">
              Tác vụ
            </th>
          </tr>
        </thead>
        <tbody>
          {satisticCustomer && satisticCustomer?.invoices?.length > 0 ? (
            satisticCustomer?.invoices?.map((invoice, index) => (
              <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                <td className="text-center">{++index}</td>
                <td>{invoice.licensePlate}</td>
                <td>{invoice.carName}</td>
                <td>{invoice?.salonName}</td>
                <td>{invoice.phone}</td>
                <td>{invoice.createdAt}</td>
                <td>
                  {invoice?.expense ? formatCurrency(invoice?.expense) : ""}
                </td>
                <td>
                  {invoice?.type === "buy car"
                    ? "Mua xe"
                    : invoice?.type === "maintenance"
                    ? "Bảo dưỡng"
                    : "Mua phụ tùng"}
                </td>
                <td className="text-center">
                  {invoice?.type === "buy car" && (
                    <button
                      className="btn btn-info btn-sm rounded-0 text-white"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Xem tiến trình"
                      onClick={() => handleShowProcess(invoice)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                  )}

                  <button
                    className="btn btn-warning btn-sm rounded-0 text-white mx-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="info"
                    onClick={() => handleShowInfor(invoice)}
                  >
                    <i className="fa-solid fa-circle-question"></i>
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
          )}
        </tbody>
      </table>
      <Modal
        show={showInfor}
        onHide={handleCloseInfor}
        backdrop="static"
        size="lg"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title> Thông tin chi tiết dịch vụ đã bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <h2 className="text-center">Bảng dịch vụ bảo dưỡng</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.maintenanceServices?.length > 0
                    ? invoiceChoose.maintenanceServices.map((item, index) => {
                        console.log("item : ", item);
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.cost}</td>
                            <td>{invoiceChoose?.invoiceDate}</td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
              <h2 className="text-center">Bảng phụ tùng sửa chữa</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.accessories?.length > 0
                    ? invoiceChoose.accessories.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{invoiceChoose?.invoiceDate}</td>
                          </tr>
                        );
                      })
                    : ""}
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
      <Modal show={showWarranty} onHide={handleCloseWarranty} backdrop="static">
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
              style={{ minHeight: "150px" }}
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
          <ProcessForUser invoice={selectedInvoice} />
        </Modal.Body>
      </Modal>
    </>
  );
}
