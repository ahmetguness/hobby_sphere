import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies, posts } from "../../data/dummy_data";
import HobbiesCard from "../../components/cards/HobbiesCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../theme/colors";
import Feather from "@expo/vector-icons/Feather";
import {
  updateUserImage,
  uploadProfileImage,
} from "../../services/firebase/firebaseServices";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";
import PostCard from "../../components/cards/PostCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/NavigationTypes";
import ImagePickerComponent from "../../components/ImagePicker/ImagePicker";

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedHobby, setSelectedHobby] = useState<string>("default");
  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [localProfile, setLocalProfile] = useState<any>(null);

  const handleImageSelected = async (imageUri: string) => {
    if (user?.id && !isUpdating) {
      setIsUpdating(true);
      try {
        const uploadResponse = await uploadProfileImage(user.id, imageUri);

        if (uploadResponse.success && uploadResponse.user?.image) {
          const updateResponse = await updateUserImage(
            user.id,
            uploadResponse.user.image
          );

          if (!updateResponse.success) {
            throw new Error(updateResponse.message);
          }

          const updatedUser = { ...user, image: uploadResponse.user.image };

          dispatch(setUserInfo(updatedUser));

          await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

          setLocalProfile(updatedUser);
        } else {
          throw new Error(uploadResponse.message);
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <ImagePickerComponent
          currentImage={user.image}
          onImageSelected={handleImageSelected}
          size={40}
        />
        <Text>HELLO {user.name}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onPress={() => setSearchText("")}
          style={styles.searchIcon}
        >
          {searchText.length > 0 ? (
            <Entypo name="cross" size={24} color={COLORS.secondary} />
          ) : (
            <AntDesign name="search1" size={24} color={COLORS.secondary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              borderColor: COLORS.primary,
              padding: 10,
            }}
          >
            <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
              Trending Topics:
            </Text>
          </View>
          <FlatList
            data={hobbies}
            renderItem={({ item }) => (
              <HobbiesCard
                hobbyName={item.name}
                onPress={() => setSelectedHobby(item.name)}
              />
            )}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: "4%", marginBottom: "10%" }}>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PostCard
              date={item.date}
              description={item.description}
              id={item.id}
              image={item.image}
              likes={item.likes}
              topic={item.topic}
              user={item.user}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
      <TouchableOpacity style={styles.addPostContainer}>
        <Entypo name="plus" size={30} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
