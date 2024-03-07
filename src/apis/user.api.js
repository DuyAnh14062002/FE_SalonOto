import http from "../utils/http";

const userApi = {
  getUserById(id) {
    return http.get(`/users/${id}`);
  },
};

export default userApi;
