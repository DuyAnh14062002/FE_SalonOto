import React from 'react'
import { Link } from "react-router-dom";
import { path } from "../../../constants/path";
import "./AdminSalonSidebar.scss"
export default function AdminSalonSidebar() {
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
        <li className="nav-link">
          <Link to={path.manageSalon} className="text-decoration-none">
            <div className="nav-link-icon d-inline-flex mx-2">
              <i className="far fa-folder"></i>
            </div>
            Quản lý Salon
          </Link>
        </li>
        <li className="nav-link">
          <Link to={path.manageCar} className="text-decoration-none ">
            <div className="nav-link-icon d-inline-flex mx-2">
              <i className="far fa-folder"></i>
            </div>
            Quản lý xe
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
}
