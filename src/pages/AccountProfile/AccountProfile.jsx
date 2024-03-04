import Header from "../../components/Header";
import "./AccountProfile.scss";
import { useNavigate } from "react-router-dom";

const AccountProfile = () => {
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
                              style={{ marginRight: "3px" }}
                            >
                              <i className="fa fa-edit"></i> Lưu thay đổi
                            </button>
                            <button className="btn btn-success mt-3">
                              <i class="fa-solid fa-user-plus"></i> Mời bạn bè
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountProfile;
