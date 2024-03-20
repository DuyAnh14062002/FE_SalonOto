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
  deleteCar(id) {
    return http.delete(`/cars/${id}`);
  },
};

export default carApi;
