import { LoginHelpValues, LoginValues, VerifyCodeValues } from "../types";

// Auth

export interface AuthService {
  resetPassword: (
    hash: string | any,
    email: string | any,
    data: any
  ) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginValues) => Promise<void>;
  loginWithSavedUser: () => Promise<void>;
  loginWithSocialApp: (tokenParam: string) => Promise<void>;
  verifyCode: (data: VerifyCodeValues) => Promise<void>;
  loginHelp: (data: LoginHelpValues) => Promise<void>;
}

export interface AuthResponse {
  error: boolean;
  errorType: string;
  message: string;
  data: Record<string, any>;
}

export interface ErrorResponse {
  error: boolean;
  errorType?: string;
  message: string;
  data?: object;
}

export interface CreateUserResponse {
  error: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    codeExpire: string;
  };
}

// Games
export interface ServerResponse {
  data?: any;
  error: boolean;
  message: string;
}

export interface GameGenreListResponse {
  id: number;
  name: string;
  slug: string;
  image_bacground: string;
  games: { id: number; name: string; slug: string; added: number }[];
  games_count: number;
}

export interface GamePlatformListResponse {
  id: number;
  name: string;
  slug: string;
  platforms: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image: string;
    image_background: string;
    year_start: number;
    year_end: number;
  }[];
}

export interface GameReviewsResponse {
  can_delete: boolean;
  comments: Record<string, any>;
  comments_count: number;
  comments_parent_count: number;
  created: string;
  edited: string;
  external_author: string;
  external_avatar: string;
  external_lang: string;
  external_source: string;
  external_store: Record<string, any>;
  game: number;
  id: number;
  is_external: boolean;
  is_text: boolean;
  likes_count: number;
  likes_positive: number;
  likes_rating: number;
  posts_count: number;
  rating: number;
  reactions: any[];
  share_image: string;
  text: string;
  text_attachments: string;
  text_preview: string;
  text_previews: any[];
  user: any | null;
}

export interface GameVideosResponse {
  id: number;
  name: string;
  preview: string;
  data: Record<string, any>;
}

export interface GameDetailResponse {
  achievement_count: number;
  added: number;
  addedd_by_status: Record<string, any>;
  additions_count: number;
  alternative_names: string[];
  background_image: string;
  background_image_additional: string;
  clip: string;
  creators_count: number;
  description: string;
  description_raw: string;
  developers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  dominant_color: string;
  esrb_rating: { id: number; name: string; slug: string };
  game_series_count: number;
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  id: number;
  metacritic: number;
  metacritic_platforms: {
    metascore: number;
    platform: { platform: number; name: string; slug: string };
    url: string;
  }[];
  metacritic_url: string;
  movies_count: number;
  name: string;
  name_original: string;
  parent_achievements_count: number;
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  parents_count: number;
  platforms: {
    released_at: string;
    platform: { id: number; name: string; slug: string };
  }[];
  playtime: number;
  publishers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  rating: number;
  rating_top: number;
  ratings: { id: number; title: string; count: number; percent: number }[];
  ratings_count: number;
  reactions: Record<number, number>;
  reddit_count: number;
  reddit_description: string;
  reddit_logo: string;
  reddit_name: string;
  reddit_url: string;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  screenshots_count: number;
  slug: string;
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      game_count: number;
      image_background: string;
    };
  }[];
  suggestions_count: number;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  tba: boolean;
  twitch_count: number;
  updated: string;
  user_game: any;
  website: string;
  youtube_count: number;
}

// Profile/User
export interface UserDetailsResponse {
  data?: any;
  error: boolean;
  message: string;
}
