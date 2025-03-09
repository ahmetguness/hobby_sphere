import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { Icons } from "./Icons";
import { Comment } from "../../models/db_models/Comment";
import { User } from "../../models/User";
import {
  addComment,
  getPostComments,
  toggleCommentLike,
  toggleCommentDislike,
} from "../../services/firebase/firebaseServices";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  currentUser: User;
}

interface ExtendedComment extends Comment {
  likes: string[];
  dislikes: string[];
}

export const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  postId,
  currentUser,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interactionLoading, setInteractionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await getPostComments(postId);
      if (response.success && response.comments) {
        setComments(response.comments as ExtendedComment[]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await addComment(
        postId,
        currentUser.id,
        commentText.trim()
      );
      if (response.success && response.comment) {
        const newComment: ExtendedComment = {
          ...response.comment,
          likes: [],
          dislikes: [],
        };
        setComments((prevComments) => [newComment, ...prevComments]);
        setCommentText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (comment: ExtendedComment) => {
    if (interactionLoading[comment.commentId]) return;

    setInteractionLoading((prev) => ({ ...prev, [comment.commentId]: true }));

    const isLiked = comment.likes?.includes(currentUser.id) || false;
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.commentId === comment.commentId) {
          return {
            ...c,
            likes: isLiked
              ? (c.likes || []).filter((id) => id !== currentUser.id)
              : [...(c.likes || []), currentUser.id],
            dislikes: (c.dislikes || []).filter((id) => id !== currentUser.id),
          };
        }
        return c;
      })
    );

    try {
      await toggleCommentLike(
        postId,
        comment.commentId,
        currentUser.id,
        isLiked
      );
    } catch (error) {
      console.error("Error toggling like:", error);

      setComments((prevComments) =>
        prevComments.map((c) => {
          if (c.commentId === comment.commentId) {
            return comment;
          }
          return c;
        })
      );
    } finally {
      setInteractionLoading((prev) => ({
        ...prev,
        [comment.commentId]: false,
      }));
    }
  };

  const handleDislike = async (comment: ExtendedComment) => {
    if (interactionLoading[comment.commentId]) return;

    setInteractionLoading((prev) => ({ ...prev, [comment.commentId]: true }));

    const isDisliked = comment.dislikes?.includes(currentUser.id) || false;
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.commentId === comment.commentId) {
          return {
            ...c,
            dislikes: isDisliked
              ? (c.dislikes || []).filter((id) => id !== currentUser.id)
              : [...(c.dislikes || []), currentUser.id],
            likes: (c.likes || []).filter((id) => id !== currentUser.id),
          };
        }
        return c;
      })
    );

    try {
      await toggleCommentDislike(
        postId,
        comment.commentId,
        currentUser.id,
        isDisliked
      );
    } catch (error) {
      console.error("Error toggling dislike:", error);
      setComments((prevComments) =>
        prevComments.map((c) => {
          if (c.commentId === comment.commentId) {
            return comment;
          }
          return c;
        })
      );
    } finally {
      setInteractionLoading((prev) => ({
        ...prev,
        [comment.commentId]: false,
      }));
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return "yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const renderComment = ({ item }: { item: ExtendedComment }) => {
    const isLiked = item.likes?.includes(currentUser.id) || false;
    const isDisliked = item.dislikes?.includes(currentUser.id) || false;
    const isInteracting = interactionLoading[item.commentId];

    return (
      <View style={styles.commentItem}>
        <View style={styles.commentUserInfo}>
          <Image
            source={{
              uri: currentUser.image || "https://via.placeholder.com/40",
            }}
            style={styles.userAvatar}
          />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUser}>{currentUser.name}</Text>
              <Text style={styles.commentDate}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
            <View style={styles.commentActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(item)}
                disabled={isInteracting}
              >
                {isInteracting ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <>
                    <FontAwesome
                      name={isLiked ? "thumbs-up" : "thumbs-o-up"}
                      size={16}
                      color={isLiked ? COLORS.primary : COLORS.text}
                    />
                    <Text
                      style={[
                        styles.actionText,
                        isLiked && styles.actionTextActive,
                      ]}
                    >
                      {item.likes?.length || 0}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDislike(item)}
                disabled={isInteracting}
              >
                {isInteracting ? (
                  <ActivityIndicator size="small" color={COLORS.error} />
                ) : (
                  <>
                    <FontAwesome
                      name={isDisliked ? "thumbs-down" : "thumbs-o-down"}
                      size={16}
                      color={isDisliked ? COLORS.error : COLORS.text}
                    />
                    <Text
                      style={[
                        styles.actionText,
                        isDisliked && styles.actionTextError,
                      ]}
                    >
                      {item.dislikes?.length || 0}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
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
              <FontAwesome name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Comments</Text>
            <View style={styles.headerRight} />
          </View>

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={styles.loader}
            />
          ) : (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.commentId}
              contentContainerStyle={styles.commentsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <FontAwesome
                    name="comments-o"
                    size={48}
                    color={COLORS.textLight}
                  />
                  <Text style={styles.emptyText}>No comments yet.</Text>
                  <Text style={styles.emptySubText}>
                    Be the first to share your thoughts!
                  </Text>
                </View>
              )}
            />
          )}

          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: currentUser.image || "https://via.placeholder.com/32",
              }}
              style={styles.inputUserAvatar}
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={500}
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !commentText.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitComment}
                disabled={!commentText.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <FontAwesome name="send" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            </View>
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  loader: {
    flex: 1,
  },
  commentsList: {
    padding: 16,
  },
  commentItem: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentUserInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  commentDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  commentText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textLight,
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 50,
    marginRight: -40,
    maxHeight: 100,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
  },
  actionTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  actionTextError: {
    color: COLORS.error,
    fontWeight: "600",
  },
});
