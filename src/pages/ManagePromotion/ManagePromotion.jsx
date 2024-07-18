import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import userApi from "../../apis/user.api";
import promotionApi from "../../apis/promotion.api";
import { toast } from "react-toastify";
import salonApi from "../../apis/salon.api";
import { formatCurrency } from "../../utils/common";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function ManagePromotion() {
  const [permissions, setPermission] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [contentHTML, setContentHTML] = useState("")
  const [contentMARKDOWN, setContentMARKDOWN] = useState("")
  const [startDay, setStartDay] = useState("")
  const [endDay, setEndDay] = useState("")
  const [promotions, setPromotions] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [promoChooseId, setPromoChoiceId] = useState("")
  const [salon, setSalon] = useState({})
  const handleShowDelete = (id) =>{
    setShowDelete(true)
    setPromoChoiceId(id)
  }
  const handleCloseDelete = () =>{
    setShowDelete(false)
  }
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  function handleEditorChange({ html, text }) {
     setContentHTML(html)
     setContentMARKDOWN(text)
  }
  const loadingAllPromotion = async (salonId) => {
     try{
      let res = await promotionApi.getAllPromotionOfSalon(salonId)
      console.log("res : ", res)
      if(res?.data?.promotion){
        setPromotions(res.data.promotion)
      }
     }catch(e){
      console.log(e)
     }
  }
  const fetchSalon = async () =>{
     try{
        let res = await salonApi.getSalonInfor()
        if(res?.data?.salon?.salon_id){
          setSalon(res?.data?.salon)
          loadingAllPromotion(res.data.salon.salon_id)
        }
     }catch(e){
      console.log(e)
     }
  }
  useEffect(() => {
    loadingUser();
    fetchSalon()
  }, []);
  const handleOnchangeImage = (e) => {
    setImage(e.target.files[0])
  }
  const handleAddPromotion = async () => {
    const form = new FormData();
    if (title) {
      form.append("title", title);
    }
    if (description) {
      form.append("description", description);
    }
    if (image) {
      form.append("banner", image);
    }
    if (contentHTML) {
      form.append("contentHtml", contentHTML);
    }
    if (contentMARKDOWN) {
      form.append("contentMarkdown", contentMARKDOWN);
    }
    if(startDay){
      form.append("startDate", startDay);
    }
    if(endDay){
      form.append("endDate", endDay);
    }
    try{
       let res = await promotionApi.createPromotion(form)
       if(res?.data?.status === "success"){
         toast.success("Thêm khuyến mãi thành công")
         setTitle("")
         setContentHTML("")
         setContentMARKDOWN("")
         setDescription("")
        loadingAllPromotion(salon.salon_id)
       }else{
        toast.error("Thêm khuyến mãi thất bại")
       }
    }catch(e){
       console.log(e)
    }
  }
  const handleDelete = async() => {
    try{
        let res = await promotionApi.deletePromotion(promoChooseId)
        if(res?.data?.status === "success"){
          toast.success("Xóa khuyến mãi thành công")
          handleCloseDelete();
          loadingAllPromotion(salon.salon_id);
          setPromoChoiceId("")
        }else{
          toast.error("Xóa khuyến mãi thất bại")
        }
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Quản lí khuyến mãi
            </h4>
          </div>
          <div className="card-body">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ width: "100px" }}>Tìm kiếm:</span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  style={{ width: "100%" }}
                  placeholder="Nhập tên khuyến mãi"
                />
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_PRM")) && (
                <button className="btn btn-success" onClick={handleAddPromotion}>Thêm khuyến mãi mới</button>
              )}
            </div>
            <div className="row" style={{marginTop: "10px", marginBottom: "10px"}}>
              <div className="col-6">
                <span>Tiêu đề khuyến mãi</span>
                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div className="col-6">
                <span>Mô tả </span>
                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)}></input>
              </div>
              <div className="col-6"style={{marginTop: "10px"}} >
                <span>Ngày bắt đầu</span>
                <input type="date" className="form-control" value={startDay} onChange = {(e) =>  setStartDay(e.target.value)}></input>
              </div>
              <div className="col-6"style={{marginTop: "10px"}} >
                <span>Ngày kết thúc</span>
                <input type="date" value={endDay} className="form-control" onChange = {(e) => setEndDay(e.target.value)}></input>
              </div>
              <div className="col-6"style={{marginTop: "10px"}} >
                <span>Hình ảnh thumnail</span>
                <input type="file" className="form-control" onChange = {(e) => handleOnchangeImage(e)}></input>
              </div>
            </div>
            <div>Nội dung khuyến mãi</div>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            <table className="table mt-4 table-hover" style={{width: "100%"}}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" className="text-center">
                    Tiêu đề
                  </th>
                  <th scope="col" className="text-center">
                    Mô tả
                  </th>
                  <th scope="col" className="text-center">
                    Ngày bắt đầu
                  </th>
                  <th scope="col" className="text-center">
                    Ngày kết thúc
                  </th>
                  <th scope="col" className="text-center" style={{width: "10%"}}>
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {promotions && promotions.length > 0 ? (
                  promotions.map((promo, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {index + 1}
                      </td>

                      <td className="text-center">{promo.title}</td>
                      <td className="text-center">{promo.description}</td>
                      <td className="text-center">{promo.startDate}</td>
                      <td className="text-center">{promo.endDate}</td>
                      <td className="text-center">
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_PRM")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                         //   onClick={() => handleShowUpdate(car)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_PRM")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(promo.id)}
                          >
                            <i className="fa fa-trash"></i>
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa khuyến mãi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa khuyến mãi này
            không ?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
