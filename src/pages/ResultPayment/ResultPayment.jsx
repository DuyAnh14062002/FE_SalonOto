import React from "react";
import "./ResultPayment.scss";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ResultPayment() {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  const [params] = useSearchParams();
  const data = Object.fromEntries([...params]);
  return data.rs === "success" ? (
    <div className="result-container">
      <div className="result-icon-success">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="result-title-success">Thanh toán thành công</div>
      <div className="result-text-infor">Thông tin giao dịch</div>
      <div className="result-content">
        <div className="result-name-package" style={{ marginTop: "10px" }}>
          <strong>Tên gói : </strong>
          {data.item}
        </div>
        <div className="result-amount" style={{ marginTop: "10px" }}>
          <strong>Giá tiền :</strong> {data.amount} vnđ
        </div>
      </div>
      <div className="back-homepage" onClick={backHome}>
        <i className="fa-solid fa-arrow-left"></i>
        <span>Trở về trang chủ</span>
      </div>
    </div>
  ) : (
    <div className="result-container">
      <div className="result-icon-faild">
        <i className="fa-solid fa-circle-xmark"></i>
      </div>
      <div className="result-title-faild">Thanh toán thất bại</div>
      <div className="back-homepage" onClick={backHome}>
        <i className="fa-solid fa-arrow-left"></i>
        <span>Trở về trang chủ</span>
      </div>
    </div>
  );
}
