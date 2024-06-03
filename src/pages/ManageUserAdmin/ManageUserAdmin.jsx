import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
import adminApi from "../../apis/admin.api";
import { formatDateOfBirth } from "../../utils/common";
const LIMIT = 5;

export default function ManageUserAdmin() {
  const [listUser, setListUser] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [userChoose, setUserChoose] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      fetchData(1, searchValue);
    }, 1000);
  };
  const fetchData = async (page, search) => {
    const res = await adminApi.getAllUser(page, LIMIT, search);
    console.log(res);
    if (res?.data?.data) {
      const salons = res.data.data;
      setListUser(salons);
      setTotalPage(res.data.total_page);
    }
  };

  useEffect(() => {
    // call api to get features
    fetchData(page, search);
  }, [page, search]);

  const handleShowDelete = (user) => {
    setUserChoose(user);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setUserChoose(null);
    setShowDelete(false);
  };

  const handleDelete = async () => {
    try {
      await adminApi.deleteSalon(userChoose.user_id);
      toast.success("Xóa người dùng thành công");
      handleCloseDelete();
      fetchData(page, search);
    } catch (error) {
      toast.error("Xóa người dùng thất bại");
    }
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các người dùng
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
                  placeholder="Nhập tên người dùng"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên người dùng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  listUser.map((user, index) => (
                    <tr
                      key={user.user_id}
                      style={{ background: "rgb(247 247 247)" }}
                    >
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>
                      <td>{user.fullname || "Chưa cập nhật"}</td>
                      <td>{user.email || "Chưa cập nhật"} </td>
                      <td>{user.address || "Chưa cập nhật"}</td>
                      <td>
                        {formatDateOfBirth(user.date_of_birth) ||
                          "Chưa cập nhật"}
                      </td>
                      <td>{user.gender || "Chưa cập nhật"}</td>
                      <td className="text-center">
                        <button
                          to="/"
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleShowDelete(user)}
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

            {listUser && listUser.length > 0 && (
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

        <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Xóa người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Bạn có chắc chắn muốn xóa người dùng{" "}
              <strong>{userChoose && userChoose.name}</strong> này không ?
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
      </div>
    </>
  );
}
