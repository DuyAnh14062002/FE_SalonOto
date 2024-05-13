import http from "../utils/http";

const userApi = {
  getAllUsers() {
    return http.get("/users");
  },
  getUserById(id) {
    return http.get(`/users/${id}`);
  },
  getProfile() {
    return http.get("/users/profile");
  },

  updateProfile(data) {
    return http.patch("/users/profile", data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  acceptInvite(body) {
    return http.post(`/salons/verifyInviteUser`, body);
  },
  getLegalUser(body) {
    return http.post("/legals/get-legals-user", body);
  },
};

export default userApi;
