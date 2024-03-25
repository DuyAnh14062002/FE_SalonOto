import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";
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
        if (res.data.accessToken) {
          setAccessTokenToLs(res.data.accessToken);
        }
        if (res.data.user) {
          dispatch(loginUser(res.data.user));
          setProfileToLs(res.data.user);
          navigate("/");
        } else {
          navigate("/profile");
        }
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
