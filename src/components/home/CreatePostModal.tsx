import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { Icons } from "./Icons";
import { hobbies } from "../../data/dummy_data";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  postDescription: string;
  setPostDescription: (text: string) => void;
  postHobby: string;
  setPostHobby: (hobby: string) => void;
  onPost: () => void;
  onImageSelect: (uri: string) => void;
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
}) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Create New Post</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icons.Cross name="cross" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.hobbySelector}>
            <Text style={styles.hobbyLabel}>Select Hobby:</Text>
            <View style={styles.hobbyInputContainer}>
              <TextInput
                style={styles.hobbyInput}
                placeholder="Or type your hobby"
                value={postHobby}
                onChangeText={setPostHobby}
              />
            </View>
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
                  onPress={() => setPostHobby(item.name)}
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
            />
          </View>
          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            multiline
            numberOfLines={4}
            value={postDescription}
            onChangeText={setPostDescription}
          />
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => {}}
          >
            <Icons.Image name="image" size={24} color={COLORS.primary} />
            <Text style={styles.imageUploadText}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={onPost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

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
    height: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  hobbySelector: {
    marginBottom: 16,
  },
  hobbyLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  hobbyInputContainer: {
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
  postInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  imageUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },
  postButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  postButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
}); 