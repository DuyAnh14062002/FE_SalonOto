import { useState } from "react";
import HeaderSalon from "../../../components/Header/HeaderSalon";
import "./Booking.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
export default function Booking() {
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
  const isPastTime = (timeStr) => {
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
  const handleBooking = (e) => {
    e.preventDefault();
    const date = value;
    if (!selectedTime) {
      setErrorTime(true);
      return;
    } else {
      setErrorTime(false);
      console.log("date", date);
      console.log("time", selectedTime);
      console.log("note", note);
    }
  };
  return (
    <div>
      <HeaderSalon />
      <div className="container mt-5">
        <div className="row">
          <div className="col-4" style={{ paddingRight: "70px" }}>
            <div className="information_salon">
              <h2 className="text-uppercase fw-bold">Đặt lịch hẹn</h2>
              <div class="mt-3">
                <div class="fs-5 d-flex">
                  <i
                    class="fa-solid fa-file-signature mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Tên salon</span>
                    <p className="text-uppercase">SALON Ô TÔ BÌNH DƯƠNG</p>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="fs-5 d-flex">
                  <i
                    class="fa-solid fa-location-dot mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Địa chỉ</span>
                    <p className="text-uppercase">
                      kí túc xá khu B,phường Đông Hòa,tỉnh Bình dương
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="fs-5 d-flex">
                  <i
                    class="fa-solid fa-clock mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Giờ làm việc</span>
                    <p className="text-uppercase">08:00 - 17:00</p>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="fs-5 d-flex">
                  <i
                    class="fa-solid fa-square-phone mt-1"
                    style={{ width: "25px" }}
                  ></i>
                  <div className="mx-2">
                    <span className="fw-bold">Số điện thoại</span>
                    <p className="text-uppercase">0124356789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-8 border-2 border-start"
            style={{ paddingLeft: "70px" }}
          >
            <form className="booking-form" onSubmit={handleBooking}>
              <div className="row">
                <div className="col-6">
                  <h3 class="fw-bold fs-5">
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
                <div className="col-6">
                  <h3 class="fw-bold fs-5">
                    Chọn thời gian (<span className="text-danger">*</span>)
                  </h3>
                  <div class="select-time row">
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
                  <div class="mt-3">
                    <label for="note" class="fw-bold fs-5">
                      Bạn muốn đặt lịch hẹn để làm gì? (
                      <span className="text-danger">*</span>)
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
                <div className="col-12 mt-3 text-end">
                  <button type="submit" class="btn btn-danger">
                    Đặt lịch
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
