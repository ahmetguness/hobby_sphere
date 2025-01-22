import { NavigationProp } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

export type RootStackParamList = {
  IntroScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
};

export type IntroScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "IntroScreen"
>;

export type LoginScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "HomeScreen"
>;
