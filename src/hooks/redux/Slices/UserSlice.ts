import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/User";

export const initialUserState: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  hobbies: [],
  image: "",
  posts: [],
  comments: [],
  likes: [],
};

interface UserState {
  userInfo: User;
}

const initialState: UserState = {
  userInfo: initialUserState,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    resetUserInfo: (state) => {
      state.userInfo = initialUserState;
    },
  },
});

export default UserSlice;
export const { setUserInfo, updateUserInfo, resetUserInfo } = UserSlice.actions;
