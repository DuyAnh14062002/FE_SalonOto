import http from "../utils/http";

const paymentRequestApi = {
  getAllPaymentRequest(page = 1, per_page = 1000, filter = "") {
    if (filter === "all") {
      return http.get(`/salon-payment?page=${page}&&per_page=${per_page}`);
    } else {
      return http.get(
        `/salon-payment?page=${page}&&per_page=${per_page}&&status=${filter}`
      );
    }
  },
  createPaymentRequest(data) {
    return http.post(`/salon-payment/create`, data);
  },
  confirmUserPaymentRequest(data) {
    return http.post("/salon-payment/confirm-user", data);
  },
  confirmSalonPaymentRequest(data) {
    return http.post("/salon-payment/confirm-salon", data);
  },
  deletePaymentRequest(id) {
    return http.delete(`/salon-payment/${id}`);
  },
};

export default paymentRequestApi;
