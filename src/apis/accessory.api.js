import http from "../utils/http";

const AccessoryApi = {
  getAccessory(salon_id) {
    return http.get(`/accessory/salon/${salon_id}`);
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
