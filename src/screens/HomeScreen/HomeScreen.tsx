import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies, posts } from "../../data/dummy_data";
import PostCard from "../../components/cards/PostCard";
import ImagePickerComponent from "../../components/ImagePicker/ImagePicker";
import { COLORS } from "../../theme/colors";
import {
  updateUserImage,
  uploadProfileImage,
  createPost,
} from "../../services/firebase/firebaseServices";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/NavigationTypes";
import { Icons } from "../../components/home/Icons";
import { CreatePostModal } from "../../components/home/CreatePostModal";
import { SearchBar } from "../../components/home/SearchBar";
import { TrendingTopics } from "../../components/home/TrendingTopics";

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedHobby, setSelectedHobby] = useState<string>("default");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [postDescription, setPostDescription] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");
  const [postHobby, setPostHobby] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [localProfile, setLocalProfile] = useState<any>(null);

  const handleImageSelected = async (imageUri: string) => {
    if (!user?.id || isUpdating) return;

    setIsUpdating(true);
    try {
      const uploadResponse = await uploadProfileImage(user.id, imageUri);
      if (!uploadResponse.success || !uploadResponse.user?.image) {
        throw new Error(uploadResponse.message);
      }

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
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePostImageSelected = (imageUri: string) => {
    setPostImage(imageUri);
  };

  const handleCreatePost = async () => {
    if (!user?.id || !postDescription || !postHobby) return;

    try {
      const response = await createPost(
        user.id,
        postDescription,
        postImage,
        postHobby
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      setIsModalVisible(false);
      setPostDescription("");
      setPostImage("");
      setPostHobby("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <ImagePickerComponent
          currentImage={user.image}
          onImageSelected={handleImageSelected}
          size={40}
        />
        <Text style={styles.welcomeText}>HELLO {user.name}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handleOpenDrawer}>
          <Icons.Menu name="menu" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onClear={() => setSearchText("")}
      />

      <TrendingTopics
        hobbies={hobbies}
        selectedHobby={selectedHobby}
        onHobbySelect={setSelectedHobby}
      />

      <View style={styles.postsContainer}>
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

      <TouchableOpacity
        style={styles.addPostContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Icons.Plus name="plus" size={30} color={COLORS.secondary} />
      </TouchableOpacity>

      <CreatePostModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        postDescription={postDescription}
        setPostDescription={setPostDescription}
        postHobby={postHobby}
        setPostHobby={setPostHobby}
        onPost={handleCreatePost}
        onImageSelect={handlePostImageSelected}
        selectedImage={postImage}
      />
    </View>
  );
};

export default HomeScreen;
