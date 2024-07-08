import { useEffect, useState } from "react";
import { formatCurrency, formatDateDetail } from "../../utils/common";
import Header from "../Header";
import paymentRequestApi from "../../apis/paymentRequest.api";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { toast } from "react-toastify";

const LIMIT = 5;
export default function HistoryPayment() {
  const [listPaymentRequest, setListPaymentRequest] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

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
  console.log("listPaymentRequest", listPaymentRequest);
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
                  <button
                    className="btn btn-warning btn-sm rounded-0 text-white mx-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="info"
                    // onClick={() => handleShowInfor(invoice)}
                  >
                    <i className="fa-solid fa-circle-question"></i>
                  </button>
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
    </>
  );
}
