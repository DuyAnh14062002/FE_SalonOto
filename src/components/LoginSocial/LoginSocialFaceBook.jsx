import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setAccessTokenToLs, setProfileToLs } from "../../utils/auth";
import userApi from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/UserSlice";
import authApi from "../../apis/auth.api";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
export default function LoginSocialFaceBook() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const data = Object.fromEntries([...params]);
      try {
        const res = await authApi.facebookAuthCallback(data.code)
        console.log("res : ", res)
        if(res.data.accessToken){
          setAccessTokenToLs(res.data.accessToken);
        }
        if(res.data.user){
          dispatch(loginUser(res.data.user));
          setProfileToLs(res.data.user);
          navigate("/");
        }else{ 
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
