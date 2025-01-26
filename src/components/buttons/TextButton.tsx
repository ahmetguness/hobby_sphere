import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface TextButtonProps {
  label: string;
  onPress: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  root: {},
});
