import http from "../utils/http";

const videoCallApi = {
  getVideoCall() {
    return http.get("/videocall/get-token");
  },

  createMeeting(token, region) {
    return http.post(`/videocall/create-meeting`, {
      token: token,
      region: region,
    });
  },
};

export default videoCallApi;
