import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.white,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  followButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followingButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  followButtonText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 14,
  },
  followingButtonText: {
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    padding: 16,
    marginTop: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "400",
  },
  hobbyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 6,
  },
  hobbyText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  bioText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
