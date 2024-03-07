import axios from "axios";
import {
  clearLs,
  getAccessTokenFromLs,
  setAccessTokenToLs,
  setProfileToLs,
} from "./auth";
import { set } from "lodash";
class Http {
  instance;
  accessToken;
  refreshToken;
  refreshTokenRequest;
  constructor() {
    this.accessToken = getAccessTokenFromLs();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:5000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
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

        if (url === "/auth/login") {
          const data = response.data;
          this.accessToken = data.accessToken;
          setAccessTokenToLs(this.accessToken);
          setProfileToLs(data.user);
        } else if (url === "/auth/logout") {
          this.accessToken = "";
          clearLs();
        }

        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          const config = error.response?.config || { headers: {} };
          console.log("config", config);
          const { url } = config;

          if (url !== "/auth/refresh") {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  this.refreshTokenRequest = null;
                });

            return this.refreshTokenRequest.then((access_token) => {
              console.log("access_token", access_token);
              // Nghia la chung ta tiep tuc goi lai request cu vua bi loi
              // i want run one time

              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  authorization: `Bearer ${access_token}`,
                },
              });
            });
          }
          clearLs();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }
  handleRefreshToken() {
    return this.instance
      .post("/auth/refresh")
      .then((res) => {
        console.log("res", res);
        const { accessToken } = res.data;
        setAccessTokenToLs(accessToken);
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch((error) => {
        clearLs();
        this.accessToken = "";
        throw error;
      });
  }
}
const http = new Http().instance;
export default http;
