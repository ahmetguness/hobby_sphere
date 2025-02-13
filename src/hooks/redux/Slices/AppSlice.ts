import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export default AppSlice;
export const { setIsDarkMode } = AppSlice.actions;
