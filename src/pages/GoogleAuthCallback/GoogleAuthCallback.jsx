import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth.api";

async function GoogleAuthCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();
  let _data;
  try {
    _data = await authApi.googleAuthCallback(search);
  } catch (error) {
    console.log("error:", error);
  }

  useEffect(() => {
    if (_data?.data) {
      const data = { ..._data.data };
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user_profile", JSON.stringify(data.user));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_data]);

  return <></>;
}

export default GoogleAuthCallback;
