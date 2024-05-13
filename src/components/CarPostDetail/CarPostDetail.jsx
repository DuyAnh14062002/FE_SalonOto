import React, { useEffect, useState } from "react";
import "./CarPostDetail";
import Header from "../Header";
import { Carousel } from "react-bootstrap";
import "./CarPostDetail.scss";
import { Form, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import processApi from "../../apis/process.api";
import salonApi from "../../apis/salon.api";
import { useParams } from "react-router-dom";
import dealerApi from "../../apis/dealer.api";
export default function CarPostDetail() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const [show, setShow] = useState(false)
  const [salon, setSalon] = useState({})
  const [process, setProcess] = useState([])
  const salon_id = localStorage.getItem("userIdSalon")
  const [post, setPost] = useState({})
  const [processId, setProcessId] = useState("")

  const params = useParams();
  const id = params.id;
  const handleShowModal = () =>{
    setShow(true)
  }
  const handleCloseModal = () => {
    setShow(false)
  }
  const handleChooseProcess = (e) =>{
      setProcessId(e.target.value)
  }
  const fetchSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      loadingProcess(res.data.salon.salon_id)
      setSalon(res.data.salon);
    }
  };
  const loadingProcess = async(salonId) => {
    let res = await processApi.getAllProcess({
      salonId: salonId
    })
    if(res?.data?.data){
      setProcess(res.data.data)
    }
  }
  const loadingDetailPostCar = async() => {
    let res = await dealerApi.getDetailPost(id)
    console.log("res : ", res)
    if(res?.data?.post){
      setPost(res.data.post)
    }
  }
  useEffect(() => {
    fetchSalon()
    loadingDetailPostCar()
  }, [])
  const handleConection = async(e) => {
    e.preventDefault()
    let res = await dealerApi.CreateConnecttion(post.post_id, processId)
    console.log("res conection : ", res)
  }
  console.log("processId : ", processId)
  return (
    <>
      <Header otherPage={true} />
      <div className="car-post-detail-body">
        <div className="car-post-detail-container">
          <div className="left-detail">
            <div className="car-image">
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(https://cdn.chotot.com/Dc7WJ7ml9pKSF3kbJSr38_U2p736UOZum-aJ3heUxcU/preset:view/plain/9b1e5291c7786ad995d8d0f2a63460e4-2870177156003191308.jpg)`,
                }}
              ></div>
              <Carousel
                responsive={responsive}
                className="sub-image"
                showArrows={true}
              >
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/qSnSktCh4D-ITRwpjFQyCJNmpGL3g5BrEhEMmFstCgw/preset:view/plain/d3d68ac8e752f92d834aa83b10b97d1e-2870177155819889318.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/aCSwlYM3RDdYy0L_gX4XmlXQwCwJu9Tg7ocT8SugAI8/preset:view/plain/3060856e7acb457b8ca4f54f01bef8f3-2870177156019866482.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/jHD_r5lin0ZwulOQbmZG6mmWXx8PutPj7adV2zkVhmc/preset:view/plain/ec5bf8aca0c25fb18e07c69c97501d3d-2870177155543151391.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/Ar8Zez4l4cwcqjl5O9rS0uR6yrGax8Gfd9cbuIQojzE/preset:view/plain/b4f854c6d7a6ead42eafd5933529cd7e-2870177155952831700.jpg)`,
                  }}
                ></div>
                <div
                  className="sub-image-item"
                  style={{
                    backgroundImage: `url(https://cdn.chotot.com/Dc7WJ7ml9pKSF3kbJSr38_U2p736UOZum-aJ3heUxcU/preset:view/plain/9b1e5291c7786ad995d8d0f2a63460e4-2870177156003191308.jpg)`,
                  }}
                ></div>
              </Carousel>
            </div>
            <div className="car-infor">
              <div className="name-car">{post.brand} {post.type} {post.mfg}</div>
              <div className="price">{post.price} đ </div>
              <div className="address">
                <i class="fa-solid fa-location-dot">{post.address}</i> 
              </div>
              <div className="time-post">
                {" "}
                <i class="fa-regular fa-clock"></i> Đăng 5 giây trước
              </div>
            </div>
            <div className="car-info-detail">
              <h3 className="title">Thông số chi tiết</h3>
              <div className="car-infor-box">
                <div className="car-info-detail-left">
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.brand != null ? post.brand : "Đang cập nhật..."}</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Năm sản xuất</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Số chỗ</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                </div>
                <div className="car-info-detail-right">
                  <div className="item-detail">
                    <div className="name-detail">Dòng xe</div>
                    <div className="text-detail">{post?.type != null ? post.type : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Phiên bản xe</div>
                    <div className="text-detail">{post?.version != null ? post.version : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Xuất xứ</div>
                    <div className="text-detail">{post?.origin != null ? post.origin : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                  <div className="item-detail">
                    <div className="name-detail">Hãng</div>
                    <div className="text-detail">{post?.mfg != null ? post.mfg : "Đang cập nhật..." }</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-detail">
            <div className="user-info">
              <div
                className="user-avatar"
                style={{
                  backgroundImage: `url(https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fuac2%2F12897389&w=1920&q=75)`,
                }}
              ></div>
              <div className="right-info-user">
                <div className="name-user">{post?.postedBy?.fullname}</div>
                <div className="time-active">Hoạt động 4 giờ trước</div>
              </div>
            </div>
            <div className="btn-detail">
              <button className="connection" onClick={handleShowModal}>Kết nối hoa tiêu</button>
              <button className="chat">
                <i class="fa-regular fa-comments"></i> Chat
              </button>
              <div className="chat-demo">
                <button>Xe còn không ?</button>
                <button>Xe chính chủ không ?</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleCloseModal} backdrop="static">
        <Form noValidate onSubmit={handleConection}>
          <Modal.Header closeButton>
            <Modal.Title>Chọn qui trình thực hiện với hoa tiêu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <select className="select-salon-car-sell" onChange={(e)=>handleChooseProcess(e)}>
               {process?.length > 0 && process.map((item, index) => {
                 return(
                  <option key={index} value={item.id}>{item.name}</option>
                 )
               })}
             </select>
          </Modal.Body>
          <Modal.Footer>
           <Button variant="primary" onClick={handleCloseModal} type="submit" >
              Gửi yêu cầu kết nối
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
