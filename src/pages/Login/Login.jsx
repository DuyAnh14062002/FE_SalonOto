import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../../utils/rule";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import authApi from "../../apis/auth.api";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import { useAuthContext } from '../../context/AuthContext'

const loginSchema = schema.pick(["username", "password"]);
export default function Login() {
  const {setProfile} = useAuthContext()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await authApi.login(data);
      console.log("res : ", res)
      if (res.data.status === "success") {
        dispatch(loginUser(res.data.user));
        setProfile(res.data.user)
        navigate("/");
      }
      if (res.data.status === "failed") {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  });

  const handleLoginGoogle = async () => {
    try {
      window.open("http://localhost:5000/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoginFacebook = async () => {
    try {
      window.open("http://localhost:5000/auth/facebook", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-7 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Lựa chọn tốt nhất <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Cho Salon Oto của bạn
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Chúng tôi cung cấp cho bạn các gói dịch vụ tốt nhất giúp quản lí
              bạn quản lí Salon Oto của mình một cách hiệu quả
            </p>
          </div>
          <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <div className="card bg-glass">
              <div className="card-body px-1 py-5">
                <form onSubmit={onSubmit}>
                  <div className="d-flex justify-content-center">
                    <Input
                      type="text"
                      labelName="Tên tài khoản"
                      errorMessage={errors.username?.message}
                      name="username"
                      register={register}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Input
                      type="password"
                      labelName="Mật khẩu"
                      errorMessage={errors.password?.message}
                      name="password"
                      register={register}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4 w-75"
                    >
                      Đăng nhập
                    </button>
                  </div>

                  <div className="text-center">
                    <p>Hoặc đăng nhập với:</p>
                    <button
                      className="btn btn-block btn-danger btn-primary w-75"
                      style={{ backgroundColor: "#dd4b39;" }}
                      type="button"
                      onClick={handleLoginGoogle}
                    >
                      <i className="fab fa-google me-2"></i> Đăng nhập với
                      google
                    </button>
                    <button
                      className="btn btn-block btn-primary  mb-2 w-75 mt-2"
                      style={{ backgroundColor: "#3b5998;" }}
                      type="button"
                      onClick={handleLoginFacebook}
                    >
                      <i className="fab fa-facebook-f me-2"></i>Đăng nhập với
                      facebook
                    </button>
                  </div>
                  <div className="text-center">
                    <span>
                      Bạn chưa có tài khoản ?{" "}
                      <Link to="/register">Đăng ký</Link>{" "}
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
