import React from 'react'
import "./AdminSalonHeader.scss"
import {Link} from "react-router-dom"
import { path } from '../../../constants/path'
import { useSelector } from "react-redux";
export default function AdminSalonHeader() {
  const userInfo = useSelector(
    (state) => state.userSlice.userInfo
  );
  return (
    <nav className="topnav shadow navbar-light d-flex">
      <div className="navbar-brand">
        <Link to="/admin" className="text-decoration-none">
          <i className="fa-solid fa-car"></i>{" "}
          <span className="mx-2">SALON OTO ADMIN</span>
        </Link>
      </div>
      <div className="nav-right">
        <div className="btn-group mr-auto">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="plus-icon fas fa-plus-circle"></i>
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to={path.manageSalon}>
                Quản lí Salon
              </Link>
              <Link className="dropdown-item" to={path.manageCar}>
                Quản lý xe
              </Link>
            </div>
          </div>
        </div>
        
        <div className="btn-group">
          <div className="dropdown">
            <button
              type="button"
              className="btn dropdown-toggle d-flex justify-content-between align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="fa-solid fa-user mx-2"></i>
              <span>{userInfo.fullname}</span>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/">
                Tài khoản
              </Link>
              <Link className="dropdown-item" to="/">
                Thoát
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
