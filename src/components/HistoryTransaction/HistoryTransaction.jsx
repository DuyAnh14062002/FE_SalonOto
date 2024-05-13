import React, { useEffect, useState } from "react";
import "./HistoryTransaction.scss";
import Header from "../Header";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import invoiceApi from "../../apis/invoice.api";
import ProcessForm from "../../pages/ProcessForm/ProcessForm";
import ProcessForUser from "../../pages/ProcessForUser";
import { set } from "lodash";
export default function HistoryTransaction() {
  const [data, setData] = useState([]);
  //const [dataBuyCar, setDataBuyCar] = useState([])
  const [showInfor, setShowInfo] = useState(false);
  const [invoiceChoose, setInvoiceChoose] = useState({});
  const [warranty, setWarranty] = useState({});
  const [showWarranty, setShowWarranty] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [showModalProcess, setShowModalProcess] = useState(false);

  const handleShowProcess = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
    setSelectedInvoice({});
  };
  const handleShowInfor = (invoice) => {
    console.log("invoice : ", invoice);
    if (invoice?.type === "buy car") {
      setShowWarranty(true);
      setWarranty(invoice);
    } else {
      setInvoiceChoose(invoice);
      setShowInfo(true);
    }
  };
  const handleCloseInfor = () => {
    setShowInfo(false);
  };
  const loadingHistory = async () => {
    let res = await invoiceApi.getAllInvoiceMaintain();
    if (res?.data?.invoices) {
      //setData((prevData) => [...prevData, ...res.data.invoices]);
      setData((prevData) => [...prevData, ...res.data.invoices]);
    }
    let res2 = await invoiceApi.getInvoiceHistoryForCustomer();
    console.log("res2 : ", res2);
    if (res2?.data?.invoices) {
      setData((prevData) => [...prevData, ...res2.data.invoices]);
    }
  };
  useEffect(() => {
    loadingHistory();
  }, []);
  function formatDate(isoDate) {
    const date = new Date(isoDate);

    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${dayOfWeek}, ${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };
  console.log("selected invoice : ", selectedInvoice);
  return (
    <>
      <Header otherPage={true} />
      <h2 className="text-center mt-3">Lịch sử giao dịch của bạn</h2>
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
          {data && data.length > 0 ? (
            data.map((invoice, index) => (
              <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                <td className="text-center">{++index}</td>
                <td>{invoice.licensePlate}</td>
                <td>{invoice.carName}</td>
                <td>{invoice?.salon?.salon_name || invoice.seller.name}</td>
                <td>{invoice.phone}</td>
                <td>{invoice.invoiceDate || formatDate(invoice.create_at)}</td>
                <td>{invoice?.total || invoice?.expense}</td>
                <td>{invoice?.type === "buy car" ? "Mua xe" : "Bảo dưỡng"}</td>
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
      <Modal show={showInfor} onHide={handleCloseInfor} size="lg">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title> Thông tin chi tiết dịch vụ đã bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
              <h2 class="text-center">Bảng dịch vụ bảo dưỡng</h2>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.maintenanceServices?.length > 0 &&
                    invoiceChoose.maintenanceServices.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.cost}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <h2 class="text-center">Bảng phụ tùng sửa chữa</h2>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.accessories?.length > 0 &&
                    invoiceChoose.accessories.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
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
