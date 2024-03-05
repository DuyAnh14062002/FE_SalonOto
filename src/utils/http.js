import axios from "axios";
import {
  clearLs,
  getAccessTokenFromLs,
  setAccessTokenToLs,
  setProfileToLs,
} from "./auth";
class Http {
  instance;
  accessToken;
  refreshToken;
  refreshTokenRequest;
  constructor() {
    this.accessToken = getAccessTokenFromLs();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "expire-access-token": 5 * 60 * 60,
        "expire-refresh-token": 60 * 60 * 24 * 30,
      },
    });
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        console.log("url", url);
        if (url === "/auth/login") {
          const data = response.data;
          this.accessToken = data.accessToken;
          setAccessTokenToLs(this.accessToken);
          setProfileToLs(data.user);
        } else if (url === "/auth/logout") {
          console.log("đã vào đây");
          this.accessToken = "";
          setAccessTokenToLs(this.accessToken);
          clearLs();
        }

        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;
export default http;
