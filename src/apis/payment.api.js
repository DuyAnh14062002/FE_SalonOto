import http from "../utils/http";

const paymentApi = {
  createPayment(amount, bankCode) {
    return http.post("/payment/createOrder", {
      bank_code: bankCode,
      amount: amount,
    });
  },

  queryPayment(id) {
    return http.post("/payment/queryOrder", { app_trans_id: id });
  },

  paymentVnpay(package_id) {
    return http.post("/payment/create_payment_url", {
      package_id: package_id,
    });
  },
};

export default paymentApi;
