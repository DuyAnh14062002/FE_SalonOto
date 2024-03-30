import { useState, useEffect } from "react";
import "./Contact.scss";
import HeaderSalon from "../../../components/Header/HeaderSalon";
import salonApi from "../../../apis/salon.api";
export default function Contact() {
  const [salon, setSalon] = useState({});
  const idSalon = localStorage.getItem("idSalon");
  function convertToGoogleMapIframeAddress(address) {
    var normalizedAddress = address.replace(/ /g, "%20");
    return normalizedAddress;
  }
  useEffect(() => {
    const loading = async () => {
      let res = await salonApi.getDetailSalon(idSalon);
      if (res?.data?.salon) {
        setSalon(res.data.salon);
      }
    };
    loading();
  }, [idSalon]);
  let address = "";
  if (salon.address) {
    address = salon.address;
  }
  const iframeAddress = convertToGoogleMapIframeAddress(address);
  return (
    <div>
      <HeaderSalon />
      <div className="container contact">
        <h1 className="text-center mt-5 fw-bold">Liên hệ</h1>
        <div className="row gx-5">
          <div className="col-md-6">
            <div class="border-0 mb-3 mt-5 contact-detail">
              <p style={{ textTransform: "uppercase" }}>{salon.name}</p>

              <p>Địa chỉ: {address}</p>

              <p>Phone: {salon.phoneNumber} ( Mr. Anh )</p>

              <p>Mail: {salon.email}</p>
            </div>
            <div className="map">
              <iframe
                title="gg map"
                src={`https://www.google.com/maps?q=${iframeAddress}&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <div className="row">
              <div className="col-md-12">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Email" />
                </div>
              </div>
              <div className="col-md-6">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i className="fa fa-phone-volume"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Điện thoại"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <textarea
                  class="form-control"
                  rows={5}
                  placeholder="Nội dung"
                />
              </div>
              <div className="col-md-12 mt-3 d-md-flex justify-content-md-end">
                <button className="btn btn-secondary text-right">Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
