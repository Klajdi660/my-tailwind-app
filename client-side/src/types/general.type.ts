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
//  Constants
export type FontSizesMap = {
  [key: string]: string;
};

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
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export interface Paginator {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  data?: any[];
}
