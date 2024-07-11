import "./NotificationDetailSalon.scss";
import HeaderSalon from "../../../components/Header/HeaderSalon";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import appointmentApi from "../../../apis/appointment.api";
import { formatDate, formatTime } from "../../../utils/common";

export default function NotificationDetailSalon() {
  const params = useParams();
  const salonId = localStorage.getItem("idSalon");
  const idAppointment = params.id;
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const res = await appointmentApi.getAllAppointmentSalon({
          id: idAppointment,
          salonId: salonId,
        });
        setAppointment(res.data.appointments[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getAppointment();
  }, [idAppointment, salonId]);
  return (
    <div>
      <HeaderSalon />
      <div className="wrap-notify">
        <div className="row">
          <div className="col-12">
            {appointment ? (
              <div className="mt-3">
                <h2 className="fw-bold text-center">Chi tiết lịch hẹn</h2>
                <div className="form-group mt-3">
                  <label for="note" className="fw-bold fs-5">
                    Tên khách hàng
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="note"
                    value={appointment.user?.fullname}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" className="fw-bold fs-5">
                    Ngày hẹn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="note"
                    value={formatDate(new Date(appointment.date))}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" className="fw-bold fs-5">
                    Giờ hẹn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="note"
                    value={formatTime(new Date(appointment.date))}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" className="fw-bold fs-5">
                    Mục đích hẹn
                  </label>
                  <textarea
                    required
                    className="form-control"
                    id="note"
                    rows="5"
                    value={appointment.description}
                    disabled
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="text-center p-5">
                <h3>Lịch hẹn này đã bị hủy hoặc không còn tồn tại</h3>
                <Link
                  to={`/salonOto/${salonId}`}
                  className="btn-primary py-2 px-3 rounded text-decoration-none"
                  type="button"
                >
                  Go Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
