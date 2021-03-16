export interface IAction {
  type: string;
  payload: any;
}

export interface IState {
  movies: [];
  refreshing: boolean;
  requestLoading: boolean;
  currentPage: number;
  pages: number;

  myMovies: [];
  myMovies_refreshing: boolean;
}

export interface IMovie {
  id: number;
  poster_path: string | null;
  original_title: string;
  overview: string;
  release_date: string | number | Date;
  title: string;
  vote_average: string | number;
  original_language: string;
}
