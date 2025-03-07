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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  hobbySelector: {
    marginBottom: 16,
  },
  hobbyLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  hobbyInputContainer: {
    marginBottom: 12,
  },
  hobbyInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hobbyOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedHobby: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  hobbyOptionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  selectedHobbyText: {
    color: COLORS.white,
  },
  postInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  imageUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },
  postButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  postButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
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
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  postsContainer: {
    flex: 1,
    marginTop: "4%",
    marginBottom: "10%",
  },
});
