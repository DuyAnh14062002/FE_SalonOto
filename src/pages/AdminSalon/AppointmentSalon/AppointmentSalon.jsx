import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AppointmentSalon.scss";
import { Form } from "react-bootstrap";
import appointmentApi from "../../../apis/appointment.api";
import { formatDate, formatTime } from "../../../utils/common";
import salonApi from "../../../apis/salon.api";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { debounce } from "lodash";
const LIMIT = 5;

export default function AppointmentSalon() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentChoose, setAppointmentChoose] = useState(null);
  const [accepted, setAccepted] = useState(null);
  const [salon, setSalon] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const showAccepted = {
    0: "Chưa phản hồi",
    1: "Đã xác nhận",
    2: "Từ chối",
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    console.log("searchValue : ", searchValue);
    debounce(() => {
      setPage(1);
      fetchData(1, searchValue);
    }, 1000);
  };

  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  useEffect(() => {
    // call api to get features
    fetchDataSalon();
  }, []);
  const fetchData = async (page, search) => {
    const res = await appointmentApi.getAllAppointmentSalon({
      salonId: salon.salon_id,
      page: page,
      per_page: LIMIT,
      q: search,
    });
    if (res?.data?.appointments) {
      const appointmentList = res.data.appointments;
      setAppointmentList(appointmentList);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    if (salon.salon_id) {
      fetchData(page, search);
    }
  }, [salon, page, search]);

  const handleShowEdit = (appointment, accepted) => {
    setAppointmentChoose(appointment);
    setAccepted(accepted);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setAppointmentChoose(null);
    setShowEdit(false);
  };
  const handleShowDelete = (appointment) => {
    setAppointmentChoose(appointment);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setAppointmentChoose(null);
    setShowDelete(false);
  };

  const handleEditAppointment = async (e) => {
    try {
      e.preventDefault();
      const status = accepted ? 1 : 2;
      const res = await appointmentApi.updateAppointmentSalon({
        id: appointmentChoose.id,
        salonId: salon.salon_id,
        status: status,
      });
      if (res?.data?.status === "success") {
        toast.success("Cập nhật lịch hẹn thành công");
      }
      handleCloseEdit();
      fetchData(page, search);
    } catch (error) {
      toast.error("Cập nhật lịch hẹn thất bại");
    }
  };
  const handleDelete = async () => {
    try {
      await appointmentApi.deleteAppointmentSalon({
        salonId: salon.salon_id,
        id: appointmentChoose.id,
      });
      toast.success("Xóa lịch hẹn thành công");
      handleCloseDelete();
      fetchData(page, search);
    } catch (error) {
      toast.error("Xóa lịch hẹn thất bại");
    }
  };
  console.log("listAppointment : ", appointmentList);
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các lịch hẹn với khách hàng
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
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Hình ảnh xe</th>
                  <th scope="col">Tên xe</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Ngày hẹn</th>
                  <th scope="col">Giờ hẹn</th>
                  <th scope="col">Mục đích hẹn</th>
                  <th scope="col">Phản hồi của salon</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointmentList && appointmentList.length > 0 ? (
                  appointmentList.map((appointment, index) => {
                    const date = new Date(appointment.date);
                    const status = showAccepted[appointment.status];

                    return (
                      <tr
                        key={appointment.id}
                        style={{ background: "rgb(247 247 247)" }}
                      >
                        <td className="text-center">
                          {LIMIT * (page - 1) + (index + 1)}
                        </td>
                        <td>
                          <Link to={`/detail-car/${appointment.car_id}`}>
                            <img
                              src={appointment?.car?.image?.[0]}
                              alt="image_car"
                              style={{ width: "100px" }}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/detail-car/${appointment.car_id}`}
                            className="text-decoration-none"
                          >
                            {appointment.car.name}{" "}
                          </Link>
                        </td>
                        <td>{appointment.user.fullname}</td>
                        <td>{appointment.user.phone}</td>
                        <td>{formatDate(date)}</td>
                        <td>{formatTime(date)}</td>
                        <td>{appointment.description}</td>
                        <td>{status}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger btn-sm rounded-0 text-white mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Từ chối"
                            onClick={() => handleShowEdit(appointment, false)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Xác nhận"
                            onClick={() => handleShowEdit(appointment, true)}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          {new Date(appointment.date) < new Date() && (
                            <button
                              to="/"
                              className="btn btn-danger btn-sm rounded-0 text-white"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Xóa lịch hẹn"
                              onClick={() => handleShowDelete(appointment)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {appointmentList && appointmentList.length > 0 && (
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

        <Modal
          show={showEdit}
          onHide={handleCloseEdit}
          size="lg"
          backdrop="static"
        >
          <Form onSubmit={handleEditAppointment}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật lịch hẹn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {appointmentChoose && (
                <span>
                  Bạn có muốn{" "}
                  <strong>{accepted ? "xác nhận" : "từ chối"}</strong> lịch hẹn
                  với khách hàng{" "}
                  <strong>{appointmentChoose.user.fullname}</strong> vào lúc{" "}
                  <strong>
                    {formatTime(new Date(appointmentChoose.date))}{" "}
                  </strong>
                  ngày{" "}
                  <strong>
                    {formatDate(new Date(appointmentChoose.date))}
                  </strong>{" "}
                  không ?
                </span>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Xóa tính năng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Bạn có chắc chắn muốn xóa lịch hẹn với khách hàng{" "}
              <strong>
                {appointmentChoose && appointmentChoose.user.fullname}
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
      </div>
    </>
  );
}
