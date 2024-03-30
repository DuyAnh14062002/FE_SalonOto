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

export default function Appointment() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentChoose, setAppointmentChoose] = useState(null);

  const [note, setNote] = useState("");
  const showAccepted = {
    0: "Chưa phản hồi",
    1: "Đã xác nhận",
    2: "Từ chối",
  };
  const fetchData = async () => {
    const res = await appointmentApi.getAllAppointmentUser();
    if (res?.data?.appointments) {
      const appointmentList = res.data.appointments;
      setAppointmentList(appointmentList);
    }
  };

  useEffect(() => {
    // call api to get features
    fetchData();
  }, []);

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
      fetchData();
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
      fetchData();
    } catch (error) {
      toast.error("Xóa lịch hẹn thất bại");
    }
  };

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
                  <th scope="col">Ngày hẹn</th>
                  <th scope="col">Giờ hẹn</th>
                  <th scope="col">Lý do hẹn</th>
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
                        <td className="text-center">{++index}</td>
                        <td>{appointment.salon}</td>
                        <td>{formatDate(date)}</td>
                        <td>{formatTime(date)}</td>
                        <td>{appointment.description}</td>
                        <td>{status}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowEdit(appointment)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
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
              <nav className="d-flex justify-content-center ">
                <ul id="product-pagination" className="pagination">
                  <li className="page-item">
                    <button className="page-link" to="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="/">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="/">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="/">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="/">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="/">
                      5
                    </Link>
                  </li>

                  <li className="page-item" id="nextPageButton">
                    <button className="page-link" to="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>

        <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
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
        <Modal show={showDelete} onHide={handleCloseDelete}>
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
