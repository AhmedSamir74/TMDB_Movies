import React, { Component } from "react";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { styles } from "./style";
import { showToast } from "../../services/controllers/storageController";
import MoviesManager from "../../services/endpoints/moviesManager";
import { theme } from "../../constants";
import { IMovie, IState } from "../../models";
import { MovieCard } from "../../components";
import { Searchbar } from "react-native-paper";
import { throttle } from "lodash";

const NUM_OF_MOVIES_PER_SCREEN = 8;
class HomeScreen extends Component<any> {
  moviesManager: MoviesManager;
  handleSearchThrottled: any;

  constructor(props: any) {
    super(props);
    this.moviesManager = new MoviesManager();
    this.handleSearchThrottled = throttle(this.getMovies, 1000).bind(this);
  }

  state = {
    searchQuery: "",
    movies: [],
    refreshing: false,
    requestLoading: true,
    currentPage: 1,
    pages: 0,
  };

  componentDidMount() {
    this.getMovies(this.state.currentPage);
  }

  async getMovies(pageNum: number, isRefresh?: boolean) {
    if (pageNum != 1 || isRefresh) {
      this.setState({ refreshing: true });
    }
    const { status, data, page, pages } = await this.moviesManager.searchMovies(
      this.state.searchQuery || "a",
      pageNum
    );
    if (status) {
      this.setState((prevState: IState, props) => ({
        movies: pageNum == 1 ? data : [...prevState.movies, ...data],
        requestLoading: false,
        refreshing: false,
        currentPage: page,
        pages,
      }));
    } else {
      showToast(data);
    }
  }
  onChangeSearch(searchQuery: string) {
    this.setState({ searchQuery }, () => this.handleSearchThrottled(1));
  }

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {this.state.requestLoading ? (
          <View style={styles.activityIndicatorCont}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <View style={styles.listCont}>
            <Searchbar
              placeholder="Search"
              onChangeText={this.onChangeSearch.bind(this)}
              value={this.state.searchQuery}
              style={styles.searchBar}
              inputStyle={styles.searchBarInput}
              placeholderTextColor={theme.colors.veryLightGrey}
              iconColor={theme.colors.white}
            />

            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.getMovies(1, true)}
              data={this.state.movies}
              renderItem={({ item }: { item: IMovie }) => (
                <MovieCard item={item} searchWords={this.state.searchQuery} />
              )}
              showsVerticalScrollIndicator={false}
              onEndReached={() => this.getMovies(this.state.currentPage + 1)}
              onEndReachedThreshold={0.3}
              ListFooterComponent={() =>
                this.state.movies.length > NUM_OF_MOVIES_PER_SCREEN ? (
                  <View style={styles.footerCont}>
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.primary}
                    />
                  </View>
                ) : null
              }
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        )}
      </View>
    );
  }
}

export default HomeScreen;
