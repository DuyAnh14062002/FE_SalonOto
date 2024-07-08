import http from "../utils/http";

const permissionApi = {
  getPermission(body) {
    return http.post(`/salons/user`, body);
  },
  postPermission(salonId, permission, userId) {
    return http.post(`/salons/permission`, {
      salonId: salonId,
      permission: permission,
      userId: userId,
    });
  },
  getAllRoleOfSalon() {
    return http.get("/salons/role");
  },
  createRole(salonId, name, permissions) {
    return http.post("/salons/role", {
      salonId: salonId,
      name: name,
      permissions: permissions,
    });
  },
  updateRole(id, name, permissions, salonId) {
    return http.patch(`/salons/role/${id}`, {
      name: name,
      permissions: permissions,
      salonId: salonId,
    });
  },
  deleteRole(id) {
    return http.delete(`/salons/role/${id}`);
  },
  assignRole(employeeId, roleId) {
    return http.post("/salons/assign-role", {
      employeeId: employeeId,
      roleId: roleId,
    });
  },
};

export default permissionApi;
