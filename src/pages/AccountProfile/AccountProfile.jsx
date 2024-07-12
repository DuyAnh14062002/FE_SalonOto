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
import { path } from "../../constants/path";
import { loginUser } from "../../redux/slices/UserSlice";
import { useDispatch } from "react-redux";

const AccountProfile = (props) => {
  const [emailInvite, setEmailInvite] = useState("");
  const [show, setShow] = useState(false);
  const [showCreatePassword, setShowPassword] = useState(false);
  const [salon, setSalon] = useState({});
  const [profile1, setProfile1] = useState({});
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [profile, setProfile] = useState({
    fullname: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    address: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const createPassword = location?.state?.createPassword;
    if (createPassword && createPassword === true) {
      setShowPassword(true);
    }
  }, []);
  const handleCloseCreatePassword = () => {
    setShowPassword(false);
  };
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
  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (password === retypePassword) {
      let res = await authApi.createNewPassword(password);
      console.log("res create password : ", res);
      setShowPassword(false);
      toast.success("Đặt mật khẩu thành công");
      navigate("/profile", {
        state: null,
      });
    } else {
      toast.error("Mật khẩu nhập lại không khớp");
    }
  };
  const getProfile = async () => {
    const res = await userApi.getProfile();
    if (res?.data?.profile) {
      setProfile1(res.data.profile);
      setProfile(res.data.profile);
      dispatch(loginUser(res.data.profile));
      setProfile(res.data.profile);
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
      if (profile1?.google != null) {
        toast.error("Bạn đã liên kết tài khoản google rồi");
      } else {
        window.open(
          "https://server-graduation-thesis-1.onrender.com/auth/google",
          "_self"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLinkFacebook = () => {
    try {
      if (profile1?.facebook != null) {
        toast.error("Bạn đã liên kết tài khoản facebook rồi");
      } else {
        window.open(
          "https://server-graduation-thesis-1.onrender.com/auth/facebook",
          "_self"
        );
      }
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
    if (profile.email) {
      form.append("email", profile.email);
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
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm số 0 phía trước nếu cần
    const year = date.getFullYear().toString(); // Lấy năm

    return `${day}/${month}/${year}`;
  };
  const handleShowHistory = () => {
    navigate(`${path.historyTransaction}`);
  };
  const handleShowHistoryPayment = () => {
    navigate(`${path.historyPayment}`);
  };
  const handleShowPostSell = () => {
    navigate(`${path.postSellCar}`);
  };
  const formatDateOfBirth = (isoString) => {
    if (isoString && isoString.includes("T")) {
      return isoString.split("T")[0];
    }
    return isoString;
  };
  const handleShowTransactionDealer = () => {
    navigate(`${path.historyTransactionDealer}`);
  };
  const handleShowSatisticDealer = () => {
    navigate(`${path.satisticDealer}`);
  };
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
                    <h2 className="text-center fw-bold text-uppercase">
                      Thông tin cá nhân
                    </h2>
                    <div className="comments-body mt-5">
                      <div className="single-comments">
                        <div className="main">
                          <div className="body">
                            <div className="grid-container">
                              <div className="avatar">
                                <div className="head">
                                  <div className="info">
                                    <img
                                      src={profile1 && profile1.avatar}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="info">
                                  <h4>Họ tên</h4>
                                  <p>
                                    {(profile1 && profile1.fullname) ||
                                      "Chưa cập nhật"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="info">
                                  <h4>Giới tính</h4>
                                  <p className="text-capitalize">
                                    {(profile1 && profile1.gender) ||
                                      "Chưa cập nhật"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="info">
                                  <h4>Số điện thoại</h4>
                                  <p>
                                    {(profile1 && profile1.phone) ||
                                      "Chưa cập nhật"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div className="info">
                                  <h4>Địa chỉ</h4>
                                  <p>
                                    {(profile1 && profile1.address) ||
                                      "Chưa cập nhật"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="info">
                                  <h4>Ngày sinh</h4>
                                  <p>
                                    {profile1 && profile1.date_of_birth !== ""
                                      ? formatDate(profile1.date_of_birth)
                                      : ""}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="info">
                                  <h4>Email</h4>
                                  <p>
                                    {(profile1 && profile1.email) ||
                                      "Chưa cập nhật"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 profile mt-5">
                  <div className="comments-form mt-3">
                    <h2 className="text-center fw-bold text-uppercase">
                      Cập nhật thông tin cá nhân
                    </h2>
                    <div className="form mt-5">
                      <div className="row mt-3">
                        <div className="col-lg-3 col-md-3 col-12 ">
                          <div className="update-container">
                            <i className="fa fa-user mx-2"></i>
                            <input
                              type="text"
                              name="fullname"
                              placeholder="Họ tên"
                              value={profile.fullname}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12 ">
                          <div className="update-container">
                            <i className="fa-regular fa-envelope"></i>
                            <input
                              type="text"
                              name="email"
                              placeholder="Email"
                              value={profile.email}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12 ">
                          <div className="update-container">
                            <i className="fa-solid fa-venus-mars mx-2"></i>
                            <input
                              type="text"
                              name="gender"
                              placeholder="Giới tính"
                              value={profile.gender}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12 ">
                          <div className="update-container">
                            <i className="fa fa-phone mx-2"></i>
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
                            <i className="fa-solid fa-location-dot mx-2"></i>
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
                            <i className="fa-solid fa-cake-candles mx-2"></i>
                            <input
                              type="date"
                              name="date_of_birth"
                              placeholder="Ngày sinh"
                              value={formatDateOfBirth(profile.date_of_birth)}
                              onChange={handleOnchange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mt-3">
                          <div className="update-container">
                            <i className="fa-regular fa-image mx-2"></i>
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 profile mt-5">
                  <div className="comments-form mt-3">
                    <h2 className="text-center fw-bold text-uppercase">
                      Tính năng hỗ trợ
                    </h2>
                    <div className="text-center">
                      {salon && (
                        <Button
                          variant="success"
                          className="mt-3"
                          onClick={handleShow}
                        >
                          <i className="fa-solid fa-user-plus"></i> Mời bạn bè
                        </Button>
                      )}
                      <Button
                        className="mt-3 btn-profile function-additional"
                        style={{
                          backgroundColor: "red",
                        }}
                        type="button"
                        onClick={handleLinkGoogle}
                      >
                        {profile1?.google && (
                          <span className="tick">
                            <i className="fa-solid fa-circle-check"></i>
                          </span>
                        )}
                        <i className="fab fa-google me-2"></i> Liên kết với
                        google
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        style={{ backgroundColor: "#dd4b39;" }}
                        type="button"
                        onClick={handleLinkFacebook}
                      >
                        {profile1?.facebook && (
                          <span className="tick">
                            <i className="fa-solid fa-circle-check"></i>
                          </span>
                        )}
                        <i className="fab fa-facebook-f me-2"></i>Liên kết với
                        facebook
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        type="button"
                        onClick={handleShowHistory}
                        style={{
                          backgroundColor: "#883342",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa-solid fa-clock-rotate-left"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Xem lịch sử giao dịch
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        type="button"
                        onClick={handleShowHistoryPayment}
                        style={{
                          backgroundColor: "#b90d86",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa-solid fa-clock-rotate-left"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Xem lịch sử thanh toán
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        type="button"
                        onClick={handleShowPostSell}
                        style={{
                          backgroundColor: "#fd720d",
                          marginLeft: "10px",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Giới thiệu bán xe cho Salon
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        type="button"
                        onClick={handleShowTransactionDealer}
                        style={{
                          backgroundColor: "rgb(30 116 10)",
                          marginLeft: "10px",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Các giao dịch Hoa tiêu
                      </Button>
                      <Button
                        className="mt-3 btn-profile function-additional"
                        type="button"
                        onClick={handleShowSatisticDealer}
                        style={{
                          backgroundColor: "rgb(30 116 10)",
                          marginLeft: "10px",
                          border: "none",
                        }}
                      >
                        <i
                          class="fa-solid fa-chart-simple"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Thống kê Hoa Tiêu
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} backdrop="static">
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
        <Modal
          show={showCreatePassword}
          onHide={handleCloseCreatePassword}
          backdrop="static"
        >
          <Form onSubmit={handleSetPassword}>
            <Modal.Header>
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
              <Button variant="primary" type="submit">
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
