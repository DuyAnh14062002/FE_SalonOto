import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MessageSlice from "./slices/MessageSlice"
import SalonSlice from "./slices/SalonSlice";
export const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    messageSlice: MessageSlice,
    salonSlice: SalonSlice
  },
});
