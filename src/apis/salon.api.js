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
  getTop(body, page = 1, per_page = 5) {
    return http.post(
      `/invoice/get-top?page=${page}&&per_page=${per_page}`,
      body
    );
  },
  getAllEmployee(salonId) {
    return http.post("/salons/employees", {
      salonId: salonId,
    });
  },

  blockUser(postId) {
    return http.post("/block-user", {
      postId: postId,
    });
  },
  getAllUserBlock() {
    return http.get("/salons/users/blocked");
  },
  unblockUser(userId) {
    return http.post("/block-user/un", {
      userId: userId,
    });
  },
  getAllSalonNoBlock() {
    return http.get("/salons/no-block");
  },
  createGroupSalon(name, salons) {
    return http.post("/group/salon", {
      name: name,
      salons: salons,
    });
  },
  getAllGroupSalon() {
    return http.get("/group/salon");
  },
};

export default salonApi;
