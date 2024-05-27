import http from "../utils/http";

const featureApi = {
  getAllFeature(page = 1, per_page = 1000, q = "") {
    return http.get(`/features?page=${page}&&per_page=${per_page}&&q=${q}`);
  },
  getFeatureById(id) {
    return http.get(`/features/${id}`);
  },
  createFeature(data) {
    return http.post(`/features`, data);
  },
  updateFeature(feature_id, data) {
    return http.patch(`/features/${feature_id}`, data);
  },
  deleteFeature(id) {
    return http.delete(`/features/${id}`);
  },
};

export default featureApi;
