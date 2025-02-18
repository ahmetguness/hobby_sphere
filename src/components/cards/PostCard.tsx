import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useReducer } from "react";
import { Post } from "../../data/dummy_data";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../../theme/colors";

interface PostCardProps extends Post {}

const initialState = { isLiked: false, isDisliked: false };

type InteractionState = typeof initialState;
type InteractionAction = { type: "TOGGLE_LIKE" } | { type: "TOGGLE_DISLIKE" };

const interactionReducer = (
  state: InteractionState,
  action: InteractionAction
): InteractionState => {
  switch (action.type) {
    case "TOGGLE_LIKE":
      return { isLiked: !state.isLiked, isDisliked: false };
    case "TOGGLE_DISLIKE":
      return { isLiked: false, isDisliked: !state.isDisliked };
    default:
      return state;
  }
};

const PostCard: React.FC<PostCardProps> = ({
  user,
  description,
  image,
  topic,
}) => {
  const [interactionState, dispatch] = useReducer(
    interactionReducer,
    initialState
  );

  return (
    <View style={[styles.root, !image && styles.rootWithoutImage]}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.avatarImage}
          source={require("../../assets/avatars/default_avatar.png")}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.userText}>
          {user} ~ {topic}
        </Text>
        <Text style={styles.descText} numberOfLines={3}>
          {description}
        </Text>
        {image ? (
          <View style={styles.imageContainer}>
            <Image style={styles.postImage} source={{ uri: image }} />
          </View>
        ) : null}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch({ type: "TOGGLE_LIKE" })}
          >
            <AntDesign
              name="like2"
              size={24}
              color={interactionState.isLiked ? COLORS.primary : COLORS.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch({ type: "TOGGLE_DISLIKE" })}
          >
            <AntDesign
              name="dislike2"
              size={24}
              color={
                interactionState.isDisliked ? COLORS.secondary : COLORS.black
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("comment")}
          >
            <FontAwesome name="comment-o" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("report")}
          >
            <MaterialIcons
              name="report-gmailerrorred"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.primary,
    paddingVertical: 10,
  },
  rootWithoutImage: {
    paddingVertical: 5,
  },
  userText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  descText: {
    marginHorizontal: "5%",
    fontSize: 15,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
  },
  leftContainer: {
    flex: 0.12,
    alignItems: "center",
    marginTop: "2%",
  },
  rightContainer: {
    flex: 0.88,
    marginTop: "2%",
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  postImage: {
    height: 200,
    width: "90%",
    marginHorizontal: "5%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "2%",
    marginTop: "4%",
  },
});
