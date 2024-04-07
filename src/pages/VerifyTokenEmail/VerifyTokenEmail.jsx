import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../apis/auth.api";
import { toast } from "react-toastify";

export default function VerifyTokenEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const verifyToken = async () => {
    const res = await authApi.verifyTokenEmail(token);
    console.log("res", res);
    if (res.data.status === "success") {
      toast.success(
        "Bạn đã là thành viên của salon. Làm ơn kiểm tra email để đăng nhập"
      );
      navigate("/");
    }
    if (res.data.status === "failed") {
      toast.error(res.data.msg);
      navigate("/login");
    }
  };
  verifyToken();
}
