import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SalonAppointment.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import { set } from "lodash";
import appointmentApi from "../../apis/appointment.api";
import carApi from "../../apis/car.api";
import salonApi from "../../apis/salon.api";
import Header from "../Header";
export default function SalonAppointment() {
  const arrayTime = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState("");
  const [errorTime, setErrorTime] = useState(false);
  const [value, setValue] = useState(new Date());
  const [car, setCar] = useState({});
  const idSalon = localStorage.getItem("idSalon");
  const location = useLocation();
  const carId = location?.state?.carId || null;
  const phone = location?.state?.phone || null;
  const salon_id = location?.state?.salonId || null;
  const type = location?.state?.type || null;
  const [busyTime, setBusyTime] = useState([]);
  useEffect(() => {
    const fetchBusyTime = async () => {
      let res = await appointmentApi.getBusyTime({ salonId: idSalon, carId });
      setBusyTime(res?.data?.timeBusy);
    };
    fetchBusyTime();
  }, [idSalon, carId]);
  useEffect(() => {
    if (carId) {
      const loading = async () => {
        let res = await carApi.getDetailCar(carId);
        if (res?.data?.car) {
          setCar(res.data.car);
        }
      };
      loading();
    }
  }, [carId]);
  // useEffect(() => {
  //   const fetchSalon = async () => {
  //     let res = await salonApi.getDetailSalon(idSalon);
  //     if (res?.data?.salon) {
  //       setSalon(res.data.salon);
  //     }
  //   };
  //   fetchSalon();
  // }, [idSalon]);
  const isPastTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const date = value;
    // console.log("date1", date);
    // Thiết lập giờ và phút cho ngày được chọn
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    for (let i = 0; i < busyTime?.length; i++) {
      const busyDate = new Date(busyTime[i].date);
      if (date.getTime() === busyDate.getTime()) {
        console.log("busyTime", busyTime[i].time);
        return true;
      }
    }

    if (value > new Date()) {
      return false;
    } else {
      const currentTime = new Date();
      const selectedTime = new Date(currentTime.toDateString() + " " + timeStr);
      return selectedTime < currentTime;
    }
  };

  const handleClick = (timeStr) => {
    if (!isPastTime(timeStr)) {
      setSelectedTime(timeStr);
    }
  };
  const onChange = (value) => {
    setValue(value);
    setSelectedTime(null);
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    const date = value;
    if (!selectedTime) {
      setErrorTime(true);
      return;
    } else {
      setErrorTime(false);
      const [hours, minutes] = selectedTime.split(":");

      // Thiết lập giờ và phút cho ngày được chọn
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      try {
        let res= {};
        if(type === "maintenance"){
          res = await appointmentApi.createAppointment({
            carId,
            salonId: salon_id,
            date,
            description: "Bảo dưỡng xe",
          });
        }else{
          res = await appointmentApi.createAppointmentWithUser(
            carId,
            salon_id,
            phone,
            date,
            note
          );
        }
        console.log("res : ", res)
        if (res?.data?.status === "success") {
          setNote("");
          setSelectedTime(null);
          setValue(new Date());
          toast.success("Đặt lịch hẹn thành công");
        }
      } catch (error) {
        toast.error("Đặt lịch hẹn thất bại");
      }
    }
  };
  return (
    <div>
      {type === "maintenance" ? (
         <Header otherPage = {true}/>
      ) : ""}
      {type === "maintenance" ? (
        <h2 className="text-center" style={{marginTop: "25px"}}>Đặt lịch bảo dưỡng</h2>
      ): ""}
      <div className="container mt-5" style={{ padding: "0 200px" }}>
        <div className="row">
          {/* <div className="col-4" style={{ paddingRight: "70px" }}>
            <div className="information_salon">
              <h2 className="text-uppercase fw-bold">
                {carId ? "Đặt lịch hẹn xem xe" : "Đặt lịch hẹn"}
              </h2>
              <div className="mt-3">
                <div className="fs-5 d-flex">
                  <i
                    className="fa-solid fa-file-signature mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Tên salon</span>
                    <p className="text-uppercase">{salon?.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="fs-5 d-flex">
                  <i
                    className="fa-solid fa-location-dot mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-3">
                    <span className="fw-bold">Địa chỉ</span>
                    <p className="text-uppercase">{salon?.address}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="fs-5 d-flex">
                  <i
                    className="fa-solid fa-clock mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Giờ làm việc</span>
                    <p className="text-uppercase">08:00 - 17:00</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="fs-5 d-flex">
                  <i
                    className="fa-solid fa-square-phone mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Số điện thoại</span>
                    <p className="text-uppercase">{salon?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div
            className="col-12"
            //style={{ paddingLeft: "70px" }}
          >
            <form className="booking-form" onSubmit={handleBooking}>
              <div className="row">
                {/* {carId && (
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <h3 className="fw-bold fs-5">Tên xe</h3>
                        <p className="text-uppercase fs-5">{car?.name}</p>
                        <h3 className="fw-bold fs-5">Hãng sản xuất</h3>
                        <p className="text-uppercase fs-5">{car?.brand}</p>
                        <h3 className="fw-bold fs-5">Nơi sản xuất</h3>
                        <p className="text-uppercase fs-5">{car?.origin}</p>
                        <h3 className="fw-bold fs-5">Mô tả</h3>
                        <p className="text-uppercase fs-5">
                          {car?.description}
                        </p>
                      </div>
                      <div className="col-6">
                        <h3 className="fw-bold fs-5">Hình ảnh xe</h3>
                        <img
                          src={car?.image?.[0]}
                          alt="car"
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )} */}

                <div className="col-6 mt-3">
                  <h3 className="fw-bold fs-5">
                    Chọn ngày (<span className="text-danger">*</span>)
                  </h3>
                  <Calendar
                    required
                    onChange={onChange}
                    value={value}
                    locale="vi-VI"
                    minDate={new Date()}
                    className={"calendar"}
                  />
                </div>
                <div className="col-6 mt-3">
                  <h3 className="fw-bold fs-5">
                    Chọn thời gian (<span className="text-danger">*</span>)
                  </h3>
                  <div className="select-time row">
                    {arrayTime.map((time, index) => {
                      const isClicked = time === selectedTime;
                      return (
                        <div className="col-3 mt-3" key={index}>
                          <div
                            className={`time text-center ${
                              isClicked ? "active" : ""
                            }`}
                            onClick={() => handleClick(time)}
                            style={{
                              cursor: isPastTime(time)
                                ? "not-allowed"
                                : "pointer",
                              background:
                                isPastTime(time) && "rgb(205 205 205)",
                            }}
                          >
                            {time}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errorTime && (
                    <div className="alert alert-danger mt-3">
                      Vui lòng chọn thời gian
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <div className="mt-3">
                    <label for="note" className="fw-bold fs-5 mb-2">
                      {type === "maintenance" ? "Bạn muốn đặt lịch làm gì" : "Bạn muốn đặt lịch hẹn với khách hàng để làm gì?"}
                       (
                      <span className="text-danger">*</span>)
                    </label>
                    <textarea
                      required
                      className="form-control"
                      id="note"
                      rows="5"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-12 mt-3 mb-5 text-end">
                  <button type="submit" className="btn btn-danger">
                    {type === "maintenance" ? "Gửi lịch hẹn cho salon" : "Gửi lịch hẹn cho khách hàng"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
