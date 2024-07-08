import React from 'react'
import "./SatisticDealer.scss"
import Header from '../Header'
import { formatCurrency } from "../../utils/common";
export default function SatisticDealer() {
  return (
    <div>
      <Header otherPage = {true}/>
      <h2 style={{marginTop: "20px"}} className='text-center'>Thống Kê hoa tiêu</h2>
      <div className='satistic-dealer-container'>
        <div className='satistic-dealer-item'>
           <div className='satistic-dealer-number'>
               12
           </div>
           <div className='satistic-dealer-title'>Số giao dịch hoàn thành</div>
           
        </div>
        <div className='satistic-dealer-item'>
           <div className='satistic-dealer-comission'>{formatCurrency(36000000)}</div>
           <div className='satistic-dealer-title'>Tổng tiền hoa hồng nhận được</div>
        </div>
      </div>
      <h2 style={{marginTop: "35px"}} className='text-center'>Danh sách các salon đã giao dịch</h2>
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
                    Số tiền Hoa hồng nhận được
                  </th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr  style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        1
                      </td>

                      <td>Salon Duy Anh</td>
                      <td className="text-center">0384496705</td>
                      <td className="text-center">5</td>
                      <td className="text-center">
                        {formatCurrency(7200000)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                        </td>
                        </tr>
                {/* {cars && cars.length > 0 ? (
                  cars.map((car, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

                      <td>{car.name}</td>
                      <td className="text-center">{car.brand}</td>
                      <td className="text-center">{car.model}</td>
                      <td className="text-center">
                        {formatCurrency(car.price)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowInfor(car)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_CAR")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(car)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_CAR")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(car)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_CAR")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowWarranty(car)}
                          >
                            <i class="fa-solid fa-shield"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
    </div>
  )
}
