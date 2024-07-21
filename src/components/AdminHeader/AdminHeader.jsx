import { Link, useNavigate } from "react-router-dom";
import { path } from "../../constants/path";
import "./AdminHeader.scss";
import authApi from "../../apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../redux/slices/UserSlice";

export default function AdminHeader() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const { setProfile } = useAuthContext();
  let handleLogout = async () => {
    try {
      await authApi.logout({ user_id: userInfo.user_id });
      setProfile(null);
    } catch (error) {
      console.log("error:", error);
    }

    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <nav className="topnav-admin shadow navbar-light bg-white d-flex">
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
              <Link className="dropdown-item" to={path.managePackage}>
                Quản lý gói
              </Link>
              <Link className="dropdown-item" to={path.manageFeature}>
                Quản lý tính năng
              </Link>
              <Link className="dropdown-item" to={path.manageSalonAdmin}>
                Quản lí salon
              </Link>
              <Link className="dropdown-item" to={path.manageUserAdmin}>
                Quản lí users
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
              <span>Admin</span>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              {/* <Link className="dropdown-item" to="/">
                Tài khoản
              </Link> */}
              <button className="dropdown-item" onClick={handleLogout}>
                Thoát
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
