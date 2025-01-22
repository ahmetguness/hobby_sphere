import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface TextButtonProps {
  label: string;
}

const TextButton: React.FC<TextButtonProps> = ({ label }) => {
  return (
    <TouchableOpacity>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  root: {},
});
