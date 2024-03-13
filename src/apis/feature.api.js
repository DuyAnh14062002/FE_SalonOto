import http from "../utils/http";

const featureApi = {
  getAllFeature() {
    return http.get(`/features`);
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
