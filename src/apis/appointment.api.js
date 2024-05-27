import http from "../utils/http";

const appointmentApi = {
  createAppointment(body) {
    return http.post("/appointment/create-appointment", body);
  },
  getAllAppointmentUser(body) {
    return http.post("/appointment/get-appoint-user", body);
  },
  updateAppointmentUser(body) {
    return http.patch("/appointment/update-one-user", body);
  },
  deleteAppointmentUser(body) {
    return http.delete("/appointment/delete-appoint-user", {
      data: body,
    });
  },
  getAllAppointmentSalon(body) {
    return http.post("/appointment/get-appoint-admin", body);
  },
  getBusyTime(body) {
    return http.post("/appointment/get-busy-car", body);
  },
  updateAppointmentSalon(body) {
    return http.patch("/appointment/update-one-admin", body);
  },
  deleteAppointmentSalon(body) {
    return http.delete("/appointment/delete-appoint-admin", {
      data: body,
    });
  },
  createAppointmentWithUser(carId, salonId, phone, date, description) {
    return http.post("/appointment/create-appointment-process", {
      carId: carId,
      salonId: salonId,
      phone: phone,
      date: date,
      description: description,
    });
  },
};

export default appointmentApi;
