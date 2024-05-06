import http from "../utils/http";

const adminApi = {
  getStatistic(body) {
    return http.post("/invoice/statistics-admin", body);
  },
};

export default adminApi;
