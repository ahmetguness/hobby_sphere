import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  upperContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  appNameText: {
    fontWeight: "bold",
    fontSize: 32,
  },
  textInputContainer: {
    width: "80%",
    marginHorizontal: "10%",
  },
  textInput: {
    borderBottomWidth: 1,
    marginTop: "2%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    position: "absolute",
    left: 8,
    top: 8,
  },
});
