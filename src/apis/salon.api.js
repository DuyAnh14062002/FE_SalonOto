import http from "../utils/http";

const salonApi = {
  getSalonInfor() {
    return http.get("/salons/my-salon");
  },
  UpdateSalon(id, data) {
    return http.patch(`salons/${id}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
};

export default salonApi;
