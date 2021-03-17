import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../constants";
import HomeScreen from "../screens/Home/Home";
import { AddMovieScreen } from "../screens/AddMovie";
import MovieDetails from "../screens/MovieDetails/MovieDetails";

const HomeFlow = createStackNavigator();

const HomeNavigation = () => (
  <HomeFlow.Navigator initialRouteName="Home">
    <HomeFlow.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => {
        return {
          headerTitle: "Movies Home",
          headerStyle: {
            backgroundColor: theme.colors.accent,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.white,
          },
          headerRight: () => (
            <MaterialCommunityIcons
              name="heart"
              color={theme.colors.white}
              size={26}
              style={{ marginHorizontal: 10 }}
              onPress={() => navigation.navigate("AddMovie")}
            />
          ),
        };
      }}
    />
    <HomeFlow.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={{
        headerShown: false,
      }}
    />
    <HomeFlow.Screen
      name="AddMovie"
      component={AddMovieScreen}
      options={({ navigation }) => {
        return {
          headerTitle: "Add Movie",
          headerStyle: {
            backgroundColor: theme.colors.accent,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.white,
          },
        };
      }}
    />
  </HomeFlow.Navigator>
);

export default HomeNavigation;
