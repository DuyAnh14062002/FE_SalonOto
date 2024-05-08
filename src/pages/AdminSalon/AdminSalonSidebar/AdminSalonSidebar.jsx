import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../../constants/path";
import "./AdminSalonSidebar.scss";
import purchaseApi from "../../../apis/purchase.api";
import userApi from "../../../apis/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setSubMenu } from "../../../redux/slices/SalonSlice";

export default function AdminSalonSidebar(props) {
  const [listKeyMap, setlistKeyMap] = useState([]);
  const [permissions, setPermission] = useState([]);
  const submenuTran = useSelector(
    (state) => state?.salonSlice?.subMenuTran
  );
  let dispatch = useDispatch()

  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const removeDuplicate = (data) => {
    return data.filter((value, index) => data.indexOf(value) === index);
  };
  const getListKeyMap = (purchasedPackage) => {
    let list = [];
    purchasedPackage.forEach((item) => {
      item.features.forEach((i) => {
        list.push(i.keyMap);
      });
    });
    let listAfter = removeDuplicate(list);
    setlistKeyMap(listAfter);
  };
  useEffect(() => {
    const loading = async () => {
      let res = await purchaseApi.getPurchase();
      if (res?.data?.purchasedPackages) {
        //console.log("purchasePackage : ", res.data.purchasedPackages)
        getListKeyMap(res.data.purchasedPackages);
      }
    };
    loading();
    loadingUser();
    loadingUser();
  }, []);
  const handleShowSubMenu = () =>{
    dispatch(setSubMenu())
  }
  return (
    <div id="page-body" className="d-flex">
      <div id="sidebar">
        <ul id="sidebar-menu">
          <li className="nav-link">
            <Link to="/adminSalon/statistic" className="text-decoration-none">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Thống kê
            </Link>
          </li>
          {listKeyMap &&
            listKeyMap.length > 0 &&
            listKeyMap.map((keyMap) => {
              if (
                keyMap === "f1" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_SL"))
              ) {
                return (
                  <li key={keyMap} className="nav-link">
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
              if (
                keyMap === "f2" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_CAR"))
              ) {
                return (
                  <li key={keyMap} className="nav-link">
                    <Link to={path.manageCar} className="text-decoration-none ">
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý xe
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f3" &&
                permissions &&
                permissions[0] === "OWNER"
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageUser}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý user
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f4" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_APM"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.appointmentSalon}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý lịch hẹn
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f5" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_WRT"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageGuarantee}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý bảo hành
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f6" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_MT"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageMaintenance}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý bảo dưỡng
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f7" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_TR"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                     to={path.manageBuyCar}
                      className="text-decoration-none "
                      onClick={handleShowSubMenu}
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý giao dịch
                    </Link>
                    {submenuTran === true && <ul className="sub-menu-transaction">
                      <li>
                        <Link
                          to={path.manageBuyCar}
                          className="text-decoration-none "
                        >
                          <div className="nav-link-icon d-inline-flex mx-2">
                            <i className="far fa-folder"></i>
                          </div>
                          Giao dịch mua xe
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={path.manageBuyMaintenance}
                          className="text-decoration-none "
                        >
                          <div className="nav-link-icon d-inline-flex mx-2">
                            <i className="far fa-folder"></i>
                          </div>
                          Giao dịch bảo dưỡng
                        </Link>
                      </li>
                    </ul>}
                  </li>
                );
              }
              if (
                keyMap === "f8" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_AC"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageAccessory}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="far fa-folder"></i>
                      </div>
                      Quản lý phụ tùng
                    </Link>
                  </li>
                );
              }
            })}
             <li className="nav-link">
            <Link to={path.manageProcess} className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý quy trình
            </Link>
          </li>
          <li className="nav-link">
            <Link to={path.manageStage} className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý giai đoạn
            </Link>
          </li>
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
