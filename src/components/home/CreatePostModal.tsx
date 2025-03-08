import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { Icons } from "./Icons";
import { hobbies } from "../../data/dummy_data";
import * as ImagePicker from "expo-image-picker";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  postDescription: string;
  setPostDescription: (text: string) => void;
  postHobby: string;
  setPostHobby: (hobby: string) => void;
  onPost: () => void;
  onImageSelect: (uri: string) => void;
  selectedImage?: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  visible,
  onClose,
  postDescription,
  setPostDescription,
  postHobby,
  setPostHobby,
  onPost,
  onImageSelect,
  selectedImage,
}) => {
  const [hobbyError, setHobbyError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
    }
  };

  const getImageName = (uri: string) => {
    return uri.split("/").pop() || "Selected Image";
  };

  const handlePost = async () => {
    if (!postHobby || postHobby.trim() === "") {
      setHobbyError(true);
      Alert.alert(
        "Missing Hobby",
        "Please select or enter a hobby for your post."
      );
      return;
    }

    if (!postDescription && !selectedImage) {
      Alert.alert(
        "Missing Content",
        "Please add some text or an image to your post."
      );
      return;
    }

    setHobbyError(false);
    setIsPosting(true);
    try {
      await onPost();
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icons.Cross name="cross" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <View style={styles.headerRight} />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalContent}>
              <View style={styles.hobbySelector}>
                <Text style={styles.sectionTitle}>
                  Choose a hobby for your post
                </Text>
                <FlatList
                  data={hobbies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.hobbyOption,
                        postHobby === item.name && styles.selectedHobby,
                      ]}
                      onPress={() => {
                        setPostHobby(item.name);
                        setHobbyError(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.hobbyOptionText,
                          postHobby === item.name && styles.selectedHobbyText,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.name}
                  ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                  style={styles.hobbyList}
                />
                <TextInput
                  style={[
                    styles.hobbyInput,
                    hobbyError && styles.hobbyInputError,
                  ]}
                  placeholder="Or type your own hobby..."
                  value={postHobby}
                  onChangeText={(text) => {
                    setPostHobby(text);
                    setHobbyError(false);
                  }}
                />
              </View>

              <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Share your thoughts</Text>
                <TextInput
                  style={styles.postInput}
                  placeholder="What's on your mind?"
                  multiline
                  numberOfLines={4}
                  value={postDescription}
                  onChangeText={setPostDescription}
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImagePreview}
              />
            )}
            <TouchableOpacity
              style={[
                styles.imageUploadButton,
                selectedImage && styles.imageUploadButtonSelected,
              ]}
              onPress={pickImage}
            >
              <View style={styles.imageUploadContent}>
                <Icons.Image name="image" size={24} color={COLORS.primary} />
                <Text style={styles.imageUploadText}>
                  {selectedImage
                    ? getImageName(selectedImage)
                    : "Choose from gallery"}
                </Text>
              </View>
              {selectedImage && (
                <Icons.Cross name="check" size={20} color={COLORS.success} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.postButton,
                isPosting && styles.postButtonDisabled
              ]}
              onPress={handlePost}
              activeOpacity={0.8}
              disabled={isPosting}
            >
              {isPosting ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.postButtonText}>Share Post</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  modalContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  bottomContainer: {
    padding: 12,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === "ios" ? 24 : 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    flex: 1,
  },
  closeButton: {
    padding: 8,
    width: 40,
  },
  hobbySelector: {
    marginBottom: 24,
  },
  hobbyList: {
    marginBottom: 12,
  },
  hobbyInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hobbyOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedHobby: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  hobbyOptionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  selectedHobbyText: {
    color: COLORS.white,
  },
  contentSection: {
    marginBottom: 0,
  },
  postInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
    textAlignVertical: "top",
    minHeight: 100,
  },
  selectedImagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  imageUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
  },
  imageUploadButtonSelected: {
    backgroundColor: COLORS.backgroundLight,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  imageUploadContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imageUploadText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },
  hobbyInputError: {
    borderColor: COLORS.error,
  },
  postButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 52,
  },
  postButtonDisabled: {
    opacity: 0.7,
  },
  postButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
