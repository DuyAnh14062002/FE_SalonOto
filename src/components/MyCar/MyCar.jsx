import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { formatDate } from "../../utils/common";
import "./MyCar.scss";
import userApi from "../../apis/user.api";
import { path } from "../../constants/path";
import { useNavigate } from "react-router-dom";
export default function MyCar() {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()
  const loadingCarOfUser = async () =>{
    try{
      let res = await userApi.getAllCarOfuser()
      console.log("res user car : ", res )
      if(res?.data?.data?.length > 0){
        setCars(res.data.data)
        
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
     loadingCarOfUser()
  }, [])
  const handleNavigateMaintenanceAppointment = (carId) => {
    navigate(`${path.salonAppointment}`, {
      state: {
        type: "maintenance",
        carId: carId
      },
    });
  };
  console.log("cars : ", cars)
  return (
    <div>
      <Header otherPage={true} />
      <div className="my-car-container">
        {cars?.length > 0 && cars?.map((item) =>{
          console.log("item : ", item)
          return(
            <div className="my-car-item">
            <div
              className="my-car-image"
              style={{
                backgroundImage: `url(${item?.car?.image?.[0]})`,
              }}
            ></div>
            <div className="my-car-content">
              <div className="my-car-content-info car-code"><span>Mã giao dịch : </span> {item?.invoice?.invoice_id}</div>
              <div className="my-car-content-info car-name"><span>Tên xe : </span> {item?.car?.name}</div>
              <div className="my-car-content-info car-color"><span>Màu sắc : </span>{item?.car?.outColor}</div>
              <div className="my-car-content-info car-furniture"><span>Màu nội thất: </span>{item?.car?.inColor}</div>
              <div className="my-car-content-info car-type"><span>Kiểu dáng : </span>{item?.car?.type}</div>
              <div className="my-car-content-info car-year"><span>Năm sản xuất : </span>{item?.car?.origin}</div>
              <div className="my-car-content-info date-buy"><span>Ngày mua : </span>{item?.car?.date_in ? formatDate(new Date(item?.car?.date_in)): ""}</div>
              <div className="my-car-content-info date-buy"><span>Salon mua : </span> {item?.invoice?.seller?.name}</div>
            </div>
            <div class="button-container">
              <button onClick={() => handleNavigateMaintenanceAppointment(item.car_id)}>Đặt lịch bảo dưỡng</button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}
