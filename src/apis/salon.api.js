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

  getAllSalon(page = 1, per_page = 1000, q = "") {
    return http.get(`/salons?page=${page}&&per_page=${per_page}&&q=${q}`);
  },

  getDetailSalon(id) {
    return http.get(`/salons/${id}`);
  },

  checkOwnSalon() {
    return http.get("/salons/salonId");
  },
  getStatistic(body) {
    return http.post("/invoice/statistics", body);
  },
  getTop(body) {
    return http.post("/invoice/get-top", body);
  },
  getAllEmployee(salonId) {
    return http.post("/salons/employees", {
      salonId: salonId,
    });
  },
};

export default salonApi;
