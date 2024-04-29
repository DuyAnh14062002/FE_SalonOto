import http from "../utils/http";

const permissionApi = {
  getPermission(salonId) {
    return http.post(`/salons/user`, {
      salonId: salonId,
    });
  },
  postPermission(salonId, permission, userId) {
    return http.post(`/salons/permission`, {
      salonId: salonId,
      permission: permission,
      userId: userId,
    });
  },
};

export default permissionApi;
