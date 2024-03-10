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
export default function LoginSocial() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.userSlice.userInfo
  );
  useEffect(() => {
    const login = async () => {
      const data = Object.fromEntries([...params]);
      let user_id = "";
      if(user){
         user_id = user.user_id;
      }
      try {
<<<<<<< HEAD
        console.log("user_id : ", user_id)
        const res = await authApi.googleAuthCallback(data.code, user_id)
        console.log("res : ", res)
        if(res.data.accessToken){
          setAccessTokenToLs(res.data.accessToken);
        }
        if(res.data.user && res.data.user.user_id){
          const user = await userApi.getUserById(res.data.user.user_id);
          dispatch(loginUser(user.data));
          setProfileToLs(user.data);
          navigate("/");
        }else{ 
          navigate("/profile");
        }
=======
        const res = await authApi.googleAuthCallback(data.code);
        setAccessTokenToLs(res.data.accessToken);
        const user = await userApi.getUserById(res.data.user.user_id);
        dispatch(loginUser(user.data));
        setProfileToLs(user.data);
        navigate("/");
>>>>>>> 387125cd49b00d403b1d08624893353915a5b7e7
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
