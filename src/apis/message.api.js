import http from "../utils/http";

const messageApi = {
  getMessage(id) {
    return http.get(`/messages/${id}`);
  },

  postMessage(id, message) {
    return http.post(`/messages/send/${id}`, {
      message: message,
    });
  },
  getChatingUser() {
    return http.get("/messages/chatting-users");
  },
};

export default messageApi;
