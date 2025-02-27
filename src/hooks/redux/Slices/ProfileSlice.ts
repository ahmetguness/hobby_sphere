import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/User";
import { initialUserState } from "./UserSlice";

interface ProfileState {
  profileInfo: User;
}

const initialState: ProfileState = {
  profileInfo: initialUserState,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedProfile: (state, action: PayloadAction<User>) => {
      state.profileInfo = action.payload;
    },
    updateSelectedProfile: (state, action: PayloadAction<Partial<User>>) => {
      state.profileInfo = { ...state.profileInfo, ...action.payload };
    },
    resetSelectedProfile: (state) => {
      state.profileInfo = initialUserState;
    },
  },
});

export default ProfileSlice;
export const {
  setSelectedProfile,
  updateSelectedProfile,
  resetSelectedProfile,
} = ProfileSlice.actions;
