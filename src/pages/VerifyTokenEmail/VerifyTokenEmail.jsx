import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../apis/auth.api";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/UserSlice";
import { toast } from "react-toastify";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";

export default function VerifyTokenEmail() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyToken = async () => {
    const res = await authApi.verifyTokenEmail(token);
    console.log("res", res);
    if (res.data.status === "success") {
      dispatch(loginUser(res.data.user));
      setAccessTokenToLs(res.data.accessToken);
      setProfileToLs(res.data.user);
      navigate("/");
    }
    if (res.data.status === "failed") {
      toast.error(res.data.msg);
      navigate("/login");
    }
  };
  verifyToken();
}
