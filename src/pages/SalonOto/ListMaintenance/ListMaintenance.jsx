import React, { useEffect, useState } from "react";
import HeaderSalon from "../../../components/Header/HeaderSalon";
import "./ListMaintenance.scss";
import maintenanceApi from "../../../apis/maintenance.api";
import salonApi from "../../../apis/salon.api";
export default function ListMaintenance() {
  const [maintenances, setMaintenances] = useState([]);
  const [salon, setSalon] = useState({});
  const loadingMaintenance = async (id) => {
    let res = await maintenanceApi.getAllMaintenanceOfSalon(id);
    if (res?.data?.maintenance) {
      setMaintenances(res.data.maintenance);
    }
  };
  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      loadingMaintenance(res.data.salon.salon_id);
    }
  };
  useEffect(() => {
    fetchDataSalon();
  }, []);
  return (
    <div>
      <HeaderSalon />
      <div className="text-center mt-3 maintenance-title text-uppercase">
        Bảng giá dịch vụ
      </div>
      <div className="listMaintenance-container">
        {maintenances &&
          maintenances.length > 0 &&
          maintenances.map((item) => {
            return (
              <div className="item-maintenance">
                <div className="top-content">
                  <div className="name-maintenance">{item.name}</div>
                  <div className="price">{item.cost} vnd</div>
                </div>
                <div className="maintenance-description">
                  {item.description}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
