import http from "../utils/http";

const AccessoryApi = {
  getAccessory(salon_id, page = 1, per_page = 1000, q = "") {
    return http.get(
      `/accessory/salon/${salon_id}?page=${page}&&per_page=${per_page}&&q=${q}`
    );
  },
  createAccessory(data, icon) {
    return http.post("/accessory", {
      name: data.name,
      manufacturer: data.manufacturer,
      price: data.price,
      icon: icon,
    });
  },
  updateAccessory(id, data, icon) {
    return http.patch(`/accessory/${id}`, {
      name: data.name,
      manufacturer: data.manufacturer,
      price: data.price,
      icon: icon,
    });
  },
  deleteAccessory(id) {
    return http.delete(`/accessory/${id}`);
  },
  getInvoiceBuyAccessory(page = 1, per_page = 1000, q = "") {
    return http.get(
      `/buy-accessory?page=${page}&&per_page=${per_page}&&q=${q}`
    );
  },
  getAccessoryDetail(id) {
    return http.get(`/buy-accessory:/${id}`);
  },
  createInvoiceBuyAccessory(data, accessories) {
    return http.post("/buy-accessory", {
      accessories: accessories,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    });
  },
  updateInvoiceBuyAccessory(data, accessories, id) {
    return http.patch(`/buy-accessory/${id}`, {
      accessories: accessories,
      note: data.note,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    });
  },
  deleteInvoiceBuyAccessory(id) {
    return http.delete(`/buy-accessory/${id}`);
  },
};

export default AccessoryApi;
