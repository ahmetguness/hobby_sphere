import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";
import { User } from "../../models/User";
import { dbActionResponse } from "../../models/ServiceModels";

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
