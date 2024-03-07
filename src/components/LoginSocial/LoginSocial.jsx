import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";
import userApi from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/UserSlice";
import authApi from "../../apis/auth.api";
import Loading from "../Loading/Loading";
export default function LoginSocial() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const data = Object.fromEntries([...params]);
      try {
        const res = await authApi.googleAuthCallback(data.code);
        setAccessTokenToLs(res.data.accessToken);
        const user = await userApi.getUserById(res.data.user.user_id);
        dispatch(loginUser(user.data));
        setProfileToLs(user.data);
        navigate("/");
      } catch (error) {
        console.log("error: ", error);
      }
    };
    login();
  }, [params, dispatch, navigate]);

  return (
    <div>
      <Loading />
    </div>
  );
}
