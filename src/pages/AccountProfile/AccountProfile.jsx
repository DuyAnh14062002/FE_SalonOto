import { useState } from "react";
import Header from "../../components/Header";
import "./AccountProfile.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import authApi from "../../apis/auth.api";
import { toast } from "react-toastify";

const AccountProfile = () => {
  const [emailInvite, setEmailInvite] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnChangeEmailInvite = (e) => {
    setEmailInvite(e.target.value);
  };
  const handleSubmitInviteUser = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.inviteUser({ email: emailInvite });
      if (res.data.status === "success") {
        toast.success("Bạn đã mời bạn bè thành công");
        setEmailInvite("");
        handleClose();
      }
    } catch (error) {}
  };
  const handleLinkGoogle = () => {
    try {
      window.open("http://localhost:5000/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLinkFacebook = () => {};
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
                                      backgroundImage: `url(https://www.phanmemninja.com/wp-content/uploads/2023/07/anh-dai-dien-zalo-mac-dinh-11.jpg)`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12 ">
                                <div className="info">
                                  <h4>Họ tên</h4>
                                  <p>Xuân Giao</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Email</h4>
                                  <p>XuanGiao@gmail.com</p>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-12">
                                <div className="info">
                                  <h4>Số điện thoại</h4>
                                  <p>0384496705</p>
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
                              name="name"
                              placeholder="Họ tên"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 ">
                          <div className="update-container">
                            <i className="fa fa-phone"></i>
                            <input
                              type="tel"
                              name="Số điện thoại"
                              placeholder="Số điện thoại"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 ">
                          <div className="update-container">
                            <i class="fa-regular fa-image"></i>
                            <input
                              type="file"
                              name="image"
                              id="files"
                              className="hidden"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group button">
                            <button
                              className="btn btn-primary mt-3"
                              style={{ marginRight: "10px" }}
                            >
                              <i className="fa fa-edit"></i> Lưu thay đổi
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <Button
                            variant="success"
                            className="mt-3"
                            onClick={handleShow}
                            style={{ marginRight: "10px" }}
                          >
                            <i class="fa-solid fa-user-plus"></i> Mời bạn bè
                          </Button>
                          <Button
                            className="mt-3"
                            style={{
                              backgroundColor: "red",
                              marginRight: "10px",
                            }}
                            type="button"
                            onClick={handleLinkGoogle}
                          >
                            <i className="fab fa-google me-2"></i> Liên kết với
                            google
                          </Button>
                          <Button
                            className="mt-3"
                            style={{ backgroundColor: "#dd4b39;" }}
                            type="button"
                            onClick={handleLinkFacebook}
                          >
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
              <Modal.Title>Mời bạn bè</Modal.Title>
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
      </section>
    </>
  );
};

export default AccountProfile;
