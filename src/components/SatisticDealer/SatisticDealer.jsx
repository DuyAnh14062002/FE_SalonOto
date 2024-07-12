import React, { useEffect, useState } from 'react'
import "./SatisticDealer.scss"
import Header from '../Header'
import { formatCurrency } from "../../utils/common";
import dealerApi from '../../apis/dealer.api';
export default function SatisticDealer() {
  const [satistics,setSatistics] = useState({})
  const loadingSatisyicDealer = async () => {
      try{
        let res = await dealerApi.statisticDealer()
        console.log("statistic : ", res)
        if(res?.data?.transaction){
          setSatistics(res.data.transaction)
        }
      }catch(e){
        console.log(e)
      }
  }
  useEffect(() => {
      loadingSatisyicDealer()
  }, [])
  console.log("transaction : ", satistics)
  return (
    <div>
      <Header otherPage = {true}/>
      <h2 style={{marginTop: "20px"}} className='text-center'>Thống Kê hoa tiêu</h2>
      <div className='satistic-dealer-container'>
        <div className='satistic-dealer-item'>
           <div className='satistic-dealer-number'>
               {satistics?.totals?.totalNumOfCompletedTran ? satistics?.totals?.totalNumOfCompletedTran : 0}
           </div>
           <div className='satistic-dealer-title'>Số giao dịch hoàn thành</div>
           
        </div>
        <div className='satistic-dealer-item'>
           <div className='satistic-dealer-comission'>{satistics?.totals?.totalAmount ? formatCurrency(satistics?.totals?.totalAmount) : formatCurrency(0)}</div>
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
                </tr>
              </thead>
              <tbody>
                {satistics?.data?.length > 0 ? satistics.data.map((item) => {
                  return(
                    <tr  style={{ background: "rgb(247 247 247)" }}>
                    <td className="text-center">
                      1
                    </td>

                    <td>{item.salon.name}</td>
                    <td className="text-center">{item?.salon.phone}</td>
                    <td className="text-center">{item?.numOfCompletedTran}</td>
                    <td className="text-center">
                      {item.amount ? formatCurrency(item.amount): ""}
                    </td>
                    </tr>
                  )
                }): ""}
              </tbody>
            </table>
    </div>
  )
}
