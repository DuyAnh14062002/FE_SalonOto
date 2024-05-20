import React, { useEffect, useState } from 'react'
import Header from '../Header'
import dealerApi from '../../apis/dealer.api';
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProcessFormDealer from '../../pages/ProcessFormDealer';
import ProcessForUserDealer from '../../pages/ProcessForUserDealer/ProcessForUserDealer';
export default function HistoryTransactionDealer() {
  const [transactions, setTransactions] = useState([])
  const [showModalProcess, setShowModalProcess] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const fetchAllTransaction = async () => {
    let res = await dealerApi.getAllProcess();
    console.log("res tran : ", res)
    if(res?.data?.transaction){
      setTransactions(res.data.transaction)
    }
  };
  const handleShowProcess = (item) => {
    setSelectedTransaction(item);
    setShowModalProcess(true);
  };
  const handleCloseModalProcess = () => {
    setShowModalProcess(false);
  };
  useEffect(() => {
    fetchAllTransaction()
  }, [])
  console.log("transactions : ", transactions)
  return (
    <> 
       <Header otherPage = {true} />
       <h2 className='text-center mt-3'>Lịch sử các giao dịch hoa tiêu</h2>
       <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "17%" }}>
                    Tên Salon ô tô
                  </th>
                  <th scope="col">Tên qui trình</th>
                  <th scope="col">Ngày tạo</th>
                  <th scope="col">Giai đoạn hiện tại</th>
                  <th scope="col">Trạng thái</th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "18%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((item, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">{++index}</td>

                      <td>{item?.salon?.name}</td>
                      <td>{item?.process?.name}</td>
                      <td>{item?.connection?.created_at}</td>
                      {item?.status === "pending" ? (<td>{item?.stage?.name}</td>) : (  <td><span class="badge bg-success">Hoàn thành</span></td>)}
                      
                      <td>
                        {item?.status === "pending" ? (
                          <span class="badge bg-warning text-dark">
                             Đang xử lý
                          </span>
                        ) : (
                           <span class="badge bg-success">Hoàn thành</span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-info btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Xem tiến trình"
                          onClick={() => handleShowProcess(item)}
                        >
                          <i className="fas fa-tasks"></i>
                        </button>
                        <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            //onClick={() => handleShowDelete(invoice)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Modal
        show={showModalProcess}
        onHide={handleCloseModalProcess}
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tiến trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProcessForUserDealer
            selectedTransaction={selectedTransaction}
            handleCloseModalProcess={handleCloseModalProcess}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
