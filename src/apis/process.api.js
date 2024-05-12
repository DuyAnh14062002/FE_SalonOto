import http from "../utils/http";

const processApi = {
  getAllProcess(body) {
    return http.post("/legals/process", body);
  },
  createProcess(body) {
    return http.post("/legals/create-process", body);
  },
  updateProcess(body) {
    return http.patch("/legals/update-process", body);
  },
  deleteProcess(body) {
    return http.delete("/legals/delete-process", {
      data: {
        ...body,
      },
    });
  },
  checkDetailUser(body) {
    return http.post("/legals/check-details-user", body);
  },
  updatePeriodUser(body) {
    return http.patch("/legals/update-period-user", body);
  },
};

export default processApi;
