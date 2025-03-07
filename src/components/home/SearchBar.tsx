import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import { Icons } from "./Icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search"
      value={value}
      onChangeText={onChangeText}
    />
    <TouchableOpacity onPress={onClear} style={styles.icon}>
      {value.length > 0 ? (
        <Icons.Cross name="cross" size={24} color={COLORS.secondary} />
      ) : (
        <Icons.Search name="search1" size={24} color={COLORS.secondary} />
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    marginTop: "4%",
    borderRadius: 15,
    borderColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 0.9,
    paddingLeft: "4%",
  },
  icon: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
}); 