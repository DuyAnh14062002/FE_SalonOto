import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import paymentRequestApi from "../../../apis/paymentRequest.api";
import userApi from "../../../apis/user.api";
import { debounce } from "lodash";
import { formatCurrency, formatDateDetail } from "../../../utils/common";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";

const LIMIT = 5;
export default function ManagePayment() {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listPaymentRequest, setListPaymentRequest] = useState([]);
  const [paymentRequestItem, setPaymentRequestItem] = useState({});
  const [salon, setSalon] = useState({});

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingPaymentRequest(1, searchValue);
    }, 1000);
  };
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  const loadingPaymentRequest = async (page, search) => {
    let res = await paymentRequestApi.getAllPaymentRequest(page, LIMIT, search);
    if (res?.data?.data.data) {
      setListPaymentRequest(res.data.data.data);
      setTotalPage(res.data.data.total_page);
    }
  };
  useEffect(() => {
    loadingUser();
    fetchDataSalon();
  }, []);
  useEffect(() => {
    loadingPaymentRequest(page, search);
  }, [page, search]);

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setPaymentRequestItem({});
  };
  const handleShowDelete = (item) => {
    setPaymentRequestItem(item);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setPaymentRequestItem({});
  };
  const onChange = (e) => {
    setPaymentRequestItem({
      ...paymentRequestItem,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddPaymentRequest = async (e) => {
    try {
      console.log("paymentRequestItem", paymentRequestItem);
      e.preventDefault();
      setIsLoading(true);
      let res = await paymentRequestApi.createPaymentRequest({
        cusPhone: paymentRequestItem.customer_phone,
        cusFullname: paymentRequestItem.customer_fullname,
        reason: paymentRequestItem.reason,
        amount: paymentRequestItem.amount,
        salonId: salon.salon_id,
      });
      if (res?.data?.status === "success") {
        toast.success("Thêm yêu cầu thanh toán thành công");
        loadingPaymentRequest(page, search);
        handleCloseAdd();
        setPaymentRequestItem({});
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Thêm yêu cầu thanh toán thất bại");
    }
  };
  const handleConfirmPayment = async (id) => {
    try {
      let res = await paymentRequestApi.confirmSalonPaymentRequest({
        id,
        salonId: salon.salon_id,
      });
      if (res?.data?.status === "success") {
        toast.success("Xác nhận thanh toán thành công");
        loadingPaymentRequest(page, search);
      }
    } catch (error) {
      toast.error("Xác nhận thanh toán thất bại");
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await paymentRequestApi.deletePaymentRequest(
        paymentRequestItem.id
      );
      if (res?.data?.status === "success") {
        toast.success("Xóa yêu cầu thanh toán thành công");
        loadingPaymentRequest(page, search);
        handleCloseDelete();
        setPaymentRequestItem({});
      } else {
        toast.error("Xóa yêu cầu thanh toán thất bại");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các yêu cầu thanh toán
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
              {permissions?.includes("OWNER") && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm yêu cầu thanh toán
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col" className="text-center">
                    Số điện thoại
                  </th>
                  <th scope="col">Nội dung thanh toán</th>
                  <th scope="col" className="text-center">
                    Giá tiền
                  </th>
                  <th scope="col" className="text-center">
                    Tình trạng
                  </th>
                  <th scope="col">Người tạo</th>
                  <th scope="col">Ngày tạo</th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "10%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {listPaymentRequest && listPaymentRequest.length > 0 ? (
                  listPaymentRequest.map((item, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

                      <td>{item.custormer_fullname}</td>
                      <td className="text-center">{item.custormer_phone}</td>
                      <td>{item.reason}</td>
                      <td className="text-center">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="text-center">
                        {item?.status ? (
                          <span class="badge bg-success">Đã thanh toán</span>
                        ) : (
                          <span class="badge bg-warning text-dark">
                            Chưa thanh toán
                          </span>
                        )}
                      </td>
                      <td>{item.creator}</td>
                      <td>{formatDateDetail(item.create_date)}</td>
                      <td className="text-center">
                        {permissions?.includes("OWNER") && (
                          <>
                            <button
                              to="/"
                              className="btn btn-success btn-sm rounded-0 text-white mx-2"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Xác nhận thanh toán"
                              onClick={() => handleConfirmPayment(item.id)}
                            >
                              <i class="fa-solid fa-square-check"></i>
                            </button>
                            <button
                              to="/"
                              className="btn btn-danger btn-sm rounded-0 text-white"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              onClick={() => handleShowDelete(item)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </>
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
          </div>
        </div>
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddPaymentRequest}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới yêu cầu thanh toán </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="customer_fullname"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="customer_phone"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Nội dung thanh toán</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                type="text"
                name="reason"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Giá tiền</Form.Label>
              <Form.Control
                required
                type="number"
                name="amount"
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

      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa dịch vụ bào dưỡng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa thanh toán với khách hàng{" "}
            <strong>
              {paymentRequestItem && paymentRequestItem.custormer_fullname}
            </strong>{" "}
            này không ?
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
  );
}
