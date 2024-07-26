import http from "../utils/http";

const adminApi = {
  getStatistic(body, page, per_page) {
    return http.post(
      `/invoice/statistics-admin?page=${page}&&per_page=${per_page}`,
      body
    );
  },
  getAllSalon(page = 1, per_page = 1000, q = "") {
    return http.get(`/admin/salons?page=${page}&&per_page=${per_page}&&q=${q}`);
  },
  deleteSalon(salonId) {
    return http.delete(`/admin/salon/${salonId}`);
  },
  getAllUser(page = 1, per_page = 1000, q = "") {
    return http.get(`/admin/users?page=${page}&&per_page=${per_page}&&q=${q}`);
  },
  deleteUser(userId) {
    return http.delete(`/admin/user/${userId}`);
  },
};

export default adminApi;
