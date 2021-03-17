import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { showToast } from "../../services/controllers/storageController";
import MoviesManager from "../../services/endpoints/moviesManager";
import { theme } from "../../constants";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IMovie } from "../../models";
import { strings } from "../../localization/i18n";
import { Card } from "../../components/UI";

const LoaderComp = () => {
  return (
    <View style={styles.loaderCont}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

class MovieDetails extends Component<any> {
  moviesManager: MoviesManager;
  state: {
    requestLoading: boolean;
    movie: IMovie | null;
  };
  constructor(props: any) {
    super(props);
    this.moviesManager = new MoviesManager();
    this.state = {
      requestLoading: true,
      movie: null,
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  async getMovieDetails() {
    let { id } = this.props.route.params;
    const { status, data } = await this.moviesManager.getMovieDetails(id);
    // console.log(JSON.stringify(data, null, 4));

    if (status) {
      this.setState({
        movie: data,
        requestLoading: false,
      });
    } else {
      showToast(data);
    }
  }

  render() {
    const { movie, requestLoading } = this.state;
    return (
      <View style={styles.layout}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.props.navigation.goBack()}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={theme.colors.background}
            size={40}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backIcon, styles.favIcon]}
          onPress={() => this.props.navigation.goBack()}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            color={theme.colors.background}
            size={30}
          />
        </TouchableOpacity>
        {requestLoading ? (
          <LoaderComp />
        ) : (
          movie && (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              <View style={styles.imgCont}>
                <Image
                  source={{
                    uri: `https://www.themoviedb.org/t/p/w300_and_h300_bestv2/${
                      movie.backdrop_path || movie.poster_path
                    }`,
                  }}
                  style={styles.characterImg}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.infoCont}>
                {/* TITLE */}
                <Text style={styles.characterName}>{movie.title}</Text>
                <Text style={[styles.sectionDesc, styles.date]}>
                  {movie.release_date}
                </Text>

                {/* DESCRIPTION */}
                {movie.overview ? (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>
                      {strings("overview")}
                    </Text>
                    <Text style={styles.sectionDesc}>{movie.overview}</Text>
                  </View>
                ) : null}

                {/* LANGUAGES */}
                {movie.original_language ? (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>
                      {strings("language")}
                    </Text>
                    <Text style={styles.roundedDesc}>
                      {movie.original_language}
                    </Text>
                  </View>
                ) : null}

                {/* GENERES */}
                {movie.genres ? (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>{strings("genres")}</Text>
                    <View style={styles.genresCont}>
                      {movie.genres.map((value) => (
                        <Text
                          style={[styles.roundedDesc, styles.genres]}
                          key={value.id}
                        >
                          {value.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                ) : null}

                {/* VOTE */}
                {movie.vote_average ? (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>
                      {strings("voteAverage")}
                    </Text>
                    <Text style={styles.sectionDesc}>
                      {movie.vote_average}/10 ({movie.vote_count})
                    </Text>
                  </View>
                ) : null}

                {/* STORIES */}
                {movie.production_companies?.length && (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>
                      {strings("productionCompanies")}
                    </Text>
                    <FlatList
                      horizontal
                      data={movie?.production_companies}
                      renderItem={({ item }) => (
                        <Card disabled style={styles.companyCont}>
                          <Text
                            style={[styles.roundedDesc, styles.companyCountry]}
                          >
                            {item.origin_country}
                          </Text>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={styles.companyImg}
                            resizeMode="contain"
                          />
                          <Text
                            style={[styles.sectionDesc, styles.companyName]}
                          >
                            {item.name}
                          </Text>
                        </Card>
                      )}
                      keyExtractor={(item, index) => `${index}`}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          )
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  myMovies: state.movies.data,
});

export default connect(mapStateToProps)(MovieDetails);
