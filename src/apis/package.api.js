import http from "../utils/http";

const packageApi = {
  getAllPackage() {
    return http.get(`/packages`);
  },
  getPackageById(id) {
    return http.get(`/packages/${id}`);
  },
  createPackage(data) {
    return http.post(`/packages`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  updatePackage(package_id, data) {
    return http.patch(`/packages/${package_id}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  deletePackage(id) {
    return http.delete(`/packages/${id}`);
  },
};

export default packageApi;
