import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSalon from "../../components/Header/HeaderSalon";
import "./HomePageSalon.scss";
import FooterSalon from "../../components/Footer/FooterSalon";
import { useParams } from "react-router-dom";
import salonApi from "../../apis/salon.api";
import carApi from "../../apis/car.api";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { formatCurrency } from "../../utils/common";

const LIMIT = 6;
export default function HomePageSalon() {
  const navigate = useNavigate();
  const params = useParams();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [listCar, setListCar] = useState([]);
  const NavigateDetailCar = (id) => {
    navigate(`/detail-car/${id}`);
  };
  const [salon, setSalon] = useState({});
  const loadAllCarOfSalon = async (salonId, page) => {
    try {
      let res = await carApi.getAllCarOfSalon(salonId, page, LIMIT);
      if (res?.data?.cars) {
        setListCar(res.data.cars);
        setTotalPage(res?.data?.total_page);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (params.id) {
      localStorage.setItem("idSalon", params.id);

      const loading = async () => {
        let res = await salonApi.getDetailSalon(params.id);
        setSalon(res.data.salon);
        if (res?.data?.salon?.user_id) {
          localStorage.setItem("userIdSalon", res.data.salon.user_id);
        }
      };
      loadAllCarOfSalon(params.id, page);
      loading();
    }
  }, [params, page]);
  return (
    <div>
      <HeaderSalon />
      <div
        className="banner-salon position-relative"
        style={{
          backgroundImage: `url(${salon?.banner?.[0]})`,
        }}
      ></div>
      <div className="search-oto-container">
        <div className="search-box">
          <div className="Head-title">
            <div
              className="logo-search-oto"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/search-cart.png?1699270212851)`,
              }}
            ></div>
            <span>Tìm kiếm xe</span>
          </div>
          <div className="body">
            <div className="search-key">
              <span>Từ khóa</span>
              <input
                className="search-key-input"
                placeholder="Từ khóa..."
              ></input>
            </div>
            <div className="search-trademark">
              <span>Thương hiệu</span>
              <input
                className="search-trademark-input"
                placeholder="Thương hiệu..."
              ></input>
            </div>
            <button>Tìm kiếm</button>
          </div>
        </div>
      </div>
      <div className="list-new-car">
        <h2>Danh sách xe mới về</h2>
        <div className="row">
          {listCar &&
            listCar.length > 0 &&
            listCar.map((car) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-12 car-container"
                  onClick={() => NavigateDetailCar(car.car_id)}
                >
                  <div className="image-container">
                    <div
                      className="image-car"
                      style={{
                        backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/z4887061899879-10dac384e4991ed265f9f67a1e3c84f9.jpg?v=1702520973857)`,
                      }}
                    ></div>
                  </div>
                  <div className="car-body">
                    <div className="salon-content">
                      <h4 className="name-car">{car.name}</h4>
                      <h4 className="price-car">{formatCurrency(car.price)}</h4>
                      <div className="short-introduce">
                        <div className="country-box">
                          <i className="fa-solid fa-calendar-days"></i>
                          <span>{car.origin}</span>
                        </div>
                        <div className="Designs-box">
                          <div
                            className="icon-chair"
                            style={{
                              backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                            }}
                          ></div>
                          <span>{car.model}</span>
                        </div>
                        <div className="version-box">
                          <div
                            className="icon-version"
                            style={{
                              backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                            }}
                          ></div>
                          <span>{car.capacity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {listCar && listCar.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <PaginationControl
              page={page}
              total={totalPage * LIMIT || 0}
              limit={LIMIT}
              changePage={(page) => {
                setPage(page);
              }}
              ellipsis={1}
            />
          </div>
        )}
      </div>
      <FooterSalon />
    </div>
  );
}
