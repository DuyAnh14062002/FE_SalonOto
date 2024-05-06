import React from "react";
import "./CarPost.scss";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
export default function CarPost() {
  const navigate = useNavigate()
  const handleNavigateDetail = () =>{
     navigate("/CarPostDetail/:id")
  }
  return (
    <>
      <Header otherPage={true} />
      <div className="post-body">
        <div className="postContainer">
          <div className="headerPost">
            <div className="title">Danh sách các xe giao bán</div>
            <div className="filter">
              <select>
                <option>Bài đăng mới nhất</option>
                <option>Giá từ thấp đến cao</option>
                <option>Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className="postBody">
            <div className="post-item" onClick={handleNavigateDetail}>
            <div className="post-image" style={{backgroundImage: `url(https://cdn.chotot.com/ieirc-UnodhlUxx4TR9Pck8wXyn_zxHmETgOMhp3Nks/preset:listing/plain/d3d68ac8e752f92d834aa83b10b97d1e-2870177155819889318.webp)`}}></div>
            <div className="post-content">
              <div className="post-content-top">
                <div className="name-car">Mazda3 Fl 1.5 luxury 2020</div>
                <div className="short-description-car">
                  2020 - 66000 km - Xăng - Tự động
                </div>
                <div className="price">498.000.000 đ</div>
              </div>
              <div className="post-content-bottom">
                <div className="user-infor">
                  <div className="username">Đào Duy anh</div>
                  <div className="time">2 giờ trước</div>
                  <div className="address">Thủ Đức</div>
                </div>
                <button>Kết nối hoa tiêu</button>
              </div>
            </div>
            </div>
            <div className="post-item">
            <div className="post-image" style={{backgroundImage: `url(https://cdn.chotot.com/0U3lX-hh680Fmtj1WmDAak4fwMtNIYxBakLz9QuEC7s/preset:listing/plain/ca919d0349f0197584d2643e2da08105-2873777903114401345.webp)`}}></div>
            <div className="post-content">
              <div className="post-content-top">
                <div className="name-car">Mazda3 Đỏ Pha Lê Full Option sx 2022 cực mới.</div>
                <div className="short-description-car">
                   2022 - 21000 km - Xăng - Tự động
                </div>
                <div className="price">605.000.000 đ</div>
              </div>
              <div className="post-content-bottom">
                <div className="user-infor">
                  <div className="username">Đào Duy anh</div>
                  <div className="time">2 giờ trước</div>
                  <div className="address">Thủ Đức</div>
                </div>
                <button>Kết nối hoa tiêu</button>
              </div>
            </div>
            </div>
            <div className="post-item">
            <div className="post-image" style={{backgroundImage: `url(https://cdn.chotot.com/uWA01iGtoYpL6MUIuydKt5c5YEVD_r9SJpqr203NIjM/preset:listing/plain/b83bf1f077dead6c5580d1e36015b6d0-2876563198322984326.jpg)`}}></div>
            <div className="post-content">
              <div className="post-content-top">
                <div className="name-car">Honda Civic 1.5G Turbo nhập Thái SX 2018 cực đẹp!</div>
                <div className="short-description-car">
                   2018 - 50000 km - Xăng - Tự động
                </div>
                <div className="price">560.000.000 đ</div>
              </div>
              <div className="post-content-bottom">
                <div className="user-infor">
                  <div className="username">Đào Duy anh</div>
                  <div className="time">2 giờ trước</div>
                  <div className="address">Thủ Đức</div>
                </div>
                <button>Kết nối hoa tiêu</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
