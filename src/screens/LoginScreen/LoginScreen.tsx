import { View, Text, TextInput, TextInputProps, Alert } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENTCOLORS } from "../../theme/colors";
import { styles } from "./styles";
import TR from "../../locales/tr.json";
import EN from "../../locales/en.json";
import GradientTextButton from "../../components/buttons/GradientTextButton";
import TextButton from "../../components/buttons/TextButton";
import { users } from "../../data/dummy_data";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/NavigationTypes";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../hooks/redux/Slices/UserSlice";
interface TextInputContainerProps extends TextInputProps {
  label: string;
}

const TextInputContainer: React.FC<TextInputContainerProps> = ({
  label,
  ...props
}) => {
  return (
    <View style={styles.textInputContainer}>
      <Text>{label}</Text>
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
};

const LoginScreen = () => {
  const LAN = TR;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatcher = useDispatch();

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      dispatcher(setUserInfo(user));
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
    setEmail("");
    setPassword("");
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
        <TextInputContainer
          label="E Mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInputContainer
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <GradientTextButton label="Log In" onPress={handleLogin} />
        <View style={styles.buttonContainer}>
          <TextButton label="Register" />
          <TextButton label="Forgot Password" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
