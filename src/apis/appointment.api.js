import http from "../utils/http";

const appointmentApi = {
  createAppointment(body) {
    return http.post("/appointment/create-appointment", body);
  },
  getAllAppointmentUser() {
    return http.post("/appointment/get-appoint-user");
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
  updateAppointmentSalon(body) {
    return http.patch("/appointment/update-one-admin", body);
  },
  deleteAppointmentSalon(body) {
    return http.delete("/appointment/delete-appoint-admin", {
      data: body,
    });
  },
};

export default appointmentApi;
