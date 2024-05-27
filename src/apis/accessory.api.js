import http from "../utils/http";

const AccessoryApi = {
  getAccessory(salon_id, page = 1, per_page = 1000, q = "") {
    return http.get(
      `/accessory/salon/${salon_id}?page=${page}&&per_page=${per_page}&&q=${q}`
    );
  },
  createAccessory(data) {
    return http.post("/accessory", {
      name: data.name,
      manufacturer: data.manufacturer,
      price: data.price,
    });
  },
  updateAccessory(id, data) {
    return http.patch(`/accessory/${id}`, {
      name: data.name,
      manufacturer: data.manufacturer,
      price: data.price,
    });
  },
  deleteAccessory(id) {
    return http.delete(`/accessory/${id}`);
  },
};

export default AccessoryApi;
