import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies } from "../../data/dummy_data";
import HobbiesCard from "../../components/cards/HobbiesCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../theme/colors";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedHobby, setSelectedHobby] = useState<string>("default");
  const user = useSelector((state: RootState) => state.user.userInfo);

  const [isModalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const takePhotoWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleAvatarPress}>
          <Image
            style={styles.avatarImage}
            source={
              avatar
                ? { uri: avatar }
                : require("../../assets/avatars/default_avatar.png")
            }
          />
        </TouchableOpacity>
        <Text>HELLO {user.name}</Text>
        <TouchableOpacity activeOpacity={0.8}>
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

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Photo</Text>
            <Button
              title="Select from Gallery"
              onPress={pickImageFromGallery}
            />
            <Button title="Take a Photo" onPress={takePhotoWithCamera} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
