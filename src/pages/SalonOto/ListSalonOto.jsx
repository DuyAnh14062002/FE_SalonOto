import React, { useEffect, useState } from "react";
import "./ListSalonOto.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import salonApi from "../../apis/salon.api";
export default function ListSalonOto() {
  const navigate = useNavigate();
  const [listSalon, setListSalon] = useState([])
  const NavigateSalon = (id) => {
    navigate(`/salonOto/${id}`);
  };

  useEffect(() => {
    const loading = async () =>{
      let res = await salonApi.getAllSalon();
      if(res?.data?.salons?.salons){
        setListSalon(res.data.salons.salons)
      }
    }
    loading()
  })
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
              {listSalon && listSalon.length>0 && listSalon.map((salon) =>{
                return(
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
                )
              })}
            </div>
          </div>
        </section>

        {/* <div className="title-list-insurance ">
        <h2>DANH SÁCH CÁC GÓI BẢO HIỂM</h2>
      </div>
      <div className="insuranceItemTemplate row">
        {arrInsurance &&
          arrInsurance.map((item, index) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-4 insurance-item-container "
                onClick={handleDetailInsurance}
              >
                <div className="insurance-item mb-4">
                  <div className="card">
                    <div
                      data-id="thumbnail"
                      className="card-img-top"
                      // style={{ backgroundImage: `url("${item.image}")` }}
                    ></div>

                    <div className="card-body">
                      <h5 data-id="title" className="card-title">
                        {item.name}
                      </h5>

                      <p data-id="description" className="card-text">
                        {item.title}
                      </p>

                      <p className="card-text">
                        <div className="price">
                          <small className="price-title">Giá: </small>
                          <small className="text-price font-weight-bold">
                            {item.price} Vnd
                          </small>
                        </div>
                        <div className="period">
                          <small className="period-title">Thời hạn: </small>
                          <small className="period-text font-weight-bold">
                            {item.period}
                          </small>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div> */}
      </div>
    </div>
  );
}
