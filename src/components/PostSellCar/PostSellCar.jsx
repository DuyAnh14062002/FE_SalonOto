import React from "react";
import Header from "../Header";
import "./PostSellCar.scss"
export default function PostSellCar() {
  return (
    <>
      <Header otherPage={true} />
      <div className="body-post-sell">
        <div className="post-sell-container">
          <div className="left-post-sell">
            <div className="title">Hình ảnh sản phẩm</div>
            <div className="image-post-sell">
              <input type="file" />
              <i class="fa-solid fa-camera"></i>
              <label>Đăng từ 1 đến 20 hình</label>
            </div>
          </div>
          <div className="right-post-sell">
            <div className="title">Thông tin chi tiết</div>
            <input
              placeholder="Hãng xe"
              type="text"
              className="car-detail-input"
            />
            <input
              placeholder="Dòng xe"
              type="text"
              className="car-detail-input"
            />
            <input
              placeholder="Năm sản xuất"
              type="text"
              className="car-detail-input"
            />
            <input
              placeholder="Phiên bản"
              type="text"
              className="car-detail-input"
            />
            <div className="gear-infor">
              <div className="gear-title">Hộp số</div>
              <button className="gear-name active">Tự động</button>
              <button className="gear-name">Số sàn</button>
              <button className="gear-name">Bán tự động</button>
            </div>
            <div className="fuel-infor">
              <div className="fuel-title">Nhiên liệu</div>
              <button className="fuel-name active">Xăng</button>
              <button className="fuel-name">Dầu</button>
              <button className="fuel-name">Động cơ Hybrid</button>
              <button className="fuel-name">Điện</button>
            </div>
            <div className="infor-post-sell-2">
              <div className="left-infor">
                <input
                  placeholder="Xuất xứ"
                  type="text"
                  className="car-detail-input"
                />
                <input
                  placeholder="Số chỗ"
                  type="text"
                  className="car-detail-input"
                />
                <input
                  placeholder="Biển số xe"
                  type="text"
                  className="car-detail-input"
                />
                <div className="is-accessory">
                  <span>Có phụ kiện đi kèm</span> <br/>
                  <button className="yes">Có</button>
                  <button className="no">Không</button>
                </div>
              </div>
              <div className="right-infor">
                <input
                  placeholder="Kiểu dáng"
                  type="text"
                  className="car-detail-input"
                />
                <input
                  placeholder="Màu sắc"
                  type="text"
                  className="car-detail-input"
                />
                <input
                  placeholder="Số đời chủ"
                  type="text"
                  className="car-detail-input"
                />
                <div className="is-regis">
                  <span>Còn hạn đăng kiểm</span> <br/>
                  <button className="yes">Có</button>
                  <button className="no">Không</button>
                </div>
              </div>
            </div>
            <input
              placeholder="Số Km đã đi"
              type="number"
              className="car-detail-input"
            />
            <input
              placeholder="Giá bán"
              type="text"
              inputMode="decimal"
              className="car-detail-input"
            />
            <h4 className="title-and-description">Tiêu đề bài đăng và Mô tả chi tiết</h4>
            <input
              placeholder="Tiêu đề tin đăng"
              type="text"
              className="car-detail-input"
            />
            <textarea rows="4" cols="50" placeholder="Mô tả chi tiết" >

            </textarea>

            <h4 className="user-infor">Thông tin hoa tiêu</h4>
            <input
              placeholder="Địa chỉ"
              type="text"
              className="car-detail-input"
            />
            <button className="btn-post-sell-car">Đăng tin</button>
          </div>
        </div>
      </div>
    </>
  );
}
