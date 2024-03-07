import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";
import userApi from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/UserSlice";
export default function LoginSocial() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const data = Object.fromEntries([...params]);
      setAccessTokenToLs(data.access_token);
      let res = await userApi.getUserById(data.user_id);
      dispatch(loginUser(res.data));
      setProfileToLs(res.data);
      navigate("/");
    };
    login();
  }, [params, dispatch, navigate]);

  return <div></div>;
}
