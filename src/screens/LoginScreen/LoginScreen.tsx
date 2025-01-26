import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { styles } from "./styles";
import { GRADIENTCOLORS } from "../../theme/colors";
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

interface TextInputContainerProps extends TextInputProps {
  label: string;
}

const TextInputContainer: React.FC<TextInputContainerProps> = ({
  label,
  ...props
}) => (
  <View style={styles.textInputContainer}>
    <Text>{label}</Text>
    <TextInput style={styles.textInput} {...props} />
  </View>
);

const LoginScreen: React.FC = () => {
  const LAN = TR;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const result = await validateUserCredentials(email, password);
    if (result.success) {
      if (result.user) {
        dispatch(setUserInfo(result.user));
      } else {
        Alert.alert("Login Failed", "User information is missing.");
      }
      navigation.navigate("HomeScreen");
    } else {
      console.log("hata");
    }

    resetForm();
  };

  const handleRegister = async () => {
    try {
      const email = formData.email;
      const password = formData.password;
      const name = formData.name;

      const response = await createUser(email, password, name);

      if (response.success) {
        if (response.user) {
          dispatch(setUserInfo(response.user));
          navigation.navigate("HomeScreen");
        } else {
          Alert.alert("Registration Failed", "User information is missing.");
        }
        setIsRegisterMode(false);
        resetForm();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Kayıt işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <LinearGradient
      style={styles.root}
      colors={GRADIENTCOLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.upperContainer}>
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
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <GradientTextButton label="Register" onPress={handleRegister} />
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
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <GradientTextButton label="Log In" onPress={handleLogin} />
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
