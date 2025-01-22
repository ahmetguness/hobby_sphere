import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  console.log(user);
  return (
    <View>
      <Text>HomeScreen</Text>
      <Text>Welcome, {user.email}</Text>
    </View>
  );
};

export default HomeScreen;
