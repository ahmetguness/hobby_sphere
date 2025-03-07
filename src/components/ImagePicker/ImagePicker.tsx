import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../theme/colors";

interface ImagePickerProps {
  currentImage: string | null;
  onImageSelected: (imageUri: string) => void;
  size?: number;
  disabled?: boolean;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  currentImage,
  onImageSelected,
  size = 40,
  disabled = false,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelection = async (
    result: ImagePicker.ImagePickerResult
  ) => {
    if (!result.canceled) {
      setIsLoading(true);
      setModalVisible(false);
      try {
        const imageUri = result.assets[0].uri;
        await onImageSelected(imageUri);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    await handleImageSelection(result);
  };

  const takePhotoWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    await handleImageSelection(result);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled || isLoading}
      >
        <View style={[styles.imageContainer, { width: size, height: size }]}>
          <Image
            style={[styles.avatarImage, { width: size, height: size }]}
            source={
              currentImage
                ? { uri: currentImage }
                : require("../../assets/avatars/default_avatar.png")
            }
          />
          {isLoading && (
            <View
              style={[styles.loadingContainer, { width: size, height: size }]}
            >
              <ActivityIndicator color={COLORS.primary} />
            </View>
          )}
        </View>
      </TouchableOpacity>

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
              disabled={isLoading}
            />
            <Button
              title="Take a Photo"
              onPress={takePhotoWithCamera}
              disabled={isLoading}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
              disabled={isLoading}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  avatarImage: {
    borderRadius: 20,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ImagePickerComponent;
