import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MessageSlice from "./slices/MessageSlice"
export const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    messageSlice: MessageSlice,
  },
});
