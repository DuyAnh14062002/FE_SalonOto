import http from "../utils/http";

const messageApi = {
  getMessage(id) {
    return http.get(`/messages/${id}`);
  },

  postMessage(id, data) {
    return http.post(`/messages/send/${id}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  getChatingUser() {
    return http.get("/messages/chatting-users");
  },
};

export default messageApi;
