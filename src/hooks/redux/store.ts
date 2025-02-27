import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AppSlice from "./Slices/AppSlice";
import ProfileSlice from "./Slices/ProfileSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    app: AppSlice.reducer,
    profile: ProfileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
