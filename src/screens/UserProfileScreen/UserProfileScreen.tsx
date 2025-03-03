import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies } from "../../data/dummy_data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { resetSelectedProfile } from "../../hooks/redux/Slices/ProfileSlice";
import { useNavigation } from "@react-navigation/native";
import { UserProfileScreenNavigationProp } from "../../types/NavigationTypes";

const UserProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profileInfo);
  const navigation = useNavigation<UserProfileScreenNavigationProp>();
  const dispatch = useDispatch();

  const profileImageUri =
    profile.image && profile.image !== "" ? profile.image : null;

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity
          style={{ marginBottom: "4%" }}
          onPress={() => {
            dispatch(resetSelectedProfile()), navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.navbarInnerContainer}>
          <View style={{ flex: 0.4, alignItems: "center" }}>
            {profileImageUri ? (
              <Image
                style={styles.profileImage}
                source={{ uri: profileImageUri }}
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={require("../../assets/avatars/default_avatar.png")}
              />
            )}
            <Text style={{ marginTop: "4%" }}>{profile.name}</Text>
            <Text>FOLLOW</Text>
          </View>
          <View
            style={{
              flex: 0.6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ height: 130 }}>
              <Text>HOBBIES:</Text>
              <FlatList
                data={hobbies}
                renderItem={({ item }) => <Text>{item.name}</Text>}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "orange",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>LIKES</Text>
            <Text>123</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>DISLIKES</Text>
            <Text>444</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>POSTS</Text>
            <Text>555</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>COMMENTS</Text>
            <Text>66</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
