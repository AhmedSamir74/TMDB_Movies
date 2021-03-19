import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { strings } from "../../localization/i18n";
import { IMovie } from "../../models";
import { Card } from "../UI";
import { styles } from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../constants";
import Highlighter from "react-native-highlight-words";

export const MovieCard = ({
  item,
  favoriteCard,
  onFavIconPress,
  searchWords = "",
}: {
  item: IMovie;
  favoriteCard?: boolean;
  onFavIconPress?: Function;
  searchWords?: string;
}) => {
  const navigation = useNavigation();
  return (
    <Card
      onPress={() =>
        navigation.navigate("MovieDetails", {
          id: item.id,
        })
      }
    >
      <View style={styles.cardCont}>
        <View>
          <Image
            source={
              item.poster_path
                ? {
                    uri: `https://www.themoviedb.org/t/p/w150_and_h150_bestv2/${item.poster_path}`,
                  }
                : require("../../assets/logo.png")
            }
            style={styles.cardImg}
          />
          <View style={styles.voteCont}>
            <Text style={styles.subtitle}>{strings("voteAverage")}:</Text>
            <Text style={styles.date}>{item.vote_average}</Text>
          </View>
        </View>
        <View style={styles.textCont}>
          <View>
            <View style={styles.titleCont}>
              <Text style={styles.title} numberOfLines={3}>
                <Highlighter
                  highlightStyle={{ backgroundColor: "#8e2025" }}
                  searchWords={[searchWords]}
                  textToHighlight={item.title}
                />
              </Text>
              {favoriteCard && onFavIconPress && (
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color={theme.colors.error}
                  size={26}
                  style={{ marginHorizontal: 10 }}
                  onPress={() => onFavIconPress()}
                />
              )}
            </View>
            <Text style={styles.overview} numberOfLines={4}>
              {item.overview}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.date}>{item.release_date}</Text>
            <Text style={styles.language}>
              {item.original_language.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
