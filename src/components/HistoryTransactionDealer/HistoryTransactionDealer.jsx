import React, { useEffect, useState } from "react";
import Header from "../Header";
import dealerApi from "../../apis/dealer.api";
import Modal from "react-bootstrap/Modal";
import ProcessForUserDealer from "../../pages/ProcessForUserDealer/ProcessForUserDealer";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 5;

export default function HistoryTransactionDealer() {
  const [transactions, setTransactions] = useState([]);
  const [showModalProcess, setShowModalProcess] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      fetchAllTransaction(1, searchValue);
    }, 1000);
  };
  const fetchAllTransaction = async (page, search) => {
    let res = await dealerApi.getAllProcess(page, LIMIT, search);
    console.log("res : ", res)
    if (res?.data?.transaction?.transaction) {
      setTransactions(res.data.transaction?.transaction);
      setTotalPage(res.data.total_page);
    }
  };
  const handleShowProcess = (item) => {
    setSelectedTransaction(item);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
  };
  useEffect(() => {
    fetchAllTransaction(page, search);
  }, [page, search]);

  return (
    <>
      <Header otherPage={true} />
      <h2 className="text-center mt-3">Lịch sử các giao dịch hoa tiêu</h2>
      <div className="card-body">
        <table className="table mt-4 table-hover" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col" className="text-center">
                STT
              </th>
              <th scope="col" style={{ width: "17%" }}>
                Tên Salon ô tô
              </th>
              <th scope="col">Tên qui trình</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Giai đoạn hiện tại</th>
              <th scope="col">Trạng thái</th>
              <th scope="col" className="text-center" style={{ width: "18%" }}>
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((item, index) => (
                <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                  <td className="text-center">
                    {LIMIT * (page - 1) + (index + 1)}
                  </td>

                  <td>{item?.salon?.name}</td>
                  <td>{item?.process?.name}</td>
                  <td>{item?.connection?.created_at}</td>
                  {item?.status === "pending" ? (
                    <td>{item?.stage?.name}</td>
                  ) : (
                    <td>
                      <span className="badge bg-success">Hoàn thành</span>
                    </td>
                  )}

                  <td>
                    {item?.status === "pending" ? (
                      <span className="badge bg-warning text-dark">
                        Đang xử lý
                      </span>
                    ) : (
                      <span className="badge bg-success">Hoàn thành</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-info btn-sm rounded-0 text-white"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Xem tiến trình"
                      onClick={() => handleShowProcess(item)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                    <button
                      to="/"
                      className="btn btn-danger btn-sm rounded-0 text-white mx-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      //onClick={() => handleShowDelete(invoice)}
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
            )}
          </tbody>
        </table>
        {transactions && transactions.length > 0 && (
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
          <ProcessForUserDealer
            selectedTransaction={selectedTransaction}
            handleCloseModalProcess={handleCloseModalProcess}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
