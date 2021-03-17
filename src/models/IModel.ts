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
  genres?: {
    id: number;
    name: string;
  }[];
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  overview: string;
  release_date: string | number | Date;
  title: string;
  vote_average: string | number;
  vote_count: string | number;
  original_language: string;
}
