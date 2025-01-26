import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

interface HobbiesCardProps {
  hobbyName: string;
  onPress?: () => void;
}

const HobbiesCard: React.FC<HobbiesCardProps> = ({ hobbyName, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.text}>{hobbyName}</Text>
    </TouchableOpacity>
  );
};

export default HobbiesCard;

const styles = StyleSheet.create({
  root: {
    width: 120,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
