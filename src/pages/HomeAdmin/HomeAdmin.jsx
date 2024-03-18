import { Link } from "react-router-dom";
import "./HomeAdmin.scss";

export default function HomeAdmin() {
  return (
    <div id="content" className="container-fluid">
      <div className="card" style={{ height: "500px" }}>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-secondary">Dashboard</h1>
            <Link
              to="/"
              className="btn btn-primary"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-download fa-sm text-light"></i> Generate
              Report
            </Link>
          </div>

          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div
                className="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div
                        className="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div
                        className="h5 mb-0 fw-bold"
                        style={{ color: "#5a5c69" }}
                      >
                        $40,000
                      </div>
                    </div>
                    <div className="col-auto">
                      <i
                        className="fas fa-calendar fa-2x"
                        style={{ color: "#dddfeb" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div
                className="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div
                        className="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div
                        className="h5 mb-0 fw-bold"
                        style={{ color: "#5a5c69" }}
                      >
                        $40,000
                      </div>
                    </div>
                    <div className="col-auto">
                      <i
                        className="fas fa-calendar fa-2x"
                        style={{ color: "#dddfeb" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div
                className="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div
                        className="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div
                        className="h5 mb-0 fw-bold"
                        style={{ color: "#5a5c69" }}
                      >
                        $40,000
                      </div>
                    </div>
                    <div className="col-auto">
                      <i
                        className="fas fa-calendar fa-2x"
                        style={{ color: "#dddfeb" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
