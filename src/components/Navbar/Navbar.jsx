import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar" style={{ display: "block" }}>
      {user ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Salon oto
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarText"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
              </ul>
              <div className="d-flex justify-content-end">
                <span className="navbar-text me-3">{user.displayName}</span>
                <button classNameName="link" to="/logout">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <Link classNameName="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
