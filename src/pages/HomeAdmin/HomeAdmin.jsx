import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import adminApi from "../../apis/admin.api";
import { formatCurrency, formatDate } from "../../utils/common";

Chart.register(CategoryScale);
export default function HomeAdmin() {
  const startYear = 2020; // Năm bắt đầu
  const currentYear = new Date().getFullYear(); // Năm hiện tại
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [statistic, setStatistic] = useState({});

  useEffect(() => {
    const fetchStatistic = async () => {
      const res = await adminApi.getStatistic({
        fromDate: `${selectedYear}-01-01`,
      });
      setStatistic(res.data);
    };
    fetchStatistic();
  }, [selectedYear]);
  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  console.log(statistic);
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }
  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let sortedData = [];
  if (statistic.months) {
    sortedData = Object.entries(statistic.months)
      .sort((a, b) => a[1].value - b[1].value) // Sắp xếp theo thứ tự tháng
      .map(([key, value]) => value.total); // Lấy các giá trị total
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Doanh thu năm ${selectedYear} (VND)`,
        data: sortedData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 0, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(255, 255, 0, 0.2)",
          "rgba(0, 255, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 0, 0)",
          "rgb(0, 255, 0)",
          "rgb(0, 0, 255)",
          "rgb(255, 255, 0)",
          "rgb(0, 255, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topSellingPackageData = {
    labels: statistic?.topPackages?.slice(0, 5)?.map((item) => item.name),
    datasets: [
      {
        label: "Số lượng xe bán",
        data: statistic?.topPackages?.slice(0, 5)?.map((item) => item.count),
        backgroundColor: [
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9966",
          "#66CCCC",
          "#FF99CC",
          "#FF6633",
          "#99CC00",
        ],
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
      },
    ],
  };
  console.log(statistic);
  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="container-fluid">
          <div className="mb-4">
            <h1 className="h3 mb-0 text-secondary">Doanh thu</h1>
            <div className="row">
              <div className="col-xl-4 col-md-6 mt-4">
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
                          Tổng doanh thu
                        </div>
                        <div
                          className="h5 mb-0 fw-bold"
                          style={{ color: "#5a5c69" }}
                        >
                          {formatCurrency(statistic?.purchases?.total || 0)}
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

              <div className="col-xl-4 col-md-6 mt-4">
                <div
                  className="card shadow rounded"
                  style={{
                    borderLeft: "0.4rem solid #1cc88a",
                    padding: "7px 25px",
                  }}
                >
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div
                          className="fw-bold text-uppercase mb-1"
                          style={{ fontSize: ".9rem", color: "#1cc88a" }}
                        >
                          Doanh thu trung bình mỗi tháng
                        </div>
                        <div
                          className="h5 mb-0 fw-bold"
                          style={{ color: "#5a5c69" }}
                        >
                          {formatCurrency(statistic?.avg || 0)}
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
            <div className="row">
              <div className="col-8">
                <h2 className="fs-4 mb-0 text-secondary mt-4">
                  Biểu đồ doanh thu theo năm
                </h2>
                <div
                  className="form-group mt-3 d-flex align-items-center"
                  style={{ maxWidth: "200px" }}
                >
                  <label
                    htmlFor="year"
                    className="form-label mt-1"
                    style={{ fontSize: "18px", maxWidth: "100px" }}
                  >
                    Chọn năm:
                  </label>
                  <select
                    className="form-select mx-2"
                    value={selectedYear}
                    onChange={handleChangeYear}
                    style={{ maxWidth: "90px", cursor: "pointer" }}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <Bar
                  data={data}
                  type="bar"
                  title="Doanh thu theo tháng"
                  options={{}}
                />
              </div>
              <div className="col-4 text-center">
                <h2 className="fs-4 text-secondary text-center mt-4">
                  Biểu đồ top các gói salon bán chạy nhất
                </h2>
                <div className="row mt-5">
                  <div className="col-12">
                    <Pie data={topSellingPackageData} />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <h2 className="fs-4 mb-4 text-center text-secondary mt-4">
                  Danh sách các đơn hàng gần đây
                </h2>
                <div className="">
                  <table class="table table-hover border">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          #
                        </th>
                        <th scope="col" className="text-center">
                          Khách hàng
                        </th>
                        <th scope="col" className="text-center">
                          Số điện thoại
                        </th>
                        <th scope="col">Tên gói</th>
                        <th scope="col">Giá gói</th>
                        <th scope="col">Ngày mua</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistic?.purchases?.purchases?.length > 0 ? (
                        statistic.purchases.purchases.map((purchase, index) => {
                          return (
                            <tr>
                              <th scope="row" className="text-center">
                                {++index}
                              </th>
                              <td className="text-center">
                                {purchase?.user?.fullname || "Default name"}{" "}
                              </td>
                              <td className="text-center">
                                {purchase?.user?.phone}
                              </td>
                              <td>{purchase?.package.name}</td>
                              <td>{formatCurrency(purchase?.package.price)}</td>
                              <td>
                                {formatDate(new Date(purchase.purchaseDate))}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="fst-italic">
                            Không có dữ liệu nào
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* <nav className="d-flex justify-content-center ">
                    <ul className="pagination">
                      <li className="page-item">
                        <button
                          className="page-link"
                          to="#"
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="/">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="/">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="/">
                          3
                        </Link>
                      </li>

                      <li className="page-item" id="nextPageButton">
                        <button className="page-link" to="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
