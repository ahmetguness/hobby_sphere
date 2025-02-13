import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { styles } from "./styles";
import { hobbies } from "../../data/dummy_data";
import HobbiesCard from "../../components/cards/HobbiesCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../theme/colors";
import Feather from "@expo/vector-icons/Feather";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const user = useSelector((state: RootState) => state.user.userInfo);

  return (
    <View style={styles.root}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity>
          <Image
            style={styles.avatarImage}
            source={require("../../assets/avatars/default_avatar.png")}
          />
        </TouchableOpacity>
        <Text>HELLO {user.name}</Text>
        <TouchableOpacity>
          <Feather name="menu" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onPress={() => setSearchText("")}
          style={styles.searchIcon}
        >
          {searchText.length > 0 ? (
            <Entypo name="cross" size={24} color={COLORS.secondary} />
          ) : (
            <AntDesign name="search1" size={24} color={COLORS.secondary} />
          )}
        </TouchableOpacity>
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
