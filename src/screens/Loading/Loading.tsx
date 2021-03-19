import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./style";
import { createNewGuestSessionID, isNewUser } from "../../services/controllers";
import { useDispatch } from "react-redux";
import { saveSession } from "../../services/redux/actions";
import { _retrieveData } from "../../services/controllers/storageController";

export const LoadingScreen = (props: any) => {
  const dispatch = useDispatch();
  const newUserHelper = async () => {
    const returnedNewUser = await isNewUser();
    if (returnedNewUser) {
      props.navigation.navigate("OnBoarding");
    } else {
      props.navigation.navigate("Authorized");
    }
  };
  useEffect(() => {
    newUserHelper();
    initializeSession();
  }, []);

  const initializeSession = async () => {
    _retrieveData("sessionId").then(async (sessionId) => {
      if (!sessionId) {
        const { status, data } = await createNewGuestSessionID();

        if (status) {
          dispatch(saveSession(data));
        }
      } else {
        dispatch(saveSession(sessionId));
      }
    });
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.img} />
    </View>
  );
};
