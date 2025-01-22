import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENTCOLORS } from "../../theme/colors";

interface GradientTextButtonProps {
  label: string;
  onPress: () => void;
}

const GradientTextButton: React.FC<GradientTextButtonProps> = ({
  label,
  onPress,
}) => {
  return (
    <LinearGradient
      style={styles.lg}
      colors={GRADIENTCOLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
        style={styles.root}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientTextButton;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lg: {
    height: 40,
    width: "40%",
    marginHorizontal: "30%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
