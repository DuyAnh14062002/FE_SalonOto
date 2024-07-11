import http from "../utils/http";

const paymentMethodApi = {
  getAllPaymentMethod() {
    return http.get(`/salon-payment/method`);
  },
  createPaymentMethod(data) {
    return http.post(`/salon-payment/create-method`, data);
  },
  updatePaymentMethod(data) {
    return http.patch(`/salon-payment/method`, data);
  },
  deletePaymentMethod(id) {
    return http.delete(`/salon-payment/method/${id}`);
  },
};

export default paymentMethodApi;
