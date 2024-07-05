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
  setFiles: (value: any) => void;
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
