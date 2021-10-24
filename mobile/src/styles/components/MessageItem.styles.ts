import { StyleSheet } from "react-native";
import { FONTS, COLORS } from "../../theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36,
  },
  message: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  userName: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginLeft: 12,
  },
});
