import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isRefuse: false
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessage: (state, action) =>{
      state.messages = action.payload
    },
    setRefuseCall: (state, action) =>{
      state.isRefuse = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {getMessage , setRefuseCall} = messageSlice.actions;

export default messageSlice.reducer;