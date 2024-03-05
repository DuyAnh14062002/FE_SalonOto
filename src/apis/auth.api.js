import http from "../utils/http";

export const URL_LOGIN = "/auth/login";
export const URL_REGISTER = "/auth/register";
export const URL_LOGOUT = "/auth/logout";

const authApi = {
  googleAuth() {
    return http.get(`/auth/google`);
  },
  facebookAuth() {
    return http.get(`/auth/facebook`);
  },
  googleAuthCallback(search) {
    return http.get(`/auth/google/callback${search}`);
  },
  inviteUser(body) {
    return http.post(`/auth/invite`, body);
  },
  verifyTokenEmail(token) {
    return http.get(`/auth/verify-invite/${token}`);
  },
  register(body) {
    return http.post(`${URL_REGISTER}`, body);
  },
  login(body) {
    return http.post(`${URL_LOGIN}`, body);
  },
  logout() {
    return http.post(`${URL_LOGOUT}`);
  },
};
export default authApi;
