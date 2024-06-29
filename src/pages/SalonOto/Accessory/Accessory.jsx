import { useEffect, useState } from "react";
import "./Accessory.scss";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
import salonApi from "../../../apis/salon.api";
import HeaderSalon from "../../../components/Header/HeaderSalon";
import AccessoryApi from "../../../apis/accessory.api";
import { formatCurrency } from "../../../utils/common";
const LIMIT = 12;

export default function Accessory() {
  const [salon, setSalon] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [accessories, setAccessories] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingAccessory(salon.salon_id, 1, searchValue);
    }, 1000);
  };
  const fetchDataSalon = async (page, search) => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
      loadingAccessory(res.data.salon.salon_id, page, search);
    }
  };
  const loadingAccessory = async (salon_id, page, search) => {
    let res = await AccessoryApi.getAccessory(salon_id, page, LIMIT, search);
    if (res?.data?.accessory) {
      setAccessories(res.data.accessory);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    fetchDataSalon(page, search);
  }, [page, search]);
  console.log("accessories : ", accessories);
  return (
    <div>
      <HeaderSalon />
      <div>
        <section className="listSalon section">
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div className="row g-2">
              <div className="col-lg-12">
                <div className="section-title mt-5">
                  <h2 className="text-center fw-bold text-uppercase my-5">
                    Danh sách các phụ tùng
                  </h2>
                  <div className="d-flex align-items-center justify-content-end mb-4">
                    <span
                      style={{
                        width: "80px",
                        fontWeight: "bold",
                        color: "#6a6a6c",
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
                      placeholder="Nhập tên phụ tùng"
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
              {accessories &&
                accessories.length > 0 &&
                accessories.map((accessory) => {
                  return (
                    <div key={accessory.accessory_id} className="col-2">
                      <div className="accessory-container text-center">
                        <div className="">
                          <img src={accessory.icon} alt="" />
                        </div>
                        <div className="accessory-body">
                          <div
                            className="mt-3 fw-bold"
                            style={{ fontSize: "18px" }}
                          >
                            {accessory.name}
                          </div>
                          <p className="mt-2">
                            {formatCurrency(accessory.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {accessories && accessories.length > 0 && (
              <div className="d-flex justify-content-center mt-5">
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
