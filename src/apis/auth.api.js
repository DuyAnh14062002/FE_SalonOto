import http from "../utils/http";

export const URL_LOGIN = "login";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";

const authApi = {
  googleAuth() {
    return http.get(`/auth/google`);
  },
  googleAuthCallback(search) {
    return http.get(`/auth/google/callback${search}`);
  },
  registerAccount(body) {
    return http.post(`/auth/${URL_REGISTER}`, body);
  },
  login(body) {
    return http.post(`/auth/${URL_LOGIN}`, body);
  },
  logout() {
    return http.post(`/auth/pu${URL_LOGOUT}`);
  },
};
export default authApi;
