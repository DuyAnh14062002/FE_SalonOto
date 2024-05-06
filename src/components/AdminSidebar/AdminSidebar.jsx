import React from "react";
import { Link } from "react-router-dom";
import { path } from "../../constants/path";

export default function AdminSidebar() {
  return (
    <div id="page-body" className="d-flex">
      <div id="sidebar" className="bg-white">
        <ul id="sidebar-menu">
          <li className="nav-link">
            <Link to="/admin" className="text-decoration-none">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Thống kê
            </Link>
          </li>
          <li className="nav-link">
            <Link to={path.managePackage} className="text-decoration-none">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý gói
            </Link>
          </li>
          <li className="nav-link">
            <Link to={path.manageFeature} className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý tính năng
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/" className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý tin tức
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/" className="text-decoration-none ">
              <div className="nav-link-icon d-inline-flex mx-2">
                <i className="far fa-folder"></i>
              </div>
              Quản lý users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
