import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Appointment.scss";
import appointmentApi from "../../apis/appointment.api";
import { formatDate, formatTime } from "../../utils/common";
import { Form } from "react-bootstrap";
import Header from "../../components/Header";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 4;

export default function Appointment() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentChoose, setAppointmentChoose] = useState(null);
  const [note, setNote] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const showAccepted = {
    0: "Chưa phản hồi",
    1: "Đã xác nhận",
    2: "Từ chối",
  };

  const fetchData = async (page) => {
    const res = await appointmentApi.getAllAppointmentUser({
      page: page,
      per_page: LIMIT,
    });
    console.log("res : ", res);
    if (res?.data?.appointments) {
      const appointmentList = res.data.appointments;
      setAppointmentList(appointmentList);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleShowEdit = (appointment) => {
    setAppointmentChoose(appointment);
    setNote(appointment.description);
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
      const res = await appointmentApi.updateAppointmentUser({
        id: appointmentChoose.id,
        description: note,
      });
      if (res?.data?.status === "success") {
        toast.success("Cập nhật lịch hẹn thành công");
      }
      handleCloseEdit();
      fetchData(page);
    } catch (error) {
      toast.error("Cập nhật lịch hẹn thất bại");
    }
  };
  const handleDelete = async () => {
    try {
      await appointmentApi.deleteAppointmentUser({
        id: appointmentChoose.id,
      });
      toast.success("Xóa lịch hẹn thành công");
      handleCloseDelete();
      fetchData(page);
    } catch (error) {
      toast.error("Xóa lịch hẹn thất bại");
    }
  };
  console.log("appointmentList : ", appointmentList);
  return (
    <>
      <Header otherPage={true} />
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các lịch hẹn
            </h4>
          </div>
          <div className="card-body">
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên salon</th>
                  <th scope="col">Hình ảnh xe</th>
                  <th scope="col">Tên xe</th>
                  <th scope="col">Ngày hẹn</th>
                  <th scope="col">Giờ hẹn</th>
                  <th scope="col">Lý do hẹn</th>
                  <th scope="col">Phản hồi</th>
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
                        <td>{appointment.salon}</td>
                        <td>
                          <Link to={`/detail-car/${appointment.car_id}`}>
                            <img
                              src={appointment.car.image[0]}
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
                        <td>{formatDate(date)}</td>
                        <td>{formatTime(date)}</td>
                        <td>{appointment.description}</td>
                        <td>{status}</td>
                        <td className="text-center">
                          {appointment.from === "salon" ? (
                            <button
                              className="btn btn-success btn-sm rounded-0 text-white mx-2"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Xác nhận"
                              onClick={() => handleShowEdit(appointment, true)}
                            >
                              <i class="fa-solid fa-check"></i>
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm rounded-0 text-white mx-2"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              onClick={() => handleShowEdit(appointment)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(appointment)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
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
              <div className="row">
                <div className="col-12">
                  <div class="mt-3">
                    <label for="note" class="fw-bold fs-5">
                      Lý do hẹn (<span className="text-danger">*</span>)
                    </label>
                    <textarea
                      required
                      class="form-control"
                      id="note"
                      rows="5"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
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
              Bạn có chắc chắn muốn xóa lịch hẹn với{" "}
              <strong>{appointmentChoose && appointmentChoose.salon}</strong>{" "}
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
