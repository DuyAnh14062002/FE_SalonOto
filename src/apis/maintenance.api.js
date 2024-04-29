import http from "../utils/http";

const maintenanceApi = {
  getAllMaintenanceOfSalon(salonId) {
    return http.get(`/maintenance/salon/${salonId}`);
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
