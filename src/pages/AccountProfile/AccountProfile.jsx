import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./AccountProfile.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import authApi from "../../apis/auth.api";
import { toast } from "react-toastify";
import userApi from "../../apis/user.api";
import salonApi from "../../apis/salon.api";
import { useLocation, useNavigate } from "react-router-dom";
const AccountProfile = (props) => {
  const [emailInvite, setEmailInvite] = useState("");
  const [show, setShow] = useState(false);
  const [showCreatePassword, setShowPassword] = useState(false)
  const [salon, setSalon] = useState({});
  const [profile1, setProfile1] = useState({});
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [profile, setProfile] = useState({
    fullname: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    address: "",
  });
  const navigate = useNavigate();
  const location = useLocation()
  const [image, setImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() =>{
    const createPassword =  location?.state?.createPassword
    if(createPassword && createPassword === true){
      setShowPassword(true)
    }
  }, [])
  const handleCloseCreatePassword = () =>{
     setShowPassword(false)
  }
  useEffect(() => {
    const getSalonInfo = async () => {
      try {
        const res = await salonApi.getSalonInfor();
        setSalon(res.data.salon);
      } catch (error) {
        console.log(error);
      }
    };
    getSalonInfo();
  }, []);
  const handleOnChangeEmailInvite = (e) => {
    setEmailInvite(e.target.value);
  };
  const handleSetPassword = async () => {
     
    if(password === retypePassword)
    {
       let res = await authApi.createNewPassword(password)
       console.log("res create password : ", res)
       setShowPassword(false)
       toast.success("Đặt mật khẩu thành công")
        navigate("/profile", {
           state : null
        })
    }else{
      toast.error("Mật khẩu nhập lại không khớp")
    }


  }
  const getProfile = async () => {
    const res = await userApi.getProfile();
    if (res?.data?.profile) {
      setProfile1(res.data.profile);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmitInviteUser = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.inviteUser({
        email: emailInvite,
        salonId: salon.salon_id,
      });
      console.log("res", res);
      if (res.data.status === "success") {
        toast.success("Bạn đã mời người dùng vào salon thành công");
        setEmailInvite("");
        handleClose();
      }
    } catch (error) {}
  };
  const handleLinkGoogle = () => {
    try {
      window.open("https://server-graduation-thesis-1.onrender.com/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLinkFacebook = () => {
    try {
      window.open("https://server-graduation-thesis-1.onrender.com/auth/facebook", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnchange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const HandleSubmit = async () => {
    const form = new FormData();
    if (profile.fullname) {
      form.append("fullname", profile.fullname);
    }
    if (profile.phone) {
      form.append("phone", profile.phone);
    }
    if (profile.gender) {
      form.append("gender", profile.gender);
    }
    if (profile.address) {
      form.append("address", profile.address);
    }
    if (profile.date_of_birth) {
      form.append("date_of_birth", profile.date_of_birth);
    }
    if (image) {
      form.append("avatar", image);
    }
    const res = await userApi.updateProfile(form);
    if (res?.data?.status === "success") {
      toast.success("Cập nhật thông tin thành công");
    } else {
      toast.error("Cập nhật thông tin thất bại");
    }
    getProfile();
    setProfile({});
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 phía trước nếu cần
    const year = date.getFullYear().toString(); // Lấy năm
    
    return `${day}/${month}/${year}`;
  };
  console.log("profile1 : ", profile1)
  return (
    <>
      <Header otherPage={true} />
      <section className="news-single section">
        <div className="container">
          <div className="row" style={{ marginBottom: "200px" }}>
            <div className="col-lg-12 col-12">
              <div className="row">
                <div className="col-12 profile">
                  <div className="blog-comments">
                    <h2>Thông tin cá nhân</h2>
                    <div className="comments-body">
                      <div className="single-comments">
                        <div className="main">
                          <div className="body">
                            <div className="row ">
                              <div className="col-lg-3">
                                <div className="head">
                                  <div
                                    className="user-image"
                                    style={{
                                      backgroundImage: `url(${
                                        profile1 && profile1.avatar
                                      })`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12 ">
                                <div className="info">
                                  <h4>Họ tên</h4>
                                  <p>{profile1 && profile1.fullname}</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Giới tính</h4>
                                  <p>{profile1 && profile1.gender}</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Số điện thoại</h4>
                                  <p>{profile1 && profile1.phone}</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12"></div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Địa chỉ</h4>
                                  <p>{profile1 && profile1.address}</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Ngày sinh</h4>
                                  <p>{profile1 && profile1.date_of_birth !== "" ? formatDate(profile1.date_of_birth) : ""}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 profile">
                  <div className="comments-form mt-3">
                    <h2>Cập nhật thông tin cá nhân</h2>
                    <div className="form">
                      <div className="row mt-3">
                        <div className="col-lg-4 col-md-4 col-12 ">
                          <div className="update-container">
                            <i className="fa fa-user"></i>
                            <input
                              type="text"
                              name="fullname"
                              placeholder="Họ tên"
                              value={profile.fullname}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 ">
                          <div className="update-container">
                            <i class="fa-solid fa-venus-mars"></i>
                            <input
                              type="text"
                              name="gender"
                              placeholder="Giới tính"
                              value={profile.gender}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 ">
                          <div className="update-container">
                            <i className="fa fa-phone"></i>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Số điện thoại"
                              value={profile.phone}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mt-3">
                          <div className="update-container">
                            <i class="fa-solid fa-location-dot"></i>
                            <input
                              type="text"
                              name="address"
                              placeholder="Địa chỉ"
                              value={profile.address}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mt-3">
                          <div className="update-container">
                            <i class="fa-solid fa-cake-candles"></i>
                            <input
                              type="date"
                              name="date_of_birth"
                              placeholder="Ngày sinh"
                              value={profile.date_of_birth}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mt-3">
                          <div className="update-container">
                            <i className="fa-regular fa-image"></i>
                            <input
                              type="file"
                              name="avatar"
                              id="files"
                              className="hidden"
                              onChange={(e) => handleImage(e)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group button">
                            <button
                              className="btn btn-primary mt-3"
                              style={{ marginRight: "10px" }}
                              onClick={HandleSubmit}
                            >
                              <i className="fa fa-edit"></i> Lưu thay đổi
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          {salon && (
                            <Button
                              variant="success"
                              className="mt-3"
                              onClick={handleShow}
                              style={{ marginRight: "10px" }}
                            >
                              <i className="fa-solid fa-user-plus"></i> Mời bạn
                              bè
                            </Button>
                          )}

                          <Button
                            className="mt-3 btn-profile"
                            style={{
                              backgroundColor: "red",
                              marginRight: "10px",
                            }}
                            type="button"
                            onClick={handleLinkGoogle}
                          >
                            {profile1 && profile1.google !== null ? ( <span className="tick"><i class="fa-solid fa-circle-check"></i></span>) : ""}
                            <i className="fab fa-google me-2"></i> Liên kết với
                            google
                          </Button>
                          <Button
                            className="mt-3 btn-profile"
                            style={{ backgroundColor: "#dd4b39;" }}
                            type="button"
                            onClick={handleLinkFacebook}
                          >
                            {profile1 && profile1.facebook !== null ? ( <span className="tick"><i class="fa-solid fa-circle-check"></i></span>) : ""}
                            <i className="fab fa-facebook-f me-2"></i>Liên kết
                            với facebook
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmitInviteUser}>
            <Modal.Header closeButton>
              <Modal.Title>Mời người dùng vào salon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={emailInvite}
                  onChange={handleOnChangeEmailInvite}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Mời
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showCreatePassword} onHide={handleCloseCreatePassword} >
          <Form onSubmit={handleSubmitInviteUser}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo mật khẩu cho tài khoản của bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Nhập mật khẩu</Form.Label>
                <Form.Control
                  required
                  type="password"
                  //value={emailInvite}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group md="4">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  required
                  type="password"
                  //value={emailInvite}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCreatePassword}>
                Đóng
              </Button>
              <Button variant="primary" type="submit" onClick={handleSetPassword}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </section>
    </>
  );
};

export default AccountProfile;
