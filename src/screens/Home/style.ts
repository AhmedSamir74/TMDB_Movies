import { StyleSheet } from "react-native";
import { theme } from "../../constants";
export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  activityIndicatorCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerCont: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  listCont: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: theme.colors.accent,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  searchBarInput: {
    color: theme.colors.white,
  },
});
