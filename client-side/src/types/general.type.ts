import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
}

export interface NameOfFormTypes {
  LOGIN: "login";
  REGISTER: "register";
}

// Config
export interface ThemeConfig {
  modes: string[];
  sidebars:
    | {
        full: string;
        folded: string;
      }
    | any;
  players: string[];
  fontFamilies: string[];
  colors: {
    [key: string]: {
      primary: string;
      primaryOpacity: string;
      primaryLightGray: string;
    };
  };
  themes: {
    [key: string]: {
      cardBg: string;
      player: string;
      switchBg: string;
      neutralBg: string;
      cardBgHover: string;
      onNeutralBg: string;
      neutralBgAlt: string;
      cardSkeletonBg: string;
      neutralBgOpacity: string;
      onNeutralBgDivider: string;
      onNeutralBgSecondary: string;
    };
  };
}

// Hooks
export type NotifyVariant =
  | "default"
  | "info"
  | "error"
  | "success"
  | "warning";
export interface NotifyParams {
  variant: NotifyVariant;
  description: string;
}

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

// Game
export interface GameParams {
  id: number;
  tba: boolean;
  qty?: number;
  clip: string;
  slug: string;
  name: string;
  added: number;
  price: number;
  rating: number;
  user_game: any;
  updated: string;
  released: string;
  playtime: number;
  metacritic: number;
  rating_top: number;
  reviews_count: number;
  ratings_count: number;
  dominant_color: string;
  description_raw: string;
  saturated_color: string;
  background_image: string;
  suggestions_count: number;
  reviews_text_count: number;
  background_image_additional: string;
  short_screenshots: { id: number; image: string }[];
  esrb_rating: { id: number; name: string; slug: string };
  ratings: { id: number; title: string; count: number; percent: number }[];
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
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
  platforms: {
    released_at: string;
    platform: { id: number; name: string; slug: string };
  }[];
  developers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  publishers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  added_by_status: {
    yet: number;
    owned: number;
    toplay: number;
    beaten: number;
    dropped: number;
    playing: number;
  };
}

export interface GameReviewsParams {
  id: number;
  game: number;
  text: string;
  edited: string;
  rating: number;
  created: string;
  reactions: any[];
  is_text: boolean;
  can_delete: boolean;
  posts_count: number;
  share_image: string;
  likes_count: number;
  text_preview: string;
  is_extrenal: boolean;
  text_previews: any[];
  likes_rating: number;
  extrenal_lang: string;
  extrenal_auth: string;
  likes_positive: number;
  comments_count: number;
  external_source: string;
  text_attachments: number;
  comments_parent_count: number;
  extrenal_avatar: string | null;
  comments: { count: number; results: any[] };
  user:
    | {
        id: number;
        slug: string;
        userame: string;
        full_name: string;
        games_count: number;
        avatar: string | null;
        collections_count: number;
      }[]
    | null;
  external_store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface User {
  // auths?: string;
  avatar?: string;
  email?: string;
  extra?: any;
  id: string;
  name?: string;
  provider?: string;
  username?: string;
  verified: any;
  lastLogin?: string;
  createdAt?: string;
}
