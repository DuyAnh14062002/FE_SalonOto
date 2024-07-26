import http from "../utils/http";

const invoiceApi = {
  getAllInvoiceBuyCar(salon_id, dataPaginate) {
    return http.post("/invoice/get-invoice-buy-car-salon", {
      salonId: salon_id,
      page: dataPaginate.page,
      per_page: dataPaginate.per_page,
      q: dataPaginate.q,
    });
  },
  getAllInvoiceMaintain(page = 1, per_page = 1000, q = "") {
    return http.get(
      `/invoice/get-invoice-maintenance?page=${page}&per_page=${per_page}&q=${q}`
    );
  },
  createBuyCarInvoice(salon_Id, carId, data, processId, employeeId) {
    return http.post("/invoice/create-invoice", {
      salonId: salon_Id,
      carId: carId,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      note: data.note,
      licensePlate: data.licensePlate,
      expense: data.expense,
      processId,
      employeeId: employeeId,
    });
  },

  createMaintenanceInvoice(data, services, accessory, invoiceId) {
    return http.post("/invoice", {
      licensePlate: data.licensePlate,
      carName: data.carName,
      services: services,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      accessories: accessory,
      invoiceId: invoiceId,
    });
  },

  getInvoiceByLicensePlate(licensePlate) {
    return http.get(`/invoice/by-license/${licensePlate}`);
  },
  getInvoiceBuyCarByPhone(phone) {
    return http.post("/invoice/lookup", {
      phone: phone,
    });
  },
  deleteInvoiceMaintenance(id) {
    return http.delete(`/invoice/${id}`);
  },
  updateInvoiceMaintenance(data, services, accessory) {
    return http.patch(`/invoice/${data.invoice_id}`, {
      licensePlate: data.licensePlate,
      carName: data.carName,
      services: services,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      accessories: accessory,
    });
  },

  getAccessory(salon_id) {
    return http.get(`/accessory/salon/${salon_id}`);
  },

  getInvoiceHistoryForCustomer() {
    return http.post("/invoice/get-invoice-buy-car");
  },
  deleteInvoiceBuyCar(body) {
    return http.post("/invoice/remove", body);
  },
  getDetailInvoiceBuyCar(body) {
    return http.post("/invoice/lookup", body);
  },
  updateDoneInvoice(body) {
    return http.patch("/invoice/tick-done", body);
  },
  getDetailInvoiceAccessory(id) {
    return http.get(`/buy-accessory/${id}`);
  },
  getDetailInvoiceMaintenance(id) {
    return http.get(`/invoice/${id}`);
  },
  satisticCustomer(year, quarter, month) {
    return http.get(
      `/invoice/get-invoice?year=${year}&quarter=${quarter}&month=${month}`
    );
  },
  LookupInvoiceMaintenance(invoiceId) {
    return http.post("/invoice/lookup", {
      invoiceId: invoiceId,
    });
  },
  getInvoiceDetailHistoryBuyCarForCustomer(id) {
    return http.post(`/invoice/get-invoice-buy-car?id=${id}`);
  },
};

export default invoiceApi;
