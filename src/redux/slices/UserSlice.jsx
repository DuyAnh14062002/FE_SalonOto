import { createSlice } from "@reduxjs/toolkit";
import { getAccessTokenFromLs, getProfileFromLs } from "../../utils/auth";

const initialState = {
  userInfo: getProfileFromLs(),
  isAuthenticated: Boolean(getAccessTokenFromLs()),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
