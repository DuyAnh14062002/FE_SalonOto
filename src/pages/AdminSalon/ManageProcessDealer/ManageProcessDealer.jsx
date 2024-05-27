import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import ProcessFormDealer from "../../ProcessFormDealer";
import dealerApi from "../../../apis/dealer.api";
import userApi from "../../../apis/user.api";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 5;

export default function ManageProcessDealer() {
  const [permissions, setPermission] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showModalProcess, setShowModalProcess] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingProcess(1, searchValue);
    }, 1000);
  };

  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (process) => {
    setSelectedProcess(process);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    try {
      let res = await dealerApi.deleteProcess(selectedProcess.transaction_id);
      if (res?.data?.status === "success") {
        loadingProcess();
        toast.success("Xóa tiến trình thành công");
        setSelectedProcess({});
        handleCloseDelete();
      } else {
        toast.error("Xóa tiến trình thất bại");
      }
    } catch (error) {}
  };

  const loadingProcess = async (page, search) => {
    let res = await dealerApi.getAllProcess(page, LIMIT, search);
    if (res?.data?.transaction) {
      setTransactions(res.data.transaction);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    loadingUser();
  }, []);
  useEffect(() => {
    loadingProcess(page, search);
  }, [page, search]);
  console.log("transactions : ", transactions);
  const handleShowProcess = (item) => {
    setSelectedTransaction(item);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
    loadingProcess();
  };
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các giao dịch với hoa tiêu
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
                  placeholder="Nhập tên hoa tiêu"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "17%" }}>
                    Tên hoa tiêu
                  </th>
                  <th scope="col">Tên qui trình</th>
                  <th scope="col">Ngày tạo</th>
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
                {transactions && transactions.length > 0 ? (
                  transactions.map((item, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>
                      <td>{item?.user?.name}</td>
                      <td>{item?.process?.name}</td>
                      <td>{item?.connection?.created_at}</td>
                      <td>
                        {item?.status === "pending" ? (
                          <span class="badge bg-warning text-dark">
                            Đang xử lý
                          </span>
                        ) : (
                          <span class="badge bg-success">Hoàn thành</span>
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
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_IV")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(item)}
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
        </div>
      </div>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Tiến trình </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa tiến trình với hoa tiêu này không ?
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
          <ProcessFormDealer
            selectedTransaction={selectedTransaction}
            handleCloseModalProcess={handleCloseModalProcess}
            loadingProcess={loadingProcess}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
