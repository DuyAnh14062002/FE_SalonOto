import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MessageSlice from "./slices/MessageSlice"
import SalonSlide from "./slices/SalonSlide";
export const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    messageSlice: MessageSlice,
    salonSlide: SalonSlide
  },
});
