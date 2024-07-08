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

  getAllProcess(page = 1, per_page = 1000, q = "") {
    return http.get(`/transactions?page=${page}&&per_page=${per_page}&&q=${q}`);
  },

  nextProcess(id, rating, commission) {
    return http.patch(`/transactions/${id}/next`, {
      rating: rating,
      commission: commission,
    });
  },

  updateProcessCheck(id, checked, stageId) {
    return http.patch(`/transactions/${id}/details`, {
      checked: checked,
      stageId: stageId,
    });
  },

  getDetailProcess(id) {
    return http.get(`/transactions/${id}`);
  },

  deleteProcess(id) {
    return http.delete(`/transactions/${id}`);
  },
};

export default dealerApi;
