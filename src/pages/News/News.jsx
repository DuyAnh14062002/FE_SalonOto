import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./News.scss";
import newApi from "../../apis/news.api";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import promotionApi from "../../apis/promotion.api";
import { path } from "../../constants/path";
import { FacebookIcon, FacebookShareButton } from "react-share";
const LIMIT = 10;
export default function News() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [promotions, setPromotion] = useState([])
  const loading = async (page) => {
    let res = await newApi.getArticle(page, LIMIT);
    console.log(res);
    if (res?.data?.articles) {
      setNews(res.data.articles);
      setTotalItem(res.data.total);
    }
  };
  const loadingAllPromotion = async() => {
     try{
         let res = await promotionApi.getAllPromotion()
         if(res?.data?.promotions?.promotions){
          setPromotion(res?.data?.promotions.promotions)
         }
     }catch(e){
      console.log(e)
     }
  }
  useEffect(() => {
    loadingAllPromotion()
    loading(page);
  }, [page]);
  const handleNavigateDetailNew = (id) => {
    navigate(`/detailNew/${id}`);
  };
  const handleNavigateDetailPromotion = (id) => {
    navigate(`/promotionDetail/${id}`)
  }
  const handleNavigateListSalon = () => {
    navigate("/listPromotion")
  }
  return (
    <>
      <Header otherPage={true} />
      <div className="container-news">
        <div className="new-title">Tin Mới</div>
        <div className="body-news">
          <div className="left-news">
            {news?.length > 0 &&
              news.map((item, index) => {
                return (
                  <div
                    className="new-item"
                    onClick={() => handleNavigateDetailNew(item.id)}
                    key={index}
                  >
                    <div
                      className="new-item-image"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    ></div>
                    <div className="new-item-content">
                      <div className="new-item-content-title">{item.title}</div>
                      <div className="new-item-time">{item.publish}</div>
                      <div className="new-item-description">{item.summary}</div>
                    </div>
                  </div>
                );
              })}
            <div className="d-flex justify-content-center">
              <PaginationControl
                page={page}
                total={totalItem || 0}
                limit={LIMIT}
                changePage={(page) => {
                  setPage(page);
                }}
                ellipsis={1}
              />
            </div>
          </div>
    
          <div className="right-news">
            <div className="extimate-cost-container">
              <div className="cost-title">Ước tính chi phí lăn bánh</div>
              <div className="cost-description">
                Giúp bạn tính toán tổng số tiền cần chi trả khi mua ôtô.
              </div>
              <div className="cost-car-form">
                <label className="cost-car-label">Giá xe</label>
                <div className="cost-car-input-box d-flex align-items-center">
                  <input
                    className="cost-car-input px-1 form-control"
                    style={{ width: "90%" }}
                    placeholder="Nhập giá xe"
                  ></input>
                  <span className="currency-unit mx-1">VND</span>
                </div>
              </div>
              <div className="select-city-form">
                <label className="select-city-label"></label>
                <div className="select-city-box">
                  <select className="select-city-input form-select">
                    <option>Tp.Hồ Chí Minh</option>
                    <option>Hà nội</option>
                    <option>Tỉnh khác</option>
                  </select>
                  <span className="select-city-icon"></span>
                </div>
              </div>
              <div className="caculate rounded">Tính toán</div>
              <FacebookShareButton
                url={"https://fe-salon-oto.vercel.app/login"}
                className="mt-3"
              >
                <FacebookIcon size={32} round /> Share with Facebook
              </FacebookShareButton>
            </div>
            <div className="promotion-container">
                {promotions?.length > 0 && promotions.map((promo, index) => {
                  return(
                  <div className="promotion-box" key={index} onClick={() => handleNavigateDetailPromotion(promo.id)}>
                    <div className="thumnail-promotion" style={{backgroundImage : `url(${promo.thumbnail})`}}></div>
                    <div className="title-promotion">{promo.title}</div>
                    <div className="description-promotion">{promo.description}</div>
                    <div className="time-promotion">{promo.startDate} - {promo.endDate}</div>
                  </div>
                  )
                })}
            </div>
            <button className="list-all-promotion" onClick={handleNavigateListSalon}>Xem tất cả khuyến mãi 🎁</button>
          </div>
        </div>
      </div>
    </>
  );
}
