import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import salonApi from "../../../apis/salon.api";
import {
  formatCurrency,
  formatDateDetailShortened,
} from "../../../utils/common";
import dealerApi from "../../../apis/dealer.api";
import { PaginationControl } from "react-bootstrap-pagination-control";
Chart.register(CategoryScale);

const LIMIT = 5;
export default function Statistic() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [salon, setSalon] = useState({});
  const [statistic, setStatistic] = useState({});
  const [topBestSelling, setTopBestSelling] = useState({});
  const [activeButton, setActiveButton] = useState("revenue");
  const [statType, setStatType] = useState("month");
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const quarters = [1, 2, 3, 4];
  const [selectedMonthOrQuarter, setSelectedMonthOrQuarter] = useState("1");
  const [satistics, setSatistics] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  console.log("statistic", statistic);
  const handleChangeStatType = (event) => {
    setStatType(event.target.value);
  };
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
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

    fetchStatistic();
  }, [selectedYear, salon.salon_id]);
  useEffect(() => {
    const fetchTopBestSellingData = async (page) => {
      let res;
      if (statType === "month") {
        res = await salonApi.getTop(
          {
            year: `${selectedYear}`,
            months: selectedMonthOrQuarter,
            salonId: salon.salon_id,
          },
          page,
          LIMIT
        );
      } else {
        res = await salonApi.getTop(
          {
            year: `${selectedYear}`,
            quater: selectedMonthOrQuarter,
            salonId: salon.salon_id,
          },
          page,
          LIMIT
        );
      }
      setTopBestSelling(res.data);
      setTotalPage(res.data.carDb.total_page);
    };
    fetchTopBestSellingData(page);
  }, [selectedYear, selectedMonthOrQuarter, statType, salon.salon_id, page]);
  const loadingSatisyicDealer = async () => {
    try {
      let res = await dealerApi.statisticDealer();
      if (res?.data?.transaction) {
        setSatistics(res.data.transaction);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadingSatisyicDealer();
  }, []);
  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }
  const labelsMonth = [
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
  const labelsQuarter = ["Quý 1", "Quý 2", "Quý 3", "Quý 4"];
  let sortedData = [];
  if (statistic.year) {
    sortedData = Object.entries(statistic.year)
      .sort((a, b) => a[1].value - b[1].value)
      .map(([key, value]) => value.total);
  }

  const statisticData = {
    labels: statType === "month" ? labelsMonth : labelsQuarter,
    datasets:
      statType === "month"
        ? [
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
          ]
        : [
            {
              label: `Doanh thu năm ${selectedYear} (VND)`,
              data: statistic.rsQuater,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
              ],
              borderWidth: 1,
            },
          ],
  };

  const topSellingCarData = {
    labels: topBestSelling?.buyCarTop?.slice(0, 10)?.map((car) => car.name),
    datasets: [
      {
        label: "Số lượng xe bán",
        data: topBestSelling?.buyCarTop
          ?.slice(0, 10)
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
    labels: topBestSelling.accessoriesTop
      ?.slice(0, 10)
      ?.map((accessory) => accessory?.name?.name),
    datasets: [
      {
        label: "Số lượng phụ kiện",
        data: topBestSelling.accessoriesTop
          ?.slice(0, 10)
          ?.map((accessory) => accessory?.quantitySold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const maintenanceData = {
    labels: topBestSelling?.MTTopDb?.slice(0, 10)?.map(
      (maintenance) => maintenance.name.name
    ),
    datasets: [
      {
        label: "Số lượng",
        data: topBestSelling?.MTTopDb?.slice(0, 10)?.map(
          (maintenance) => maintenance.quantitySold
        ),
        backgroundColor: [
          "#FF7F50",
          "#20B2AA",
          "#9370DB",
          "#32CD32",
          "#FFD700",
          "#FF6347",
          "#4682B4",
          "#8A2BE2",
          "#00CED1",
          "#FF4500",
        ],
        borderColor: [
          "rgba(255, 127, 80, 0.3)",
          "rgba(32, 178, 170, 0.3)",
          "rgba(147, 112, 219, 0.3)",
          "rgba(50, 205, 50, 0.3)",
          "rgba(255, 215, 0, 0.3)",
          "rgba(255, 99, 71, 0.3)",
          "rgba(70, 130, 180, 0.3)",
          "rgba(138, 43, 226, 0.3)",
          "rgba(0, 206, 209, 0.3)",
          "rgba(255, 69, 0, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChangeMonthOrQuarter = (event) => {
    setSelectedMonthOrQuarter(event.target.value);
  };
  console.log("topBestSelling", topBestSelling);
  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="container-fluid">
          <div className="mb-4">
            <h1 className="h3 mb-0 text-secondary">Thống kê</h1>

            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn text-white"
                style={{
                  background:
                    activeButton === "revenue" ? "#2a47cc" : "#4463ee",
                }}
                onClick={() => handleButtonClick("revenue")}
              >
                Thống kê doanh thu
              </button>
              <button
                className="btn mx-3 text-white"
                style={{
                  background: activeButton === "dealer" ? "#2a47cc" : "#4463ee",
                }}
                onClick={() => handleButtonClick("dealer")}
              >
                Thống kê hoa tiêu
              </button>
              <button
                className="btn mx-3 text-white"
                style={{
                  background: activeButton === "other" ? "#2a47cc" : "#4463ee",
                }}
                onClick={() => handleButtonClick("other")}
              >
                Thống kê khác
              </button>
            </div>
            {activeButton === "revenue" && (
              <>
                <div className="row">
                  <div className="form-group mt-4 d-flex justify-content-center align-items-center">
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
                    {selectedYear && (
                      <div className="form-group d-flex align-items-center mx-3">
                        <label
                          htmlFor="statType"
                          className="mt-1"
                          style={{ fontSize: "18px", width: "103px" }}
                        >
                          Loại thống kê:
                        </label>
                        <select
                          className="form-select mx-2"
                          value={statType}
                          onChange={handleChangeStatType}
                          style={{ cursor: "pointer", width: "140px" }}
                        >
                          <option value="month">Theo tháng</option>
                          <option value="quarter">Theo quý</option>
                        </select>
                      </div>
                    )}
                  </div>
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
                              Doanh thu trung bình tháng
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
                              {statistic?.totalCarSold}
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
                <div className="row mt-4">
                  <div className="col-1"></div>
                  <div className="col-10">
                    <h2 className="fs-4 text-secondary text-center my-2">
                      Biểu đồ doanh thu{" "}
                      {statType === "month" ? "theo tháng" : "theo quý"} năm{" "}
                      {selectedYear}
                    </h2>
                    <Bar
                      data={statisticData}
                      type="bar"
                      title="Doanh thu theo tháng"
                      options={{}}
                    />
                  </div>
                  <div className="col-1"></div>
                </div>
              </>
            )}
            {activeButton === "other" && (
              <>
                <div className="row">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="form-group mt-4 d-flex justify-content-center align-items-center">
                      <label
                        htmlFor="year"
                        className="form-label mt-1"
                        style={{ fontSize: "18px", width: "87px" }}
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
                    {selectedYear && (
                      <div className="form-group mt-4 d-flex align-items-center mx-3">
                        <label
                          htmlFor="statType"
                          className="form-label mt-1"
                          style={{ fontSize: "18px", width: "103px" }}
                        >
                          Loại thống kê:
                        </label>
                        <select
                          className="form-select  mx-2"
                          value={statType}
                          onChange={handleChangeStatType}
                          style={{ cursor: "pointer", width: "140px" }}
                        >
                          <option value="month">Theo tháng</option>
                          <option value="quarter">Theo quý</option>
                        </select>
                      </div>
                    )}
                    {selectedYear && statType && (
                      <div className="form-group mt-4 d-flex align-items-center">
                        <label
                          htmlFor="monthOrQuarter"
                          className="form-label mt-1"
                          style={{ fontSize: "18px", width: "90px" }}
                        >
                          {statType === "month" ? "Chọn tháng:" : "Chọn quý:"}
                        </label>
                        <select
                          className="form-select mx-2"
                          value={selectedMonthOrQuarter}
                          onChange={handleChangeMonthOrQuarter}
                          style={{ cursor: "pointer", width: "140px" }}
                        >
                          <option value="">
                            {statType === "month" ? "Chọn tháng" : "Chọn quý"}
                          </option>
                          {statType === "month"
                            ? months.map((month) => (
                                <option key={month} value={month}>
                                  Tháng {month}
                                </option>
                              ))
                            : quarters.map((quarter) => (
                                <option key={quarter} value={quarter}>
                                  Quý {quarter}
                                </option>
                              ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-8 text-center">
                        <h2 className="fs-4 text-secondary text-center">
                          Biểu đồ top các xe bán chạy nhất
                        </h2>
                        <div className="row mt-2">
                          <div className="col-12">
                            <Bar data={topSellingCarData} type="bar" />
                          </div>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-1"></div>
                      <div className="col-10">
                        <h2 className="fs-4 mb-4 text-center text-secondary mt-4">
                          Danh sách các xe đã bán trong{" "}
                          {statType === "month" ? "tháng" : "quý"}{" "}
                          {selectedMonthOrQuarter} năm {selectedYear}
                        </h2>
                        <div className="">
                          <table className="table table-hover border">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  STT
                                </th>
                                <th scope="col" className="text-center">
                                  Mã xe
                                </th>
                                <th scope="col" className="text-center">
                                  Tên xe
                                </th>

                                <th scope="col" className="text-center">
                                  Dòng xe
                                </th>

                                <th scope="col" className="text-center">
                                  Giá
                                </th>
                                <th scope="col" className="text-center">
                                  Năm sản xuất
                                </th>
                                <th scope="col" className="text-center">
                                  Ngày bán
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {topBestSelling?.carDb?.data?.length > 0 ? (
                                topBestSelling?.carDb?.data?.map(
                                  (car, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        style={{
                                          background: "rgb(247 247 247)",
                                        }}
                                      >
                                        <td className="text-center">
                                          {LIMIT * (page - 1) + (index + 1)}
                                        </td>
                                        <td className="text-center">
                                          {car.car_id.slice(0, 6)}
                                        </td>
                                        <td className="text-center">
                                          {car.name}
                                        </td>
                                        <td className="text-center">
                                          {car.type}
                                        </td>

                                        <td className="text-center">
                                          {formatCurrency(car.price)}
                                        </td>
                                        <td className="text-center">
                                          {car.origin}
                                        </td>
                                        <td className="text-center">
                                          {formatDateDetailShortened(
                                            car.date_out
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              ) : (
                                <tr>
                                  <td colSpan="7" className="fst-italic">
                                    Không có dữ liệu nào
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          {topBestSelling?.carDb?.data?.length && (
                            <div className="d-flex justify-content-center ">
                              <PaginationControl
                                page={page}
                                total={totalPage * LIMIT || 0}
                                limit={LIMIT}
                                changePage={(page) => {
                                  setPage(page);
                                }}
                                ellipsis={1}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-8 mt-5">
                        <h2 className="fs-4 text-secondary text-center ">
                          Biểu đồ top các link kiện được dùng nhiều nhất
                        </h2>
                        <Bar
                          data={topAccessoryData}
                          type="bar"
                          options={{
                            indexAxis: "y",
                          }}
                        />
                      </div>
                      <div className="col-2"></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-8 text-center mt-5">
                        <h2 className="fs-4 text-secondary text-center">
                          Biểu đồ top các dịch vụ bảo dưỡng được sử dụng nhiều
                          nhất
                        </h2>
                        <div className="row">
                          <div className="col-12">
                            <Bar data={maintenanceData} type="bar" />
                          </div>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeButton === "dealer" && (
              <div>
                {/* <h2 style={{marginTop: "20px"}} className='text-center'>Thống Kê hoa tiêu</h2> */}
                <div className="satistic-dealer-container">
                  <div className="satistic-dealer-item">
                    <div className="satistic-dealer-number">
                      {satistics?.totals?.totalNumOfCompletedTran
                        ? satistics?.totals?.totalNumOfCompletedTran
                        : 0}
                    </div>
                    <div className="satistic-dealer-title">
                      Số giao dịch hoàn thành
                    </div>
                  </div>
                  <div className="satistic-dealer-item">
                    <div className="satistic-dealer-comission">
                      {satistics?.totals?.totalAmount
                        ? formatCurrency(satistics?.totals?.totalAmount)
                        : formatCurrency(0)}
                    </div>
                    <div className="satistic-dealer-title">
                      Tổng số tiền đã chi cho Hoa tiêu
                    </div>
                  </div>
                </div>
                <h2 style={{ marginTop: "35px" }} className="text-center">
                  Danh sách các Hoa tiêu đã giao dịch
                </h2>
                <table className="table mt-4 table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        STT
                      </th>
                      <th scope="col">Tên Salon</th>
                      <th scope="col" className="text-center">
                        Số điện thoại
                      </th>
                      <th scope="col" className="text-center">
                        Số giao dịch hoàn thành
                      </th>
                      <th scope="col" className="text-center">
                        Số tiền hoa hồng đã chi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {satistics?.data?.length > 0
                      ? satistics.data.map((item) => {
                          return (
                            <tr style={{ background: "rgb(247 247 247)" }}>
                              <td className="text-center">1</td>
                              <td>{item?.user?.name}</td>
                              <td className="text-center">
                                {item?.user?.phone}
                              </td>
                              <td className="text-center">
                                {item.numOfCompletedTran}
                              </td>
                              <td className="text-center">
                                {item.amount ? formatCurrency(item.amount) : ""}
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
