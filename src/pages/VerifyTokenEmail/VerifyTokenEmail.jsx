import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../apis/auth.api";
import { toast } from "react-toastify";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/UserSlice";

export default function VerifyTokenEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const verifyToken = async () => {
    const res = await authApi.verifyTokenEmail(token);
    console.log("res", res);
    if (res.data.status === "success") {
      toast.success(
        "Bạn đã là thành viên của salon. Làm ơn kiểm tra email để đăng nhập"
      );
      setAccessTokenToLs(res.data.accessToken)
      dispatch(loginUser(res.data.user));
      setProfileToLs(res.data.user)
      navigate("/profile", {
        state : {createPassword : true}
      });
    }
    if (res.data.status === "failed") {
      toast.error(res.data.msg);
      navigate("/login");
    }
  };
  verifyToken();
}
