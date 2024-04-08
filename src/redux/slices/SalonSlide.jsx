import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonInfor: {}
};

export const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    setsalon: (state, action) =>{
      state.salonInfor = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {setsalon} = salonSlice.actions;

export default salonSlice.reducer;