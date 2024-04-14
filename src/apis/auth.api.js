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
  googleAuthCallback(code) {
    return http.get(`/auth/google/callback?code=${code}`);
  },
  facebookAuthCallback(code) {
    return http.get(`/auth/facebook/callback?code=${code}`);
  },
  inviteUser(body) {
    return http.post(`/salons/invite`, body);
  },
  verifyTokenEmail(token) {
    return http.get(`/salons/verify-invite/${token}`);
  },
  register(body) {
    return http.post(`${URL_REGISTER}`, body);
  },
  login(body) {
    return http.post(`${URL_LOGIN}`, body);
  },
  logout(body) {
    return http.post(`${URL_LOGOUT}`, body);
  },
  createNewPassword(newPassword) {
    return http.post("/auth/change-pw", {
      newPassword: newPassword,
    });
  },
};
export default authApi;
