import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies, posts } from "../../data/dummy_data";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  resetSelectedProfile,
  setSelectedProfile,
} from "../../hooks/redux/Slices/ProfileSlice";
import { useNavigation } from "@react-navigation/native";
import { UserProfileScreenNavigationProp } from "../../types/NavigationTypes";
import ImagePickerComponent from "../../components/ImagePicker/ImagePicker";
import PostCard from "../../components/cards/PostCard";
import { COLORS } from "../../theme/colors";
import {
  updateUserImage,
  uploadProfileImage,
} from "../../services/firebase/firebaseServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";

const UserProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profileInfo);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const navigation = useNavigation<UserProfileScreenNavigationProp>();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  const handleImageSelected = async (imageUri: string) => {
    if (profile?.id && !isUpdating) {
      setIsUpdating(true);
      try {
        const uploadResponse = await uploadProfileImage(profile.id, imageUri);

        if (uploadResponse.success && uploadResponse.user?.image) {
          const updateResponse = await updateUserImage(
            profile.id,
            uploadResponse.user.image
          );

          if (!updateResponse.success) {
            throw new Error(updateResponse.message);
          }

          const updatedProfile = {
            ...profile,
            image: uploadResponse.user.image,
          };
          const updatedUser = { ...user, image: uploadResponse.user.image };

          dispatch(setSelectedProfile(updatedProfile));
          dispatch(setUserInfo(updatedUser));

          await AsyncStorage.setItem(
            "selectedProfile",
            JSON.stringify(updatedProfile)
          );
          await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

          setLocalProfile(updatedProfile);
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

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            dispatch(resetSelectedProfile());
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <ImagePickerComponent
            currentImage={profile.image}
            onImageSelected={handleImageSelected}
            size={100}
            disabled={isUpdating}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollowPress}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>123</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>456</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>789</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={hobbies.slice(0, 4)}
            renderItem={({ item }) => (
              <View style={styles.hobbyItem}>
                <Ionicons name="heart" size={20} color={COLORS.primary} />
                <Text style={styles.hobbyText}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts.slice(0, 3)}
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
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;
