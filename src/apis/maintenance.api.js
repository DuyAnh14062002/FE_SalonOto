import http from "../utils/http";

const maintenanceApi = {
  getAllMaintenanceOfSalon(salonId, page = 1, per_page = 1000, q = "") {
    return http.get(
      `/maintenance/salon/${salonId}?page=${page}&per_page=${per_page}&q=${q}`
    );
  },
  createMaintenance(name, description, cost) {
    return http.post("/maintenance", {
      name: name,
      description: description,
      cost: cost,
    });
  },
  updateMaintenance(salon_id, name, description, cost) {
    return http.patch(`/maintenance/${salon_id}`, {
      name: name,
      description: description,
      cost: cost,
    });
  },
  deleteMaintenance(salon_id) {
    return http.delete(`/maintenance/${salon_id}`);
  },
};

export default maintenanceApi;
