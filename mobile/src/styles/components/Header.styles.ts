import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS, FONTS } from "../../theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight() + 16,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginRight: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
