import React from "react";
import HeaderSalon from "../../components/Header/HeaderSalon";
import "./Contact.scss";
export default function Contact() {
  function convertToGoogleMapIframeAddress(address) {
    var normalizedAddress = address.replace(/ /g, "%20");
    return normalizedAddress;
  }

  const address = "kí túc xá khu B,phường Đông Hòa,tỉnh Bình dương";
  const iframeAddress = convertToGoogleMapIframeAddress(address);
  return (
    <div>
      <HeaderSalon />
      <div className="container contact">
        <h1 className="text-center mt-5 fw-bold">Liên hệ</h1>
        <div className="row gx-5">
          <div className="col-md-6">
            <div class="border-0 mb-3 mt-5 contact-detail">
              <p>SALON Ô TÔ BÌNH DƯƠNG</p>

              <p>Địa chỉ: {address}</p>

              <p>Phone: 0966 444 550 ( Mr. Anh ) - 0384891853 ( Mr.Ba )</p>

              <p>Mail: badang0509@gmail.com</p>

              <p>Website: salonotobinhduong.com</p>
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
