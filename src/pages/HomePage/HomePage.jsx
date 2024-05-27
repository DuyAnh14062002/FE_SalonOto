import Header from "../../components/Header";
import ModalBuyPackage from "../../components/Modal/ModalBuyPackage";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { path } from "./../../constants/path";
import packageApi from "../../apis/package.api";
export default function HomePage() {
  const [show, setShow] = useState(false);
  const [listPackage, setListPackage] = useState([]);
  let navigate = useNavigate();
  // const ShowDetailPackage = () =>{
  //       navigate("/detail-package/:123")
  // }
  const handleShowModal = () => {
    setShow(true);
  };
  const handleHideModal = () => {
    setShow(false);
  };
  const NavigateListPackage = () => {
    navigate(`${path.ListPackage}`);
  };

  useEffect(() => {
    const loadingPackage = async () => {
      let res = await packageApi.getAllPackage();
      if (res?.data?.packages) {
        getPackageForHomePage(res.data.packages);
        // setPackages(res.data.packages.packages)
      }
    };
    loadingPackage();
  }, []);
  const getPackageForHomePage = (packages) => {
    const list = [];
    if (packages && packages.length > 0) {
      for (let i = 0; i < packages.length; i++) {
        list.push(packages[i]);
      }
      setListPackage(list);
    }
  };

  return (
    <>
      <div className="container-homepage">
        <Header otherPage={false} />
        <div className="destination__container">
          <img
            className="bg__img__1"
            src="../../../public/image/bg-dots.png"
            alt="bg"
          />
          <img
            className="bg__img__2"
            src="../../../public/image/bg-arrow.png"
            alt="bg"
          />
          <div className="socials">
            <span>
              <i className="ri-twitter-fill"></i>
            </span>
            <span>
              <i className="ri-facebook-fill"></i>
            </span>
            <span>
              <i className="ri-instagram-line"></i>
            </span>
            <span>
              <i className="ri-youtube-fill"></i>
            </span>
          </div>
          <div className="content">
            <h1>
              Khám phá <br />
              các gói
              <br />
              <span> Salon oto</span>
            </h1>
            <p>
              Chúng tôi cung cấp cho bạn các gói dịch vụ tốt nhất giúp quản lí
              bạn quản lí Salon Oto của mình một cách hiệu quả
            </p>
            <button className="btn" onClick={NavigateListPackage}>
              Khám phá ngay
            </button>
          </div>
          <div className="destination__grid">
            {listPackage &&
              listPackage.length > 0 &&
              listPackage.map((item, index) => {
                return (
                  <div className="destination__card" key={index}>
                    <div className="card__content">
                      <h4>{item.name}</h4>
                      <ul>
                        {item &&
                          item.features.length > 0 &&
                          item.features.map((feature) => {
                            return (
                              <li>
                                {" "}
                                <i
                                  className="fa-solid fa-circle-check"
                                  style={{ color: "green" }}
                                ></i>{" "}
                                {feature.name}
                              </li>
                            );
                          })}
                      </ul>
                      <button className="btn" onClick={handleShowModal}>
                        Mua ngay
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ModalBuyPackage show={show} handleHideModal={handleHideModal} />
    </>
  );
}
