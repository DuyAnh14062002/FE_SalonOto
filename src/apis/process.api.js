import http from "../utils/http";

const processApi = {
  getAllProcess() {
    return http.get("/process");
  },
};

export default processApi;
