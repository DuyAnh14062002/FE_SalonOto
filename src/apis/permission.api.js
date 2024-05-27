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
};

export default permissionApi;
