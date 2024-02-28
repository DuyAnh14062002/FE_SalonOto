import * as yup from "yup";
const handleConfirmPassword = (refString) => {
  return yup
    .string()
    .required("Confirm Password không được để trống")
    .min(6, "Độ dài Confirm Password từ 6-100 kí tự")
    .max(100, "Độ dài Confirm Password từ 6-100 kí tự")
    .oneOf([yup.ref(refString)], "Nhập lại mật khẩu không khớp");
};
export const schema = yup.object({
  name: yup.string().trim().required("Tên không được để trống"),
  username: yup
    .string()
    .required("Tên đăng nhập không được để trống")
    .min(6, "Độ dài email từ 6-100 kí tự")
    .max(100, "Độ dài email từ 6-100 kí tự"),
  email: yup
    .string()
    .required("Email không được để trống")
    .min(6, "Độ dài email từ 6-100 kí tự")
    .max(100, "Độ dài email từ 6-100 kí tự")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email không đúng định dạng"
    ),
  password: yup
    .string()
    .required("Password không được để trống")
    .min(6, "Độ dài Password từ 6-100 kí tự")
    .max(100, "Độ dài Password từ 6-100 kí tự"),
  confirm_password: handleConfirmPassword("password"),
});
