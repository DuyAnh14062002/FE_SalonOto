import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import salonApi from "../../../apis/salon.api";
import { formatCurrency } from "../../../utils/common";
Chart.register(CategoryScale);
export default function Statistic() {
  const startYear = 2024; // Năm bắt đầu
  const currentYear = new Date().getFullYear(); // Năm hiện tại
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [salon, setSalon] = useState({});
  const [statistic, setStatistic] = useState({});
  const [topBestSelling, setTopBestSelling] = useState({});
  console.log("topBestSelling", topBestSelling);
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  useEffect(() => {
    fetchDataSalon();
  }, []);
  useEffect(() => {
    const fetchStatistic = async () => {
      const res = await salonApi.getStatistic({
        fromDate: `${selectedYear}-01-01`,
        salonId: salon.salon_id,
      });
      setStatistic(res.data);
    };
    const fetchTopBestSellingData = async () => {
      const res = await salonApi.getTop({
        fromDate: `${selectedYear}-01-01`,
        salonId: salon.salon_id,
      });
      setTopBestSelling(res.data);
    };
    fetchStatistic();
    fetchTopBestSellingData();
  }, [selectedYear, salon.salon_id]);
  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

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
  if (statistic.year) {
    sortedData = Object.entries(statistic.year)
      .sort((a, b) => a[1].value - b[1].value)
      .map(([key, value]) => value.total);
  }

  const statisticData = {
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
  console.log("statistic", statistic);
  const topSellingCarData = {
    labels: topBestSelling?.buyCarTop?.slice(0, 5)?.map((car) => car.name),
    datasets: [
      {
        label: "Số lượng xe bán",
        data: topBestSelling?.buyCarTop
          ?.slice(0, 5)
          ?.map((car) => car.quantitySold),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
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

  const topAccessoryData = {
    labels: topBestSelling?.accessoriesTop
      ?.slice(0, 10)
      ?.map((accessory) => accessory.name.name),
    datasets: [
      {
        label: "Số lượng phụ kiện",
        data: topBestSelling?.accessoriesTop
          ?.slice(0, 10)
          ?.map((accessory) => accessory.quantitySold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const maintenanceData = {
    labels: topBestSelling?.MTTopDb?.slice(0, 5)?.map(
      (maintenance) => maintenance.name.name
    ),
    datasets: [
      {
        label: "Số lượng",
        data: topBestSelling?.MTTopDb?.slice(0, 5)?.map(
          (maintenance) => maintenance.quantitySold
        ),
        backgroundColor: [
          "#FF7F50",
          "#20B2AA",
          "#9370DB",
          "#32CD32",
          "#FFD700",
        ],
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="container-fluid">
          <div className="mb-4">
            <h1 className="h3 mb-0 text-secondary">Thống kê</h1>
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
                          {formatCurrency(statistic?.total || 0)}
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
                          className="fas fa-dollar-sign fa-2x"
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
                    borderLeft: "0.4rem solid #f6c23e",
                    padding: "7px 25px",
                  }}
                >
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div
                          className="fw-bold text-uppercase mb-1"
                          style={{ fontSize: ".9rem", color: "#f6c23e" }}
                        >
                          Tổng số xe bán được
                        </div>
                        <div
                          className="h5 mb-0 fw-bold"
                          style={{ color: "#5a5c69" }}
                        >
                          {statistic?.buyCars?.invoiceDb.length || 0}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fas fa-clipboard-list fa-2x"
                          style={{ color: "#dddfeb" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-8">
                <h2 className="fs-4 text-secondary text-center ">
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
                  data={statisticData}
                  type="bar"
                  title="Doanh thu theo tháng"
                  options={{}}
                />
              </div>

              <div className="col-4 text-center">
                <h2 className="fs-4 text-secondary text-center">
                  Biểu đồ top các xe bán chạy nhất
                </h2>
                <div className="row mt-5">
                  <div className="col-12">
                    <Pie data={topSellingCarData} />
                  </div>
                </div>
              </div>
              <div className="col-8 mt-5">
                <h2 className="fs-4 text-secondary text-center ">
                  Biểu đồ top các link kiện được dùng nhiều nhất
                </h2>
                <Bar
                  data={topAccessoryData}
                  options={{
                    indexAxis: "y",
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>

              <div className="col-4 text-center mt-5">
                <h2 className="fs-4 text-secondary text-center">
                  Biểu đồ top các dịch vụ bảo dưỡng được sử dụng nhiều nhất
                </h2>
                <div className="row">
                  <div className="col-12">
                    <Pie data={maintenanceData} />
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
