import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AppSlice from "./Slices/AppSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    app: AppSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
