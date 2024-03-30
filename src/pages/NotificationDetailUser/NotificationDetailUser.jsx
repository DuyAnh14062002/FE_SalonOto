import "./NotificationDetailUser.scss";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import appointmentApi from "../../apis/appointment.api";
import { formatDate, formatTime } from "../../utils/common";
import Header from "../../components/Header";
export default function NotificationDetailUser() {
  const params = useParams();
  const idAppointment = params.id;
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    const getAppointMent = async () => {
      try {
        const res = await appointmentApi.getAllAppointmentUser({
          id: idAppointment,
        });

        setAppointment(res.data.appointments[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getAppointMent();
  }, [idAppointment]);
  return (
    <div>
      <Header otherPage={true} />
      <div className="wrap-notify">
        <div className="row">
          <div className="col-12">
            {appointment ? (
              <div class="mt-3">
                <h2 className="fw-bold text-center">Chi tiết lịch hẹn</h2>
                <div className="form-group mt-3">
                  <label for="note" class="fw-bold fs-5">
                    Tên salon
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="note"
                    value={appointment.salon}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" class="fw-bold fs-5">
                    Ngày hẹn
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="note"
                    value={formatDate(new Date(appointment.date))}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" class="fw-bold fs-5">
                    Giờ hẹn
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="note"
                    value={formatTime(new Date(appointment.date))}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label for="note" class="fw-bold fs-5">
                    Mục đích hẹn
                  </label>
                  <textarea
                    required
                    class="form-control"
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
                  to="/"
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
