import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/User";

interface UserState {
  userInfo: User;
}

const initialState: UserState = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    password: "",
    hobbies: [],
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
});

export default UserSlice;
export const { setUserInfo } = UserSlice.actions;
