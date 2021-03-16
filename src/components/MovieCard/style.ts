import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
  cardCont: {
    width: "100%",
    flexDirection: "row",
    paddingStart: 5,
    paddingEnd: 10,
    marginVertical: 5,
  },
  cardImg: {
    width: 100,
    height: 110,
    borderRadius: 5,
  },
  textCont: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: theme.colors.white,
  },
  overview: {
    fontSize: 14,
    color: theme.colors.white,
  },
  date: {
    fontSize: 12,
    color: theme.colors.white,
  },
  language: {
    fontSize: 12,
    color: theme.colors.white,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
    borderRadius: 15,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.white,
    fontWeight: "bold",
    marginEnd: 7,
  },
  voteCont: {
    flexDirection: "row",
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
