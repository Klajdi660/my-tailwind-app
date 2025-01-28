// Auth
export type FormTitleList = {
  [key: string]: string;
};

export interface SocialAuthList {
  id: number;
  name: string;
  icon: string;
  link: string;
}

export interface FormItem {
  type?: string;
  name?: string;
  iconName?: string;
  label?: string;
  linkTo?: string;
  btnTxt?: string;
  formType?: string;
  formName?: string;
  formTitle?: string;
  footerLink?: string;
  description?: string;
  footerTitle?: string;
  props?: {
    type: string;
    disabled?: boolean;
    placeholder: string;
  };
}

export interface FormItemList {
  [key: string]: FormItem[];
}

export interface ThresholdsLastLognBadgeColor {
  limit: number | any;
  color: string;
}

// Game
export interface GameIconMapsProperties {
  [key: string]: string;
}

export type ImageDimsOptions = {
  [key: number]: string;
};

export interface GameTabsButtonProperties {
  id: string;
  name: string;
}

export interface GameFilterListProperties {
  id: number;
  name: string;
  value: string;
  width: string;
  filterList?: any[];
}

export interface GameRatingListProperties {
  id: number;
  value: number;
  name: string;
}

// General
export type PathProperties = {
  [key: string]: string;
};

export type LogoProperties = {
  [key: string]: string;
};

export type FontSizesProperties = {
  [key: string]: string;
};

export interface AccountTypeList {
  id: number;
  type: string;
  tabName: string;
}

interface SubLinkList {
  id: string;
  to: string;
  name: string;
  icon: string;
  tooltip: string;
}

export interface NavLinkList {
  name: string;
  subLinks: SubLinkList[];
}

export interface NavListsParams {
  id: string;
  tooltip: string;
  to: string;
  name: string;
  icon: string;
}

export interface SettingsLinksParams {
  id: string;
  name: string;
  icon: string;
}

export interface NotificationItemList {
  id: number;
  time: string;
  content: string;
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

export type LangMapParams = {
  [key: string]: { label: string; value: string };
};

// Profile
export interface AvatarProfileList {
  id: number;
  name: string;
  size: string;
}

export interface ProfileItemList {
  type?: string;
  name?: string;
  iconName?: string;
  label?: string;
  btnTxt?: string;
  formName?: string;
  formTitle?: string;
  borderType?: string;
  containerDims?: string;
  props?: {
    type?: string;
    disabled?: boolean;
    placeholder?: string;
  };
}

export interface PersonalDetailsList {
  type: string;
  name: string;
  label: string;
  props: {
    type: string;
    placeholder: string;
  };
}

export interface GenderProperties {
  value: string;
  label: string;
}

export interface ProfileMenuItems {
  hidden: () => void;
  logout: () => void;
  navigate: (path: string) => void;
  setModalOpen: any;
}

// Settings
export type SettingListParams = {
  label: string;
  value: string;
};

export type CurrListParams = {
  [key: string]: { label: string; value: string };
};

export type CurrencySymbolProperties = {
  [key: string]: string;
};

export interface CardImgListParams {
  id: number;
  name: string;
  img: string;
  width: number;
  height: number;
}
export interface CardImgParams {
  [key: string]: string;
}

export interface CreditCatdListProperties {
  btnTxt?: string;
  formName?: string;
  formTitle?: string;
  type?: "input";
  name?: string;
  label?: string;
  props?: {
    placeholder?: string;
    type?: string;
  };
}
