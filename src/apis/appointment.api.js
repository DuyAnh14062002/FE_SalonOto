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
  updateReadAppointmentUser() {
    return http.patch("/appointment/read");
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
  createAppointmentWithUser(body) {
    return http.post("/appointment/create-appointment-process", body);
  },
};

export default appointmentApi;
