import React, { useEffect, useState } from "react";
import "./ListSalonOto.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import salonApi from "../../apis/salon.api";
export default function ListSalonOto() {
  const navigate = useNavigate();
  const [listSalon, setListSalon] = useState([]);
  const NavigateSalon = (id) => {
    navigate(`/salonOto/${id}`);
  };

  useEffect(() => {
    const loading = async () => {
      let res = await salonApi.getAllSalon();
      if (res?.data?.salons?.salons) {
        setListSalon(res.data.salons.salons);
      }
    };
    loading();
  }, []);
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
              {listSalon &&
                listSalon.length > 0 &&
                listSalon.map((salon) => {
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-12 salon-container"
                      onClick={() => NavigateSalon(salon.salon_id)}
                    >
                      <div className="image-container">
                        <div
                          className="image-salon"
                          style={{
                            backgroundImage: `url(${salon.image})`,
                          }}
                        ></div>
                      </div>
                      <div className="salon-body">
                        <div className="salon-content">
                          <div className="name-salon">{salon.name}</div>
                          <span>{salon.address}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
