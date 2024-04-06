import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessage: (state, action) =>{
      state.messages = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {getMessage } = messageSlice.actions;

export default messageSlice.reducer;