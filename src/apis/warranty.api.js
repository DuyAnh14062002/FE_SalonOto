import http from "../utils/http";

const warrantyApi = {
  getAllWarranty(body) {
    return http.post("/warranty", body);
  },
  createWarranty(salon_id, data) {
    return http.post("/warranty/create", {
      salonId: salon_id,
      name: data.name,
      limit_kilometer: data.limit_kilometer,
      months: data.months,
      policy: data.policy,
      note: data.note,
    });
  },
  updateWarranty(salonId, data) {
    return http.patch("/warranty/update", {
      salonId: salonId,
      newWarranty: {
        warranty_id: data.warranty_id,
        name: data.name,
        limit_kilometer: data.limit_kilometer,
        months: data.months,
        policy: data.policy,
        note: data.note,
      },
    });
  },
  deleteWarranty(salonId, warrantyId) {
    return http.delete("/warranty/delete", {
      data: {
        salonId: salonId,
        warrantyId: warrantyId,
      },
    });
  },

  AddWarrantyToCar(salonId, warrantyId, carId) {
    return http.post("/warranty/push-warranty", {
      salonId: salonId,
      warrantyId: warrantyId,
      carId: carId,
    });
  },
  getCarWarranty(car_id) {
    return http.post(`/warranty/cars/${car_id}`);
  },

  removeWarranty(salonId, warrantyId) {
    return http.delete("/warranty/delete", {
      data: {
        salonId: salonId,
        warrantyId: warrantyId,
      },
    });
  },
};

export default warrantyApi;
