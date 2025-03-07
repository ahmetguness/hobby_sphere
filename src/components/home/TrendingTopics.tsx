import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import HobbiesCard from "../cards/HobbiesCard";

interface TrendingTopicsProps {
  hobbies: Array<{ name: string }>;
  selectedHobby: string;
  onHobbySelect: (hobby: string) => void;
}

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  hobbies,
  selectedHobby,
  onHobbySelect,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trending Topics:</Text>
      </View>
      <FlatList
        data={hobbies}
        renderItem={({ item }) => (
          <HobbiesCard
            hobbyName={item.name}
            onPress={() => onHobbySelect(item.name)}
          />
        )}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "5%",
  },
  header: {
    flexDirection: "row",
  },
  titleContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.primary,
    padding: 10,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
}); 