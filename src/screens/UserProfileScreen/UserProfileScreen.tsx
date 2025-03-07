import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  resetSelectedProfile,
  setSelectedProfile,
} from "../../hooks/redux/Slices/ProfileSlice";
import { useNavigation } from "@react-navigation/native";
import { UserProfileScreenNavigationProp } from "../../types/NavigationTypes";
import ImagePickerComponent from "../../components/ImagePicker/ImagePicker";
import { COLORS } from "../../theme/colors";
import {
  updateUserImage,
  uploadProfileImage,
} from "../../services/firebase/firebaseServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";

interface ProfileHeaderProps {
  profile: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  isFollowing: boolean;
  onFollowPress: () => void;
  onMessagePress: () => void;
  isUpdating: boolean;
  onImageSelected: (uri: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isFollowing,
  onFollowPress,
  onMessagePress,
  isUpdating,
  onImageSelected,
}) => (
  <View style={styles.profileSection}>
    <View style={styles.profileHeader}>
      <ImagePickerComponent
        currentImage={profile.image}
        onImageSelected={onImageSelected}
        size={100}
        disabled={isUpdating}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <View style={styles.followButtonContainer}>
          <TouchableOpacity
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={onFollowPress}
            activeOpacity={0.9}
          >
            <Ionicons
              name={isFollowing ? "checkmark-circle" : "add-circle"}
              size={20}
              color={isFollowing ? COLORS.primary : COLORS.white}
            />
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={onMessagePress}
            activeOpacity={0.9}
          >
            <Ionicons
              name="chatbubble-ellipses"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const StatsSection = () => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <View style={styles.statContent}>
        <Ionicons
          name="document-text-outline"
          size={24}
          color={COLORS.primary}
        />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>123</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
      </View>
    </View>
    <View style={styles.statItem}>
      <View style={styles.statContent}>
        <Ionicons name="people-outline" size={24} color={COLORS.primary} />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>456</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
    </View>
    <View style={styles.statItem}>
      <View style={styles.statContent}>
        <Ionicons name="person-add-outline" size={24} color={COLORS.primary} />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>789</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  </View>
);

const UserProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profileInfo);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation<UserProfileScreenNavigationProp>();

  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleImageSelected = async (imageUri: string) => {
    if (!profile?.id || isUpdating) return;
    setIsUpdating(true);
    try {
      const uploadResponse = await uploadProfileImage(profile.id, imageUri);
      if (!uploadResponse.success || !uploadResponse.user?.image) {
        throw new Error(uploadResponse.message);
      }

      const updateResponse = await updateUserImage(
        profile.id,
        uploadResponse.user.image
      );
      if (!updateResponse.success) {
        throw new Error(updateResponse.message);
      }

      const updatedProfile = { ...profile, image: uploadResponse.user.image };
      const updatedUser = { ...user, image: uploadResponse.user.image };

      dispatch(setSelectedProfile(updatedProfile));
      dispatch(setUserInfo(updatedUser));

      await AsyncStorage.setItem(
        "selectedProfile",
        JSON.stringify(updatedProfile)
      );
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFollowPress = () => setIsFollowing(!isFollowing);
  const handleMessagePress = () => {};
  const handleBackPress = () => {
    dispatch(resetSelectedProfile());
    navigation.goBack();
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.darkText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ProfileHeader
          profile={profile}
          isFollowing={isFollowing}
          onFollowPress={handleFollowPress}
          onMessagePress={handleMessagePress}
          isUpdating={isUpdating}
          onImageSelected={handleImageSelected}
        />
        <StatsSection />
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;
