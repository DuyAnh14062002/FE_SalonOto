import http from "../utils/http";

const carApi = {
  updateCar(id, data) {
    return http.patch(`/cars/${id}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  addCar(data) {
    return http.post("/cars", data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  deleteCar(id, salonId) {
    return http.delete(`/cars/${id}`, {
      data: {
        salonId: salonId,
      },
    });
  },
  getAllCar(page = 1, per_page = 4, q = "") {
    return http.get(`/cars?page=${page}&&per_page=${per_page}&&q=${q}`);
  },
  getDetailCar(id) {
    return http.get(`cars/${id}`);
  },
};

export default carApi;
