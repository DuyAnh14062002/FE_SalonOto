import { useEffect, useState } from "react";
import { formatCurrency, formatDateDetail } from "../../utils/common";
import Header from "../Header";
import paymentRequestApi from "../../apis/paymentRequest.api";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { toast } from "react-toastify";
import invoiceApi from "../../apis/invoice.api";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

const LIMIT = 5;
export default function HistoryPayment() {
  const [listPaymentRequest, setListPaymentRequest] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [showInfor, setShowInfo] = useState(false);
  const [showWarranty, setShowWarranty] = useState(false);
  const [warranty, setWarranty] = useState({});
  const [invoiceChoose, setInvoiceChoose] = useState({});

  const handleCloseWarranty = () => {
    setShowWarranty(false);
  };
  const handleCloseInfor = () => {
    setShowInfo(false);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const loadingPaymentRequest = async (page, filter) => {
    let res = await paymentRequestApi.getAllPaymentRequest(page, LIMIT, filter);
    if (res?.data?.data?.data) {
      setListPaymentRequest(res?.data?.data?.data);
      setTotalPage(res.data.data.total_page);
    }
  };
  console.log("listPaymentRequest", listPaymentRequest);
  useEffect(() => {
    loadingPaymentRequest(page, filter);
  }, [page, filter]);
  const handleConfirmPayment = async (id) => {
    try {
      let res = await paymentRequestApi.confirmUserPaymentRequest({ id });
      if (res?.data?.status === "success") {
        toast.success("Xác nhận thanh toán thành công");
        loadingPaymentRequest(page);
      }
    } catch (error) {
      toast.error("Xác nhận thanh toán thất bại");
    }
  };
  console.log("listPaymentRequest", invoiceChoose);
  const handleShowInfor = async (invoice) => {
    if (invoice?.reason === "buy car") {
      setShowWarranty(true);
      setWarranty(invoice);
    } else if (invoice?.reason === "Thanh toán hóa đơn bảo dưỡng") {
      let res = await invoiceApi.getDetailInvoiceMaintenance(
        invoice.invoice_id
      );
      if (res?.data?.invoice) {
        setInvoiceChoose(res.data.invoice);
      }
      setShowInfo(true);
    } else if (invoice?.reason === "Thanh toán hóa đơn phụ tùng") {
      let res = await invoiceApi.getDetailInvoiceAccessory(invoice.invoice_id);
      if (res?.data?.invoice) {
        setInvoiceChoose(res.data.invoice);
      }
      console.log("res access : ", res);
      setShowInfo(true);
    }
  };
  return (
    <>
      <Header otherPage={true} />
      <h2 className="text-center mt-3">Lịch sử yêu cầu thanh toán</h2>
      <div className="my-3 mx-3 d-flex align-items-center">
        <div className="d-flex align-items-center">
          <span>Lọc: </span>
          <select
            className="form-select mx-2"
            aria-label=""
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">Tất cả</option>
            <option value="true">Đã thanh toán</option>
            <option value="false">Chưa thanh toán</option>
          </select>
        </div>
      </div>
      <table className="table mt-4 table-hover" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col">Tên salon</th>
            <th scope="col">Nội dung thanh toán</th>
            <th scope="col" className="text-center">
              Thông tin thanh toán
            </th>
            <th scope="col" className="text-center">
              Giá tiền
            </th>
            <th scope="col" className="text-center">
              Tình trạng
            </th>
            <th scope="col">Ngày tạo</th>
            <th scope="col" className="text-center" style={{ width: "20%" }}>
              Tác vụ
            </th>
          </tr>
        </thead>
        <tbody>
          {listPaymentRequest && listPaymentRequest.length > 0 ? (
            listPaymentRequest.map((item, index) => (
              <tr key={item.id} style={{ background: "rgb(247 247 247)" }}>
                <td className="text-center">
                  {LIMIT * (page - 1) + (index + 1)}
                </td>

                <td>{item.salon.name}</td>
                <td>{item.reason}</td>
                <td className="text-center">{item.payment_method}</td>
                <td className="text-center">{formatCurrency(item.amount)}</td>
                <td className="text-center">
                  {item?.status ? (
                    <span className="badge bg-success">Đã thanh toán</span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Chưa thanh toán
                    </span>
                  )}
                </td>
                <td>{formatDateDetail(item.create_date)}</td>
                <td className="text-center">
                  {item.invoice_id && (
                    <button
                      className="btn btn-warning btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="info"
                      onClick={() => handleShowInfor(item)}
                    >
                      <i className="fa-solid fa-circle-question"></i>
                    </button>
                  )}

                  {!item.status && (
                    <button
                      to="/"
                      className="btn btn-success btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Xác nhận thanh toán"
                      onClick={() => handleConfirmPayment(item.id)}
                    >
                      <i className="fa-solid fa-square-check"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="fst-italic">
                Không có dữ liệu nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {listPaymentRequest && listPaymentRequest.length > 0 && (
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
                  {invoiceChoose?.maintenanceServices?.length > 0 ? (
                    invoiceChoose.maintenanceServices.map((item, index) => {
                      console.log("item : ", item);
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.cost}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="fst-italic">
                        Không có dữ liệu nào
                      </td>
                    </tr>
                  )}
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
                  {invoiceChoose?.accessories?.length > 0 ? (
                    invoiceChoose.accessories.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="fst-italic">
                        Không có dữ liệu nào
                      </td>
                    </tr>
                  )}
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
    </>
  );
}
