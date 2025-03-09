import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Query,
  limit,
  Timestamp,
  arrayRemove,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";
import { User } from "../../models/User";
import { Post } from "../../models/db_models/Post";
import { dbActionResponse } from "../../models/ServiceModels";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const getErrorMessage = (error: unknown): string => {
  let errorMessage = "An error occurred. Please try again later.";

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use. Please try another one.";
        break;
      case "auth/weak-password":
        errorMessage =
          "The password is too weak. Please choose a stronger one.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your internet connection.";
        break;
      default:
        errorMessage = `Operation failed with error code: ${error.code}`;
        break;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
};

export const createUser = async (
  email: string,
  password: string,
  name: string
): Promise<dbActionResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    const user: User = {
      id: userId,
      email,
      password,
      name,
      hobbies: [],
      image: "",
      posts: [],
      comments: [],
      likes: [],
    };

    await setDoc(doc(db, "users", userId), user);

    return {
      success: true,
      message: "User created successfully",
      user,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<dbActionResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data() as User | undefined;

      if (userData) {
        return {
          success: true,
          message: "Login successful",
          user: userData,
        };
      } else {
        return {
          success: false,
          message: "User data is missing.",
        };
      }
    } else {
      return {
        success: false,
        message: "User data not found.",
      };
    }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const uploadProfileImage = async (
  userId: string,
  uri: string
): Promise<dbActionResponse> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `users/${userId}.jpg`);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    return {
      success: true,
      message: "Image uploaded successfully",
      user: { id: userId, image: downloadURL } as User,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateUserImage = async (
  userId: string,
  imageUrl: string
): Promise<dbActionResponse> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { image: imageUrl });

    return {
      success: true,
      message: "User image updated successfully",
      user: { id: userId, image: imageUrl } as User,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createPost = async (
  userId: string,
  description: string,
  imageUri: string,
  hobbyId: string
): Promise<dbActionResponse> => {
  try {
    let imageUrl = "";

    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const imageRef = ref(storage, `posts/${Date.now()}_${userId}.jpg`);
      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);
    }

    const post: Post = {
      postId: Date.now().toString(),
      userId,
      description,
      image: imageUrl,
      subHobbyId: hobbyId,
      createdAt: new Date(),
      isHighlited: false,
      likes: [],
      dislikes: [],
      commentsCount: 0,
    };

    const postsRef = collection(db, "posts");
    await setDoc(doc(postsRef, post.postId), post);

    return {
      success: true,
      message: "Post created successfully",
      post,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

interface GetPostsOptions {
  userId?: string;
  hobbyId?: string;
  limit?: number;
  isHighlighted?: boolean;
}

export const getPosts = async (
  options?: GetPostsOptions
): Promise<dbActionResponse> => {
  try {
    const postsRef = collection(db, "posts");
    let postsQuery: Query = postsRef;

    if (options) {
      if (options.userId) {
        postsQuery = query(postsQuery, where("userId", "==", options.userId));
      }
      if (options.hobbyId) {
        postsQuery = query(
          postsQuery,
          where("subHobbyId", "==", options.hobbyId)
        );
      }
      if (options.isHighlighted !== undefined) {
        postsQuery = query(
          postsQuery,
          where("isHighlited", "==", options.isHighlighted)
        );
      }
      if (options.limit) {
        postsQuery = query(postsQuery, limit(options.limit));
      }
    }

    postsQuery = query(postsQuery, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(postsQuery);
    const posts: Post[] = [];

    for (const doc of querySnapshot.docs) {
      const postData = doc.data();

      posts.push({
        ...postData,
        createdAt: (postData.createdAt as Timestamp).toDate(),
      } as Post);
    }

    return {
      success: true,
      message: "Posts fetched successfully",
      posts,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

interface PostInteraction {
  userId: string;
  type: "like" | "dislike";
  createdAt: Date;
}

interface Comment {
  commentId: string;
  userId: string;
  postId: string;
  text: string;
  createdAt: Date;
  likes: string[];
  dislikes: string[];
}

export const togglePostLike = async (
  postId: string,
  userId: string,
  currentLikeState: boolean
): Promise<dbActionResponse> => {
  try {
    const postRef = doc(db, "posts", postId);
    const interactionRef = doc(db, `posts/${postId}/interactions/${userId}`);

    const interactionDoc = await getDoc(interactionRef);

    if (currentLikeState) {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
      if (interactionDoc.exists()) {
        await deleteDoc(interactionRef);
      }
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
        dislikes: arrayRemove(userId),
      });

      const interaction: PostInteraction = {
        userId,
        type: "like",
        createdAt: new Date(),
      };

      await setDoc(interactionRef, interaction);
    }

    return {
      success: true,
      message: currentLikeState ? "Post unliked" : "Post liked",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const togglePostDislike = async (
  postId: string,
  userId: string,
  currentDislikeState: boolean
): Promise<dbActionResponse> => {
  try {
    const postRef = doc(db, "posts", postId);
    const interactionRef = doc(db, `posts/${postId}/interactions/${userId}`);

    const interactionDoc = await getDoc(interactionRef);

    if (currentDislikeState) {
      await updateDoc(postRef, {
        dislikes: arrayRemove(userId),
      });
      if (interactionDoc.exists()) {
        await deleteDoc(interactionRef);
      }
    } else {
      await updateDoc(postRef, {
        dislikes: arrayUnion(userId),
        likes: arrayRemove(userId),
      });

      const interaction: PostInteraction = {
        userId,
        type: "dislike",
        createdAt: new Date(),
      };

      await setDoc(interactionRef, interaction);
    }

    return {
      success: true,
      message: currentDislikeState ? "Post undisliked" : "Post disliked",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const addComment = async (
  postId: string,
  userId: string,
  text: string
): Promise<dbActionResponse> => {
  try {
    const commentsRef = collection(db, `posts/${postId}/comments`);

    const comment: Comment = {
      commentId: Date.now().toString(),
      userId,
      postId,
      text,
      createdAt: new Date(),
      likes: [],
      dislikes: [],
    };

    await setDoc(doc(commentsRef, comment.commentId), comment);

    return {
      success: true,
      message: "Comment added successfully",
      comment,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getPostComments = async (
  postId: string
): Promise<dbActionResponse> => {
  try {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      comments.push({
        ...commentData,
        createdAt: (commentData.createdAt as Timestamp).toDate(),
        likes: commentData.likes || [],
        dislikes: commentData.dislikes || [],
      } as Comment);
    });

    return {
      success: true,
      message: "Comments fetched successfully",
      comments,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const toggleCommentLike = async (
  postId: string,
  commentId: string,
  userId: string,
  currentLikeState: boolean
): Promise<dbActionResponse> => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);

    if (currentLikeState) {
      await updateDoc(commentRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(commentRef, {
        likes: arrayUnion(userId),
        dislikes: arrayRemove(userId),
      });
    }

    return {
      success: true,
      message: currentLikeState ? "Comment unliked" : "Comment liked",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const toggleCommentDislike = async (
  postId: string,
  commentId: string,
  userId: string,
  currentDislikeState: boolean
): Promise<dbActionResponse> => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);

    if (currentDislikeState) {
      await updateDoc(commentRef, {
        dislikes: arrayRemove(userId),
      });
    } else {
      await updateDoc(commentRef, {
        dislikes: arrayUnion(userId),
        likes: arrayRemove(userId),
      });
    }

    return {
      success: true,
      message: currentDislikeState ? "Comment undisliked" : "Comment disliked",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
