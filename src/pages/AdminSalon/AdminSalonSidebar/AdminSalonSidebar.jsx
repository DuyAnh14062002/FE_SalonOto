import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../../constants/path";
import "./AdminSalonSidebar.scss";
import purchaseApi from "../../../apis/purchase.api";
export default function AdminSalonSidebar(props) {
  const [listKeyMap, setlistKeyMap] = useState([])
  
  const removeDuplicate = (data) =>{
    return data.filter((value, index) => data.indexOf(value) === index)
  }
  const getListKeyMap = (purchasedPackage) => {
     let list = []
    purchasedPackage.forEach((item => {
      item.features.forEach((i) => {
          list.push(i.keyMap)
      })
    }))
   let listAfter = removeDuplicate(list)
    setlistKeyMap(listAfter)

  }
  useEffect(() => {
    const loading = async () => {
      let res = await purchaseApi.getPurchase();
      if (res?.data?.purchasedPackages) {
        getListKeyMap(res.data.purchasedPackages);
      }
    }
    loading()
  }, [])

  console.log("list keyMap : ", listKeyMap)
  return (
    <div id="page-body" className="d-flex">
      <div id="sidebar">
        <ul id="sidebar-menu">
          {/* <li className="nav-link">
          <Link to="/admin" className="text-decoration-none">
            <div className="nav-link-icon d-inline-flex mx-2">
              <i className="far fa-folder"></i>
            </div>
            Dashboard
          </Link>
        </li> */}
          {listKeyMap &&
            listKeyMap.length > 0 &&
            listKeyMap.map((keyMap) => {
              console.log("key map : ", keyMap);
              if (keyMap === "f1") {
                console.log("oke 1");
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageSalon}
                      className="text-decoration-none"
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý Salon
                    </Link>
                  </li>
                );
              }
              if (keyMap === "f2") {
                console.log("oke 2");
                return (
                  <li className="nav-link">
                    <Link to={path.manageCar} className="text-decoration-none ">
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý xe
                    </Link>
                  </li>
                );
              }
            })}
          <li className="nav-link">
            <Link to="/" className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Trở về trang chủ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
