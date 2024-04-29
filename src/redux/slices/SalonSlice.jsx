import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonInfor: {},
  subMenuTran: false
};

export const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    setsalon: (state, action) =>{
      state.salonInfor = action.payload
    },
    setSubMenu: (state) =>{
      state.subMenuTran = !state.subMenuTran
    }
  },
});

// Action creators are generated for each case reducer function
export const {setsalon, setSubMenu} = salonSlice.actions;

export default salonSlice.reducer;