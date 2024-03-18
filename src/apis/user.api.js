import http from "../utils/http";

const userApi = {
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
};

export default userApi;
