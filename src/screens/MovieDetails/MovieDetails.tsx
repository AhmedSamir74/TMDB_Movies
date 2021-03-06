import React, { Component } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import MoviesManager from "../../services/endpoints/moviesManager";
import { theme } from "../../constants";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IMovie } from "../../models";
import { strings } from "../../localization/i18n";
import { Card } from "../../components/UI";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../services/redux/actions";
import AnimatedToast from "../../components/UI/AnimatedToast/AnimatedToast";

const LoaderComp = () => {
  return (
    <View style={styles.loaderCont}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

class MovieDetails extends Component<any> {
  moviesManager: MoviesManager;
  toastFadeAnimation: Animated.Value;
  animatedToast: any;

  state: {
    requestLoading: boolean;
    movie: IMovie | null;
    isFavorite: boolean;
  };
  constructor(props: any) {
    super(props);
    this.moviesManager = new MoviesManager();
    this.toastFadeAnimation = new Animated.Value(-200);

    this.state = {
      requestLoading: true,
      movie: null,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  async getMovieDetails() {
    let { id } = this.props.route.params;
    const { status, data } = await this.moviesManager.getMovieDetails(id);

    if (status) {
      this.setState({
        movie: data,
        requestLoading: false,
      });
    } else {
      this.setState({
        movie: [],
        requestLoading: false,
      });
      this.animatedToast.showToast(data);
    }
    let isMovieInFavorites = this.props.favorites.findIndex(
      (movie: IMovie) => movie.id == id
    );
    if (isMovieInFavorites != -1) {
      this.setState({ isFavorite: true });
    }
  }

  showAnimatedToast() {
    Animated.timing(this.toastFadeAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.toastFadeAnimation, {
          toValue: -200,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  }

  onFavoritePress() {
    this.setState({ isFavorite: !this.state.isFavorite });
    if (this.state.isFavorite) {
      this.props.removeFromFavorites(this.state.movie?.id);
    } else {
      this.props.addToFavorites(this.state.movie);
      this.showAnimatedToast();
    }
  }

  renderAnimatedToast() {
    return (
      <Animated.View
        style={[
          styles.toastCont,
          {
            transform: [{ translateY: this.toastFadeAnimation }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation?.navigate("Favorites")}
        >
          <View style={styles.touchableOpacity}>
            <View style={styles.toastImageCont}>
              <Image
                source={require("../../assets/images/wh-check.png")}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <Text style={styles.toastText}>{strings("addedToFav")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
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

        {this.renderAnimatedToast()}

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
          onPress={() => this.onFavoritePress()}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name={this.state.isFavorite ? "heart" : "heart-outline"}
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
                {movie.production_companies?.length != 0 && (
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
        <AnimatedToast onRef={(ref: any) => (this.animatedToast = ref)} />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favorites: state.favorites.list,
});

const dispatchToProps = (dispatch: any) => ({
  addToFavorites: (movie: IMovie) => dispatch(addToFavorite(movie)),
  removeFromFavorites: (id: number) => dispatch(removeFromFavorite(id)),
});

export default connect(mapStateToProps, dispatchToProps)(MovieDetails);
