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
  modalRootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInnerContainer: {
    backgroundColor: "gray",
    height: 200,
    width: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.text,
  },
  addPostContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 40,
  },
});
