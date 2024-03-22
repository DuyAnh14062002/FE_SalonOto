import http from "../utils/http";

const purchaseApi = {
  addPurchase(data) {
    return http.post("/purchase", data);
  },
  getPurchase() {
    return http.get("/purchase");
  },
};

export default purchaseApi;
