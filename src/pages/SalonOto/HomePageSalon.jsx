import React from "react";
import { useNavigate } from "react-router-dom";
import { path } from "./../../constants/path";
import HeaderSalon from "../../components/Header/HeaderSalon";
import "./HomePageSalon.scss";
import FooterSalon from "../../components/Footer/FooterSalon";
export default function HomePageSalon() {
  const navigate = useNavigate();
  const NavigateDetailCar = () => {
    navigate(`${path.DetailCar}`);
  };
  return (
    <div>
      <HeaderSalon />
      <div
        className="banner-salon"
        style={{
          backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/slider_1.jpg?1699270212851)`,
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
                placeholder="từ khóa..."
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
          <div
            className="col-lg-4 col-md-6 col-12 car-container"
            onClick={NavigateDetailCar}
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
                <h4 className="name-car">Mazda 3 Sport 2021</h4>
                <h4 className="price-car">515.000.000 đ</h4>
                <div className="short-introduce">
                  <div className="country-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Nhật bản</span>
                  </div>
                  <div className="Designs-box">
                    <div
                      className="icon-chair"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>hatchback</span>
                  </div>
                  <div className="version-box">
                    <div
                      className="icon-version"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>1.5 AT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-12 car-container"
            onClick={NavigateDetailCar}
          >
            <div className="image-container">
              <div
                className="image-car"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/z4977477313590-abe158b8be63ce2ec48d2de604dfb21c.jpg?v=1702689416750)`,
                }}
              ></div>
            </div>
            <div className="car-body">
              <div className="salon-content">
                <h4 className="name-car">Toyota Fortuner Legender</h4>
                <h4 className="price-car">754.000.000 đ</h4>
                <div className="short-introduce">
                  <div className="country-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Nhật bản</span>
                  </div>
                  <div className="Designs-box">
                    <div
                      className="icon-chair"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>hatchback</span>
                  </div>
                  <div className="version-box">
                    <div
                      className="icon-version"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>1.5 AT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-12 car-container"
            onClick={NavigateDetailCar}
          >
            <div className="image-container">
              <div
                className="image-car"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/z4920787036097-9752b1acd9f6e816488738b3f534c77d.jpg?v=1702519735787)`,
                }}
              ></div>
            </div>
            <div className="car-body">
              <div className="salon-content">
                <h4 className="name-car">Toyota Rush 1.5S 2019</h4>
                <h4 className="price-car">625.000.000 đ</h4>
                <div className="short-introduce">
                  <div className="country-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Nhật bản</span>
                  </div>
                  <div className="Designs-box">
                    <div
                      className="icon-chair"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>hatchback</span>
                  </div>
                  <div className="version-box">
                    <div
                      className="icon-version"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>1.5 AT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-12 car-container"
            onClick={NavigateDetailCar}
          >
            <div className="image-container">
              <div
                className="image-car"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/z4856112063323-12feb1f76358752d45a5015210172e76.jpg?v=1699586391630)`,
                }}
              ></div>
            </div>
            <div className="car-body">
              <div className="salon-content">
                <h4 className="name-car">Mercedes GLC300 2017</h4>
                <h4 className="price-car">1.515.000.000 đ</h4>
                <div className="short-introduce">
                  <div className="country-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Nhật bản</span>
                  </div>
                  <div className="Designs-box">
                    <div
                      className="icon-chair"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>hatchback</span>
                  </div>
                  <div className="version-box">
                    <div
                      className="icon-version"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>1.5 AT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-12 car-container"
            onClick={NavigateDetailCar}
          >
            <div className="image-container">
              <div
                className="image-car"
                style={{
                  backgroundImage: `url(https://bizweb.dktcdn.net/thumb/large/100/437/558/products/z4977888455904-6aa2ed68a3c98f38304581abc1b14f45.jpg?v=1702688679360)`,
                }}
              ></div>
            </div>
            <div className="car-body">
              <div className="salon-content">
                <h4 className="name-car">Ford Ranger Wildtrak 2016</h4>
                <h4 className="price-car">835.000.000 đ</h4>
                <div className="short-introduce">
                  <div className="country-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Nhật bản</span>
                  </div>
                  <div className="Designs-box">
                    <div
                      className="icon-chair"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_2.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>hatchback</span>
                  </div>
                  <div className="version-box">
                    <div
                      className="icon-version"
                      style={{
                        backgroundImage: `url(//bizweb.dktcdn.net/100/437/558/themes/836129/assets/tag_icon_3.svg?1699270212851)`,
                      }}
                    ></div>
                    <span>1.5 AT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSalon />
    </div>
  );
}
