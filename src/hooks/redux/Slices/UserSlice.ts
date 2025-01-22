import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  email: string;
  password: string;
  hobbies: string[];
}

interface UserState {
  userInfo: UserInfo;
}

const initialState: UserState = {
  userInfo: {
    email: "",
    password: "",
    hobbies: [],
  },
};

const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export default User;
export const { setUserInfo } = User.actions;
