import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
import adminApi from "../../apis/admin.api";
const LIMIT = 5;

export default function ManageSalonAdmin() {
  const [showDelete, setShowDelete] = useState(false);
  const [salons, setSalons] = useState([]);

  const [salonChoose, setSalonChoose] = useState(null);
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
    const res = await adminApi.getAllSalon(page, LIMIT, search);
    console.log(res);
    if (res?.data?.data) {
      const salons = res.data.data;
      setSalons(salons);
      setTotalPage(res.data.total_page);
    }
  };

  useEffect(() => {
    // call api to get features
    fetchData(page, search);
  }, [page, search]);

  const handleShowDelete = (salon) => {
    setSalonChoose(salon);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setSalonChoose(null);
    setShowDelete(false);
  };

  const handleDelete = async () => {
    try {
      await adminApi.deleteSalon(salonChoose.salon_id);
      toast.success("Xóa salon thành công");
      handleCloseDelete();
      fetchData(page, search);
    } catch (error) {
      toast.error("Xóa salon thất bại");
    }
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các salon
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
                  placeholder="Nhập tên salon"
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
                  <th scope="col">Ảnh</th>
                  <th scope="col">Tên salon</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {salons && salons.length > 0 ? (
                  salons.map((salon, index) => (
                    <tr
                      key={salon.salon_id}
                      style={{ background: "rgb(247 247 247)" }}
                    >
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>
                      <td>
                        <img
                          src={salon?.image}
                          alt="image_car"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{salon.name}</td>
                      <td>{salon.address}</td>
                      <td>{salon.phoneNumber}</td>
                      <td className="text-center">
                        <button
                          to="/"
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleShowDelete(salon)}
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

            {salons && salons.length > 0 && (
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
            <Modal.Title>Xóa salon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Bạn có chắc chắn muốn xóa salon{" "}
              <strong>{salonChoose && salonChoose.name}</strong> này không ?
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
