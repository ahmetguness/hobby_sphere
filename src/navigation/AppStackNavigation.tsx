import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const AppStackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
