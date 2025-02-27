import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./AppStackNavigation";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
