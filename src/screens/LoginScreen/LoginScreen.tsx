import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { styles } from "./styles";
import { COLORS, GRADIENTCOLORS } from "../../theme/colors";
import TR from "../../locales/tr.json";
import GradientTextButton from "../../components/buttons/GradientTextButton";
import TextButton from "../../components/buttons/TextButton";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";
import { AppDispatch } from "../../hooks/redux/store";
import { HomeScreenNavigationProp } from "../../types/NavigationTypes";
import {
  createUser,
  validateUserCredentials,
} from "../../services/firebase/firebaseServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TextInputContainerProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
}

const TextInputContainer: React.FC<TextInputContainerProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
}) => (
  <View style={styles.textInputContainer}>
    <Text>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const useForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return { formData, handleInputChange, resetForm };
};

const LoginScreen: React.FC = () => {
  const LAN = TR;
  const { formData, handleInputChange, resetForm } = useForm();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (isMounted && user) {
        dispatch(setUserInfo(JSON.parse(user)));
        navigation.navigate("HomeScreen");
      }
      if (isMounted) setLoading(false);
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigation]);

  const handleLogin = async () => {
    setIsLogged(true);
    const { email, password } = formData;
    const result = await validateUserCredentials(email, password);

    if (result.success && result.user) {
      dispatch(setUserInfo(result.user));
      navigation.navigate("HomeScreen");
      if (isChecked) {
        await AsyncStorage.setItem("user", JSON.stringify(result.user));
      }
    } else {
      Alert.alert("Login Failed", "User information is missing.");
    }
    resetForm();
    setIsLogged(false);
  };

  const handleRegister = async () => {
    setIsLogged(true);
    const { email, password, confirmPassword, name } = formData;

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      setIsLogged(false);
      return;
    }

    try {
      const result = await createUser(email, password, name);

      if (result.success && result.user) {
        dispatch(setUserInfo(result.user));
        navigation.navigate("HomeScreen");
        setIsRegisterMode(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An error occurred during the registration process.");
    }

    resetForm();
    setIsLogged(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      style={styles.root}
      colors={GRADIENTCOLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.upperContainer}>
        {isRegisterMode ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              setIsRegisterMode(false);
              resetForm();
            }}
          >
            <Ionicons name="chevron-back" size={26} color={COLORS.black} />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.appNameText}>{LAN.appName}</Text>
      </View>

      <View style={styles.bottomContainer}>
        {isRegisterMode ? (
          <>
            <TextInputContainer
              label="Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
            <TextInputContainer
              label="E-Mail"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <TextInputContainer
              label="Password"
              value={formData.password}
              secureTextEntry
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TextInputContainer
              label="Confirm Password"
              value={formData.confirmPassword}
              secureTextEntry
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
            />

            {isLogged ? (
              <ActivityIndicator
                animating={isLogged}
                size={32}
                color={COLORS.primary}
              />
            ) : (
              <GradientTextButton label="Register" onPress={handleRegister} />
            )}
          </>
        ) : (
          <>
            <TextInputContainer
              label="E-Mail"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <TextInputContainer
              label="Password"
              value={formData.password}
              secureTextEntry
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <View style={{ width: "100%" }}>
              {isLogged ? (
                <ActivityIndicator
                  animating={isLogged}
                  size={32}
                  color={COLORS.primary}
                />
              ) : (
                <GradientTextButton label="Log In" onPress={handleLogin} />
              )}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "4%",
                  flexDirection: "row",
                }}
              >
                <Checkbox value={isChecked} onValueChange={setChecked} />
                <Text style={{ marginLeft: "2%" }}>Keep logged in</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TextButton
                label="Register"
                onPress={() => {
                  setIsRegisterMode(true);
                  resetForm();
                }}
              />
              <TextButton
                label="Forgot Password"
                onPress={() => console.log("Forgot Password pressed")}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
