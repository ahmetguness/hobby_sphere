import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
