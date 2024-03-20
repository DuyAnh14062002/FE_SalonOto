import React from 'react'
import AdminSalonSidebar from '../AdminSalonSidebar'
import { Outlet } from "react-router-dom";
import AdminSalonHeader from '../AdminSalonHeader/AdminSalonHeader';
import "./AdminSalonLayout.scss"

export default function AdminSalonLayout({ children }) {
  return (
    <div>
      <AdminSalonHeader/>
      <AdminSalonSidebar/>
      <div id="wp-content">
        {children}
        <Outlet />
      </div>
    </div>
  )
}
