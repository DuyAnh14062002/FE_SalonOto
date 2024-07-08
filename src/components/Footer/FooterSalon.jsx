import React from "react";
import "./FooterSalon.scss";
import { Link } from "react-router-dom";
export default function FooterSalon({phone, email, name, address}) {
  return (
    <div className="footer-container">
      <div className="header-footer">
        <div className="hotline-container">
          <div className="hotline-icon">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className="hotline-content">
            <div className="hotline-title">HOTLINE (24/7)</div>
            <div className="hotline-contact">{phone}</div>
          </div>
        </div>
        <div className="hotline-container">
          <div className="hotline-icon">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className="hotline-content">
            <div className="hotline-title">Liên hệ khiếu nại</div>
            <div className="hotline-contact">{phone}</div>
          </div>
        </div>
        <div className="hotline-container">
          <div className="hotline-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="hotline-content">
            <div className="hotline-title">Liên hệ hợp tác</div>
            <div className="hotline-contact">{email}</div>
          </div>
        </div>
        <div className="hotline-container">
          <div className="hotline-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="hotline-content">
            <div className="hotline-title">Liên hệ kinh doanh</div>
            <div className="hotline-contact">{email}</div>
          </div>
        </div>
        <div className="hotline-container">
          <div className="hotline-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="hotline-content">
            <div className="hotline-title">Chăm sóc khách hàng</div>
            <div className="hotline-contact">{email}</div>
          </div>
        </div>
      </div>
      <div className="body-footer">
        <div className="contact-salon">
          <h4 className="name-salon">{name}</h4>
          <span className="address">
            {" "}
            <i className="fa-solid fa-location-dot"></i> {address}
          </span>
          <span className="phone">
            <i className="fa-solid fa-phone"></i> {phone}
          </span>
          <span className="email">
            <i className="fa-solid fa-envelope"></i> {email}
          </span>
        </div>
        <div className="user-manual">
          <ul>
            <h4>HƯỚNG DẪN</h4>
            <Link className="link">Dịch vụ tư vấn mua bán ô tô miễn phí</Link>
            <Link className="link">Thẩm định chất lượng ô tô cũ miễn phí</Link>
            <Link className="link">Dịch vụ dọn nội thất chuyên nghiệp</Link>
            <Link className="link">
              Hỗ trợ tư vấn thủ tục tài chính mua ô tô miễn phí
            </Link>
            <Link className="link">Dịch vụ tư vấn bảo dưỡng miễn phí</Link>
            <Link className="link">Dịch vụ đánh bóng ô tô chuyên nghiệp</Link>
            <Link className="link">Dịch vụ kiểm tra áp suất lốp miễn phí</Link>
            <Link className="link">Dịch vụ kiểm tra điều hòa ô tô</Link>
            <Link className="link">Hỗ trợ miễn phí thủ tục sang tên</Link>
            <Link className="link">
              Dịch vụ kiểm tra và thay dầu máy ô tô miễn phí
            </Link>
          </ul>
        </div>
        <div className="menu">
          <ul>
            <h4>DANH MỤC</h4>
            <Link className="link">Trang chủ</Link>
            <Link className="link">Giới thiệu</Link>
            <Link className="link">Tin tức</Link>
            <Link className="link">Dịch vụ</Link>
            <Link className="link">Bảo dưỡng</Link>
            <Link className="link">Liên hệ</Link>
          </ul>
        </div>
        <div className="register-receive-news">
          <h4 className="title">Đăng ký nhận tin</h4>
          <p>
            Đăng ký ngay để nhận thông tin sản phẩm, tin khuyến mãi và nhiều hơn
            nữa.
          </p>
          <div className="input-email">
            <input placeholder="Email của bạn" />
            <button>Đăng ký</button>
          </div>
          <div className="icons-payment">
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_1.svg?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_2.svg?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_3.svg?1699270212851https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_1.svg?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_4.svg?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/payment_5.svg?1699270212851)`,
              }}
            ></div>
          </div>
          <div className="icon-social">
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/facebook.png?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/youtube.png?1699270212851)`,
              }}
            ></div>
            <div
              className="icon"
              style={{
                backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/tiktokico.png?1699270212851)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
