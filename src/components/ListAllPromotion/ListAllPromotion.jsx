import React, { useEffect, useState } from "react";
import "./ListAllPromotion.scss";
import promotionApi from "../../apis/promotion.api";
import { useNavigate } from "react-router-dom";
import HeaderSalon from "../Header/HeaderSalon";
export default function ListAllPromotion() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const loadingAllPromotion = async () => {
    try {
      let res = await promotionApi.getAllPromotion();
      if (res?.data?.promotions.promotions) {
        setPromotions(res?.data?.promotions.promotions);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadingAllPromotion();
  }, []);

  const handleNavigateDetail = async (promo) => {
    navigate(`/promotionDetail/${promo.id}`);
  };
  return (
    <>
      <HeaderSalon />
      <h2 className="list-promotion-header-text">Danh sách các khuyến mãi</h2>
      <div className="list-promotion-container">
        {promotions?.length > 0 &&
          promotions.map((promo, index) => {
            return (
              <div
                className="promotion-box"
                onClick={() => handleNavigateDetail(promo)}
                key={promo.id}
              >
                <div
                  className="thumnail-promotion"
                  style={{ backgroundImage: `url(${promo?.thumbnail})` }}
                ></div>
                <div className="title-promotion">{promo?.title}</div>
                <div className="description-promotion">{promo.description}</div>
                <div className="time-promotion">
                  {promo.startDate} - {promo.endDate}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
