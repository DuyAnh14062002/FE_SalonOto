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

  AddSalon(data) {
    return http.post("/salons", data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },

  getAllSalon() {
    return http.get("/salons");
  },

  getDetailSalon(id) {
    return http.get(`/salons/${id}`);
  },

  checkOwnSalon() {
    return http.get("/salons/salonId");
  },
};

export default salonApi;
