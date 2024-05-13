import http from "../utils/http";

const dealerApi = {
  // sentPost(salons, data) {
  //   return http.post("/posts", {
  //     salons: salons,
  //     title: data.title,
  //     image: data.image,
  //     brand: data.brand,
  //     type: data.type,
  //     mfg: data.mfg,
  //     version: data.version,
  //     gear: data.gear,
  //     fuel: data.fuel,
  //     origin: data.origin,
  //     design: data.design,
  //     seat: data.seat,
  //     color: data.color,
  //     licensePlate: data.licensePlate,
  //     ownerNumber: data.ownerNumber,
  //     accessory: data.accessory,
  //     registrationDeadline: data.registrationDeadline,
  //     kilometer: data.kilometer,
  //     price: data.price,
  //     address: data.address,
  //   });
  // },
  sentPost(data) {
    return http.post(`/posts`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  getDetailPost(id) {
    return http.get(`/posts/${id}`);
  },

  CreateConnecttion(postId, processId) {
    return http.post("/connections", {
      postId: postId,
      processId: processId,
    });
  },

  getConectionById(id) {
    return http.get(`/connections/${id}`);
  },

  updateConnection(id, status) {
    return http.patch(`/connections/${id}`, {
      status: status,
    });
  },

  getAllProcess() {
    return http.get("/transactions");
  },

  nextProcess(id) {
    return http.patch(`/transactions/${id}/next`);
  },

  updateProcessCheck(id, checked) {
    return http.patch(`/transactions/${id}/details`, {
      checked: checked,
    });
  },

  getDetailProcess(id) {
    return http.get(`/transactions/${id}`);
  },
};

export default dealerApi;
