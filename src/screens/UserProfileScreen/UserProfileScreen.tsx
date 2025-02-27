import { FlatList, Image, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies } from "../../data/dummy_data";

const UserProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profileInfo);
  console.log(profile);

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <View style={styles.navbarInnerContainer}>
          <View style={{ flex: 0.4, alignItems: "center" }}>
            <Image
              style={styles.profileImage}
              source={{ uri: profile.image }}
            />
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
