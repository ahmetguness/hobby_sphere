import { configureStore } from "@reduxjs/toolkit";
import User from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    user: User.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;