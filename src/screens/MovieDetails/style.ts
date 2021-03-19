import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, theme } from "../../constants";
export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#151c25",
  },
  loaderCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  transformedImgCont: {
    height: 100,
    width: SCREEN_WIDTH,
    overflow: "hidden",
    position: "absolute",
    zIndex: 1,
  },
  transformedCharacterImg: {
    flex: 1,
  },
  transformedTitleCont: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    padding: 10,
  },
  transformedTitle: {
    fontSize: 15,
    textAlign: "center",
    color: theme.colors.white,
  },
  imgCont: {
    height: 250,
    width: SCREEN_WIDTH,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    overflow: "hidden",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 70,
    height: 40,
    zIndex: 111,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    opacity: 0.7,
  },
  favIcon: {
    right: 0,
    left: undefined,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  characterImg: {
    flex: 1,
  },
  infoCont: {
    flex: 1,
    paddingHorizontal: 10,
  },
  characterName: {
    fontSize: 30,
    color: theme.colors.white,
    fontWeight: "bold",
    marginTop: 15,
  },
  date: {
    marginTop: 5,
    marginBottom: 15,
  },
  sectionCont: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#e47c81",
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDesc: {
    fontSize: 14,
    color: theme.colors.white,
    textAlign: "left",
  },
  roundedDesc: {
    fontSize: 14,
    color: theme.colors.white,
    textAlign: "left",
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
  },
  genresCont: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genres: {
    marginEnd: 10,
    marginBottom: 5,
  },
  companyImg: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  companyName: {
    marginBottom: 7,
    marginHorizontal: 3,
  },
  companyCont: {
    width: 130,
  },
  companyCountry: {
    position: "absolute",
    top: 5,
    left: 5,
    fontSize: 12,
    paddingHorizontal: 10,
  },

  //ANIMATED TOAST
  checkMark: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  toastCont: {
    position: "absolute",
    top: 15,
    zIndex: 1111,
    left: 10,
    right: 10,
    height: 55,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
    textAlignVertical: "center",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  touchableOpacity: {
    marginEnd: 5,
    backgroundColor: "#486581",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 19,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toastImageCont: {
    flex: 1,
    flexDirection: "row",
  },
});
