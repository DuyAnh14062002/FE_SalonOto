import React, { useEffect, useState } from "react";
import "./ListSalonOto.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import salonApi from "../../apis/salon.api";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 8;

export default function ListSalonOto() {
  const navigate = useNavigate();
  const [listSalon, setListSalon] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const NavigateSalon = (id) => {
    navigate(`/salonOto/${id}`);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    console.log("searchValue : ", searchValue);
    debounce(() => {
      setPage(1);
      loading(1, searchValue);
    }, 1000);
  };
  const loading = async (page, search) => {
    let res = await salonApi.getAllSalon(page, LIMIT, search);
    if (res?.data?.salons?.salons) {
      setListSalon(res.data.salons.salons);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    loading(page, search);
  }, [page, search]);
  return (
    <div>
      <Header otherPage={true} />
      <div>
        <section className="listSalon section">
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div className="row g-2">
              <div className="col-lg-12">
                <div className="section-title mt-5">
                  <h2 className="text-center fw-bold text-uppercase my-5">
                    Danh sách các Salon
                  </h2>
                  <div className="d-flex align-items-center justify-content-end mb-4">
                    <span
                      style={{
                        width: "80px",
                        fontWeight: "bold",
                        color: "#0015ff",
                      }}
                    >
                      Tìm kiếm:
                    </span>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="form-control"
                      style={{ width: "20%" }}
                      placeholder="Nhập tên salon"
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row g-4"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {listSalon &&
                listSalon.length > 0 &&
                listSalon.map((salon) => {
                  return (
                    <div
                      key={salon.salon_id}
                      className="col-3"
                      onClick={() => NavigateSalon(salon.salon_id)}
                    >
                      <div
                        className="salon-container"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="image-container"
                          style={{ flexShrink: 0 }}
                        >
                          <span class="highlight-label">Độc quyền</span>
                          <div
                            className="image-salon"
                            style={{
                              backgroundImage: `url(${salon.image})`,
                            }}
                          ></div>
                        </div>
                        <div className="salon-body">
                          <div
                            className="salon-content text-center"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div className="name-salon">{salon.name}</div>
                            <p className="address mt-4">{salon.address}</p>
                            <button
                              className="btn-detail mt-4 mx-auto"
                              onClick={() => NavigateSalon(salon.salon_id)}
                              title="Xem chi tiết"
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {listSalon && listSalon.length > 0 && (
              <div className="d-flex justify-content-center mt-4">
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
        </section>
      </div>
    </div>
  );
}
