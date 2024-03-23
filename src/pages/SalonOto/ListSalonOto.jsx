import React from "react";
import "./ListSalonOto.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
export default function ListSalonOto() {
  const navigate = useNavigate();
  const NavigateSalon = () => {
    navigate("/salonOto/:123");
  };
  return (
    <div>
      <Header otherPage={true} />
      <div>
        <section className="listSalon section">
          <div className="container">
            <div className="row g-2">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2 className="text-center mt-3">Danh sách các Salon</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-12 salon-container"
                onClick={NavigateSalon}
              >
                <div className="image-container">
                  <div
                    className="image-salon"
                    style={{
                      backgroundImage: `url(https://s.bonbanh.com/uploads/users/664501/salon/l_1698230076.jpg)`,
                    }}
                  ></div>
                </div>
                <div className="salon-body">
                  <div className="salon-content">
                    <div className="name-salon">Salon oto Mạnh Đức</div>
                    <span>51/34 Linh Chiểu TP thủ đức</span>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 salon-container"
                onClick={NavigateSalon}
              >
                <div className="image-container">
                  <div
                    className="image-salon"
                    style={{
                      backgroundImage: `url(https://s.bonbanh.com/uploads/users/664501/salon/l_1698230076.jpg)`,
                    }}
                  ></div>
                </div>
                <div className="salon-body">
                  <div className="salon-content">
                    <div className="name-salon">Salon oto Mạnh Đức</div>
                    <span>51/34 Linh Chiểu TP thủ đức</span>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 salon-container"
                onClick={NavigateSalon}
              >
                <div className="image-container">
                  <div
                    className="image-salon"
                    style={{
                      backgroundImage: `url(https://s.bonbanh.com/uploads/users/664501/salon/l_1698230076.jpg)`,
                    }}
                  ></div>
                </div>
                <div className="salon-body">
                  <div className="salon-content">
                    <div className="name-salon">Salon oto Mạnh Đức</div>
                    <span>51/34 Linh Chiểu TP thủ đức</span>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 salon-container"
                onClick={NavigateSalon}
              >
                <div className="image-container">
                  <div
                    className="image-salon"
                    style={{
                      backgroundImage: `url(https://s.bonbanh.com/uploads/users/664501/salon/l_1698230076.jpg)`,
                    }}
                  ></div>
                </div>
                <div className="salon-body">
                  <div className="salon-content">
                    <div className="name-salon">Salon oto Mạnh Đức</div>
                    <span>51/34 Linh Chiểu TP thủ đức</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
