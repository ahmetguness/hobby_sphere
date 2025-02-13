import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: "6.5%",
  },
  navbarContainer: {
    alignItems: "center",
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlistContainer: {
    width: "100%",
    marginTop: "5%",
  },
  searchBarContainer: {
    borderWidth: 2,
    marginTop: "4%",
    borderRadius: 15,
    borderColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchIcon: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 0.9,
    paddingLeft: "4%",
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
