import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
}

// Config
export interface ThemeConfig {
  modes: string[];
  colors: {
    [key: string]: {
      primary: string;
      primaryLightGray: string;
      primaryOpacity: string;
    };
  };
  themes: {
    [key: string]: {
      neutralBg: string;
      neutralBgOpacity: string;
      neutralBgAlt: string;
      onNeutralBg: string;
      onNeutralBgSecondary: string;
      onNeutralBgDivider: string;
      switchBg: string;
      cardBg: string;
      cardSkeletonBg: string;
      cardBgHover: string;
      player: string;
    };
  };
  players: string[];
  fontFamilies: string[];
  sidebars: {
    folded: string;
    full: string;
  };
}

// Hooks
export interface NotifyParams {
  description: string | any;
  variant: string;
}

// Provider
interface ThemeState {
  mode: string;
  color: string;
  sidebar: "folded" | "full";
  layout: string;
  fontFamily: string;
  borderRadius: number;
}

export interface RootState {
  theme: ThemeState;
}

// Store
export interface RememberMeState {
  identifier: string;
  password: string;
  remember?: boolean;
  rememberType?: string;
}

// Utils
export interface AppUtilState {
  openSwitch: boolean;
  toggleMenu: boolean;
  toggleSearch: boolean;
  setOpenSwitch: (value: boolean) => void;
  setToggleMenu: (value: boolean) => void;
  setToggleSearch: (value: boolean) => void;
}

export interface NavScrollTriggerState {
  navScrollTrigger: boolean;
  setNavScrollTrigger: (value: boolean) => void;
}

export interface AppModalState {
  modals: { [key: string]: boolean };
  setModalOpen: (key: string, value: boolean) => void;
}

export interface ProfilePhotoState {
  files: any;
  isUpdatingProfileImg: boolean;
  setFiles: (value: any) => void;
  setIsUpdatingProfileImg: (value: boolean) => void;
}

export interface SubmittingState {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

// Component
export interface NotificationItemList {
  id: number;
  content: string;
  time: string;
}

export interface PageLinkItem {
  name: string;
  link: string;
}

export interface LangMenuItem {
  onSelectLanguage: (language: string) => void;
}

export interface DownloadBtnList {
  id: number;
  name: string;
  icon: string;
}

export type GridList = {
  [key: number]: string;
};

// Game
export interface GameParams {
  added: number;
  added_by_status: {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
  };
  background_image: string;
  background_image_additional?: string;
  clip: string;
  description_raw: string;
  developers: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  dominant_color: string;
  esrb_rating: { id: number; name: string; slug: string };
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  platforms: {
    platform: { id: number; name: string; slug: string };
    released_at: string;
  }[];
  playtime: number;
  price: number;
  publishers: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  qty?: number;
  rating: number;
  rating_top: number;
  ratings: { id: number; title: string; count: number; percent: number }[];
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: { id: number; image: string }[];
  slug: string;
  stores: {
    id: number;
    store: {
      domain: string;
      game_count: number;
      id: number;
      image_background: string;
      name: string;
      slug: string;
    };
  }[];
  suggestions_count: number;
  tags: {
    games_count: number;
    id: number;
    image_background: string;
    language: string;
    name: string;
    slug: string;
  }[];
  tba: boolean;
  updated: string;
  user_game: any;
}

export interface GameVideosParams {
  count: number;
  next: any | null;
  previous: any | null;
  results: {
    data: object;
    id: number;
    name: string;
    preview: string;
  }[];
}

export interface GameReviewsParams {
  can_delete: boolean;
  comments: { count: number; results: any[] };
  comments_count: number;
  comments_parent_count: number;
  created: string;
  edited: string;
  extrenal_auth: string;
  extrenal_avatar: string | null;
  extrenal_lang: string;
  external_source: string;
  external_store: {
    domain: string;
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  };
  game: number;
  id: number;
  is_extrenal: boolean;
  is_text: boolean;
  likes_count: number;
  likes_positive: number;
  likes_rating: number;
  posts_count: number;
  rating: number;
  reactions: any[];
  share_image: string;
  text: string;
  text_attachments: number;
  text_preview: string;
  text_previews: any[];
  user:
    | {
        avatar: string | null;
        collections_count: number;
        full_name: string;
        games_count: number;
        id: number;
        slug: string;
        userame: string;
      }[]
    | null;
}
