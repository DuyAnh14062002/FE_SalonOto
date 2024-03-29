import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { path } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
import authApi from "../../apis/auth.api";
import purchaseApi from "../../apis/purchase.api";
export default function Header(props) {
  const { otherPage } = props;
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let handleLogout = async () => {
    try {
      await authApi.logout({ user_id: userInfo.user_id });
    } catch (error) {
      console.log("error:", error);
    }

    dispatch(logoutUser());
    navigate("/login");
  };
  useEffect(() => {
    const loading = async () => {
      let res = await purchaseApi.getPurchase();
      if (res?.data?.purchasedPackages) {
        setPurchasedPackages(res.data.purchasedPackages);
      }
    };
    loading();
  }, []);
  return otherPage === true ? (
    <nav style={{ backgroundColor: "rgb(1 37 255 / 70%)", padding: "5px 5px" }}>
      <div className="nav__logo">
        <img
          src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
          alt="logo"
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
      </div>
      <ul className="nav__links">
        <li className="link">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="link">
          <Link to={path.ListPackage}>Gói dịch vụ</Link>
        </li>
        <li className="link">
          <Link to="/listSalon">Salon Oto</Link>
        </li>
        <li className="link">
          <Link to="/">Liên hệ</Link>
        </li>
        <li className="link">
          <Link to="/">Tin tức</Link>
        </li>
        {purchasedPackages && purchasedPackages.length > 0 && (
          <li className="link">
            <Link to={path.adminSalon}>Quản lý</Link>
          </li>
        )}
        <li className="link">
          <Link to="/appointment">Quản lý lịch hẹn</Link>
        </li>
      </ul>
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" />
        <span>
          <i className="ri-search-line"></i>
        </span>
      </div>
      <Link
        to={path.profile}
        className="account-profile"
        style={{ textDecoration: "none", position: "relative" }}
      >
        <span className="icon-user">
          <i className="ri-user-3-fill"></i>
        </span>
        <span style={{ fontSize: "15px" }}>
          {userInfo?.fullname || userInfo?.username}
        </span>
        <div className="profile-arrow">
          <div className="virtual_class"></div>
          <div className="arrow position-absolute"></div>
          <div className="position-absolute sub-profile">
            <Link to={path.profile}>Thông tin cá nhân</Link>
            <Link onClick={handleLogout}>Đăng xuất</Link>
          </div>
        </div>
      </Link>
    </nav>
  ) : (
    <nav>
      <div className="nav__logo">
        <img
          src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
          alt="logo"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <ul className="nav__links">
        <li className="link">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="link">
          <Link to={path.ListPackage}>Gói dịch vụ</Link>
        </li>
        <li className="link">
          <Link to="/listSalon">Salon Oto</Link>
        </li>
        <li className="link">
          <Link to="/">Liên hệ</Link>
        </li>
        <li className="link">
          <Link to="/">Tin tức</Link>
        </li>
        {purchasedPackages && purchasedPackages.length > 0 && (
          <li className="link">
            <Link to={path.adminSalon}>Quản lý</Link>
          </li>
        )}
        <li className="link">
          <Link to="/appointment">Quản lý lịch hẹn</Link>
        </li>
      </ul>
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" />
        <span>
          <i className="ri-search-line"></i>
        </span>
      </div>
      <Link
        to={path.profile}
        className="account-profile"
        style={{ textDecoration: "none", position: "relative" }}
      >
        <span className="icon-user">
          <i className="ri-user-3-fill"></i>
        </span>
        <span style={{ fontSize: "15px" }}>
          {userInfo?.fullname || userInfo?.username}
        </span>

        <div className="profile-arrow">
          <div className="virtual_class"></div>
          <div className="arrow position-absolute"></div>
          <div className="position-absolute sub-profile">
            <Link to={path.profile}>Thông tin cá nhân</Link>
            <Link onClick={handleLogout}>Đăng xuất</Link>
          </div>
        </div>
      </Link>
    </nav>
  );
}
