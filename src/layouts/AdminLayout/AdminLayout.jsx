import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminLayout.scss";
export default function AdminLayout({ children }) {
  return (
    <div id="wrapper" className="nav-fixed">
      <AdminHeader />
      <AdminSidebar />
      <div id="wp-content">
        {children}
        <Outlet />
      </div>
    </div>
  );
}
