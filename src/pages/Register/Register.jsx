import { Link } from "react-router-dom";
import "./Register.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rule";
import Input from "../../components/Input";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <section class="background-radial-gradient overflow-hidden">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-7 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1
              class="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Lựa chọn tốt nhất <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Cho Salon Oto của bạn
              </span>
            </h1>
            <p class="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
              Chúng tôi cung cấp cho bạn các gói dịch vụ tốt nhất giúp quản lí
              bạn quản lí Salon Oto của mình một cách hiệu quả
            </p>
          </div>

          <div class="col-lg-5 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              class="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              class="position-absolute shadow-5-strong"
            ></div>

            <div class="card bg-glass">
              <div class="card-body px-1 py-5">
                <form onSubmit={onSubmit}>
                  <div class="d-flex justify-content-center">
                    <Input
                      type="text"
                      labelName="Họ tên"
                      name="name"
                      errorMessage={errors.name?.message}
                      register={register}
                    />
                  </div>
                  <div class="d-flex justify-content-center">
                    <Input
                      type="text"
                      labelName="Tên tài khoản"
                      errorMessage={errors.username?.message}
                      name="username"
                      register={register}
                    />
                  </div>
                  <div class="d-flex justify-content-center">
                    <Input
                      type="password"
                      labelName="Mật khẩu"
                      errorMessage={errors.password?.message}
                      name="password"
                      register={register}
                    />
                  </div>
                  <div class="d-flex justify-content-center">
                    <Input
                      type="password"
                      labelName="Nhập lại mật khẩu"
                      errorMessage={errors.confirm_password?.message}
                      name="confirm_password"
                      register={register}
                    />
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block mb-4 w-75"
                    >
                      Đăng Ký
                    </button>
                  </div>

                  <div class="text-center">
                    <p>Hoặc đăng nhập với:</p>
                    <button
                      class="btn btn-block btn-primary w-75"
                      style={{ backgroundColor: "#dd4b39;" }}
                      type="button"
                    >
                      <i class="fab fa-google me-2"></i> Đăng nhập với google
                    </button>
                    <button
                      class="btn btn-block btn-danger mb-2 w-75 mt-2"
                      style={{ backgroundColor: "#3b5998;" }}
                      type="button"
                    >
                      <i class="fab fa-facebook-f me-2"></i>Đăng nhập với
                      facebook
                    </button>
                  </div>
                  <div className="text-center">
                    <span>
                      Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>{" "}
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
