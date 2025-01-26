import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies } from "../../data/dummy_data";
import HobbiesCard from "../../components/cards/HobbiesCard";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  console.log(user);
  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <Text>HELLO</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={hobbies}
          renderItem={({ item }) => <HobbiesCard hobbyName={item.name} />}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
