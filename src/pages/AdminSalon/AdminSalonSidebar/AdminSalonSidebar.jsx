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
  const submenuTran = useSelector((state) => state?.salonSlice?.subMenuTran);
  let dispatch = useDispatch();

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
  const handleShowSubMenu = () => {
    dispatch(setSubMenu());
  };
  console.log("submenuTran", submenuTran);
  return (
    <div id="page-body" className="d-flex">
      <div id="sidebar">
        <ul id="sidebar-menu">
          <li className="nav-link">
            <Link to="/adminSalon/statistic" className="text-decoration-none">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="fa-solid fa-chart-simple"></i>
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
                        <i className="fa-solid fa-list-check"></i>
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
                        <i className="fa-solid fa-car"></i>
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
                        <i className="fa-solid fa-user"></i>
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
                        <i className="fa-solid fa-calendar-check"></i>
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
                        <i className="fa-solid fa-award"></i>
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
                        <i className="fa-solid fa-screwdriver-wrench"></i>
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
                  <li className="nav-link position-relative">
                    <Link
                      to={path.manageBuyCar}
                      className="text-decoration-none"
                      onClick={handleShowSubMenu}
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-tent-arrow-left-right"></i>
                      </div>
                      <span>Quản lý giao dịch</span>
                      {submenuTran === false ? (
                        <i className="transaction fas fa-angle-right"></i>
                      ) : (
                        <i className="transaction fas fa-angle-down"></i>
                      )}
                    </Link>
                    {submenuTran === true && (
                      <ul className="sub-menu-transaction">
                        <li>
                          <Link
                            to={path.manageBuyCar}
                            className="text-decoration-none "
                          >
                            <div className="d-inline-flex mx-2">
                              <i className="fa-solid fa-circle"></i>
                            </div>
                            Giao dịch mua xe
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={path.manageBuyMaintenance}
                            className="text-decoration-none "
                          >
                            <div className="d-inline-flex mx-2">
                              <i className="fa-solid fa-circle"></i>
                            </div>
                            Giao dịch bảo dưỡng
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={path.manageDealerProcess}
                            className="text-decoration-none "
                          >
                            <div className="nav-link-icon d-inline-flex mx-2">
                              <i className="fa-solid fa-circle"></i>
                            </div>
                            Giao dịch hoa tiêu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={path.manageAccessoryTransaction}
                            className="text-decoration-none "
                          >
                            <div className="nav-link-icon d-inline-flex mx-2">
                              <i className="fa-solid fa-circle"></i>
                            </div>
                            Giao dịch phụ tùng
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              }
              if (
                keyMap === "f8" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_ASS"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageAccessory}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-door-open"></i>
                      </div>
                      Quản lý phụ tùng
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f9" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_PC"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageProcess}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-table-list"></i>
                      </div>
                      Quản lý quy trình
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f10" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_DC"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.manageStage}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-bars-staggered"></i>
                      </div>
                      Quản lý giai đoạn
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f11" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_PRM"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.managePromotion}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-percent"></i>
                      </div>
                      Quản lý Khuyến mãi
                    </Link>
                  </li>
                );
              }
              if (
                keyMap === "f12" &&
                permissions &&
                (permissions[0] === "OWNER" || permissions?.includes("R_PYM"))
              ) {
                return (
                  <li className="nav-link">
                    <Link
                      to={path.managePayment}
                      className="text-decoration-none "
                    >
                      <div className="nav-link-icon d-inline-flex mx-2">
                        <i className="fa-solid fa-money-bill-wave"></i>
                      </div>
                      Quản lý thanh toán
                    </Link>
                  </li>
                );
              }
            })}

          <li className="nav-link">
            <Link to="/" className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="fa-solid fa-arrow-rotate-left"></i>
              </div>
              Trở về trang chủ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
