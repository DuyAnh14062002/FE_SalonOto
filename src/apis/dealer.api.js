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
};

export default dealerApi;
