import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./News.scss";
import newApi from "../../apis/news.api";
import { useNavigate } from "react-router-dom";
export default function News() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loading = async () => {
      let res = await newApi.getArticle();
      if (res?.data?.articles) {
        setNews(res.data.articles);
      }
    };
    loading();
  }, []);
  const handleNavigateDetailNew = (id) => {
    navigate(`/detailNew/${id}`);
  };
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
