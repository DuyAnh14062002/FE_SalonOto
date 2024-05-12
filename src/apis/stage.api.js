import { update } from "lodash";
import http from "../utils/http";

const stageApi = {
  createStage(body) {
    return http.post("/legals/create-documents", body);
  },
  createStageForHoaTieu(body) {
    return http.post("/stages", body);
  },
  getAllStageByProcessId(processId) {
    return http.get(`/stages/process/${processId}`);
  },
  updateStage(body) {
    return http.patch("/legals/update-documents", body);
  },
  deleteStage(body) {
    return http.delete("/legals/delete-documents", {
      data: {
        ...body,
      },
    });
  },
  deleteStageForHoaTieu(stageId) {
    return http.delete(`/stages/${stageId}`);
  },
  updateStageForHoaTieu(stageId, body) {
    return http.patch(`/stages/${stageId}`, body);
  },
};

export default stageApi;
