import React, { useCallback } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { resetUserInfo } from "../hooks/redux/Slices/UserSlice";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../types/NavigationTypes";
import { RootState } from "../hooks/redux/store";
import { setSelectedProfile } from "../hooks/redux/Slices/ProfileSlice";

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(resetUserInfo());
    navigation.navigate("LoginScreen");
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        icon={({ color, size }) => (
          <MaterialIcons name="logout" size={size} color={color} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const AppDrawerNavigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleFocus = useCallback(() => {
    if (user?.id) {
      dispatch(setSelectedProfile(user));
    }
  }, [dispatch, user]);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
        listeners={{
          focus: handleFocus,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigation;
