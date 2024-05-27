import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useState } from "react";
import ModalBuyPackage from "../../components/Modal/ModalBuyPackage";
import "./ListPackage.scss";
import packageApi from "../../apis/package.api";
export default function ListPackage() {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState();
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState("");
  const handleShowModal = (price, packageId) => {
    setShow(true);
    setPrice(price);
    setPackageId(packageId);
  };
  const handleHideModal = () => {
    setShow(false);
  };
  useEffect(() => {
    const loadingPackage = async () => {
      let res = await packageApi.getAllPackage();
      if (res?.data?.packages) {
        setPackages(res.data.packages);
      }
    };
    loadingPackage();
  }, []);
  return (
    <>
      <Header otherPage={true} />
      <h3 style={{ textAlign: "center", margin: "20px 0" }}>
        Danh sách gói dịch vụ
      </h3>
      <div className="row" style={{ padding: "0px 100px" }}>
        {packages &&
          packages.length > 0 &&
          packages.map((item) => {
            return (
              <div className="package-container col-3">
                <div
                  className="bg-top"
                  style={{
                    backgroundImage: `url(https://nhanhoa.com/templates/images/v2/subtract.png)`,
                  }}
                ></div>
                <div className="package-content">
                  <div className="package-top">
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url(https://nhanhoa.com/templates/images/v2/kim_cuong.png)`,
                      }}
                    ></div>
                    <div className="name-price-box">
                      <h4>{item.name}</h4>
                      <p className="price">{item.price} đ/ tháng</p>
                    </div>
                  </div>
                  <ul>
                    {item.features &&
                      item.features.length > 0 &&
                      item.features.map((feature) => {
                        return (
                          <li>
                            <i className="fa-solid fa-circle-check"></i>
                            <strong>{feature.name}</strong>
                          </li>
                        );
                      })}
                  </ul>
                  <button
                    className="btn"
                    onClick={() => handleShowModal(item.price, item.package_id)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <ModalBuyPackage
        show={show}
        handleHideModal={handleHideModal}
        price={price}
        packageId={packageId}
      />
    </>
  );
}
