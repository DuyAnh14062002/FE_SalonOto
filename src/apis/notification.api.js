import http from "../utils/http";

const notificationApi = {
  getAllNotificationUser(body) {
    return http.post("/notification/get-notification-user", body);
  },
  updateNotificationUser(body) {
    return http.patch("/notification/read-notification-user", body);
  },
  deleteNotificationUser(body) {
    return http.delete("/notification/delete-notification-user", {
      data: body,
    });
  },
  getAllNotificationSalon(body) {
    return http.post("/notification/get-notification-admin", body);
  },
  updateNotificationSalon(body) {
    return http.patch("/notification/read-notification-admin", body);
  },
  deleteNotificationSalon(body) {
    return http.delete("/notification/delete-notification-admin", {
      data: body,
    });
  },
};

export default notificationApi;
