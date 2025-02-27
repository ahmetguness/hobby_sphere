import React from "react";
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

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const handleLogout = () => {
    console.log("exit");
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
      />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigation;



// import React from "react";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";
// import HomeScreen from "../screens/HomeScreen/HomeScreen";
// import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
// import { Feather, MaterialIcons } from "@expo/vector-icons";
// import { DrawerContentComponentProps } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

// interface CustomDrawerContentProps extends DrawerContentComponentProps {}

// const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
//   const handleLogout = () => {
//     console.log("exit");
//   };

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Log Out"
//         icon={({ color, size }) => (
//           <MaterialIcons name="logout" size={size} color={color} />
//         )}
//         onPress={handleLogout}
//       />
//     </DrawerContentScrollView>
//   );
// };

// const AppDrawerNavigation = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerPosition: "right",
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Feather name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={UserProfileScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <MaterialIcons name="person" size={size} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default AppDrawerNavigation;
