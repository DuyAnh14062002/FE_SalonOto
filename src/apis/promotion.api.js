import http from "../utils/http";

const promotionApi = {
  getAllPromotion() {
    return http.get("/promotions");
  },
  getAllPromotionOfSalon(salonId) {
    return http.get(`/promotions/salon/${salonId}`);
  },
  getDetailPromotion(id) {
    return http.get(`/promotions/${id}`);
  },
  createPromotion(data) {
    return http.post("/promotions", data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  updatePromotion(id, data) {
    return http.patch(`/promotions/${id}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  deletePromotion(id) {
    return http.delete(`/promotions/${id}`);
  },
};

export default promotionApi;
