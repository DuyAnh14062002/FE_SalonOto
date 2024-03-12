import { Link } from "react-router-dom";
import "./HomeAdmin.scss";

export default function HomeAdmin() {
  return (
    <div id="content" className="container-fluid">
      <div className="card" style={{ height: "500px" }}>
        <div class="container-fluid">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-secondary">Dashboard</h1>
            <Link to="/" class="btn btn-primary" style={{ cursor: "pointer" }}>
              <i class="fas fa-download fa-sm text-light"></i> Generate Report
            </Link>
          </div>

          <div class="row">
            <div class="col-xl-4 col-md-6 mb-4">
              <div
                class="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div class="h5 mb-0 fw-bold" style={{ color: "#5a5c69" }}>
                        $40,000
                      </div>
                    </div>
                    <div class="col-auto">
                      <i
                        class="fas fa-calendar fa-2x"
                        style={{ color: "#dddfeb" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mb-4">
              <div
                class="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div class="h5 mb-0 fw-bold" style={{ color: "#5a5c69" }}>
                        $40,000
                      </div>
                    </div>
                    <div class="col-auto">
                      <i
                        class="fas fa-calendar fa-2x"
                        style={{ color: "#dddfeb" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mb-4">
              <div
                class="card shadow rounded"
                style={{
                  borderLeft: "0.4rem solid #4e73df",
                  padding: "7px 25px",
                }}
              >
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="fw-bold text-primary text-uppercase mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        Earnings (Monthly)
                      </div>
                      <div class="h5 mb-0 fw-bold" style={{ color: "#5a5c69" }}>
                        $40,000
                      </div>
                    </div>
                    <div class="col-auto">
                      <i
                        class="fas fa-calendar fa-2x"
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
