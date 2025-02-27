import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  IntroScreen: undefined;
  LoginScreen: undefined;
  Drawer: undefined;
};

export type RootDrawerParamList = {
  HomeScreen: undefined;
  UserProfileScreen: undefined;
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
  RootDrawerParamList,
  "HomeScreen"
>;

export type UserProfileScreenNavigationProp = NavigationProp<
  RootDrawerParamList,
  "UserProfileScreen"
>;
