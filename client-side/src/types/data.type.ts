// Auth
export interface FormDataTypes {
  login: FormDataType<LoginInputMetadata>;
  register: FormDataType<RegisterInputMetadata>;
  "verify-account": FormDataType<VerifyCodeInputMetadata>;
  "forgot-password": FormDataType<VerifyCodeInputMetadata>;
  "reset-password": FormDataType<ResetPasswordInputMetadata>;
}

export interface ServiceResponseMap {
  linkText: string;
  to?: string;
  state?: Record<string, string>;
}

export interface SocialAuthList {
  id: number;
  name: string;
  icon: string;
  link: string;
}

export interface EmailOrPhoneButtonType {
  id: number;
  label: string;
  name: string;
}

export interface LoginHelpDataType {
  formName: string;
  toFormName?: string;
  formTitle: string;
  formDescription: string;
  description: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
  emailText: string;
  smsText: string;
  emailPlaceholder: string;
  smsPlaceholder: string;
  emailButtonName: string;
  smsButtonName: string;
}

interface InputFieldMetadata<Name extends string> {
  name: Name;
  placeholder: string;
  type: string;
  iconVisible?: string;
  iconHidden?: string;
}

export type LoginInputMetadata = InputFieldMetadata<"identifier" | "password">;
export type VerifyCodeInputMetadata = InputFieldMetadata<"code">;
export type RegisterInputMetadata = InputFieldMetadata<
  "identifier" | "username" | "fullname" | "password"
>;
export type ResetPasswordInputMetadata = InputFieldMetadata<
  "password" | "confirmPassword"
>;

export interface FormDataType<T extends { name: string }> {
  metadata: {
    formName: string;
    formTitle: string;
    description: string;
    footerTitle: string;
    footerLink: string;
    buttonName: string;
    linkTo: string;
    toFormName?: string;
    otherLink?: {
      otherLinkName: string;
      otherLinkPName: string;
      otherLinkTo?: string;
    };
  };
  inputMetadata: T[];
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
  // [key: string]: string;
  HOME: string;
  LOGIN: string;
  BROWSE: string;
  PROFILE: string;
  REGISTER: string;
  DISCOVER: string;
  SOCIAL_AUTH: string;
  GAME_DETAILS: string;
  VERIFY_CODE: string;
  PASSWORD_CODE: string;
  FORGOT_PASSWORD: string;
  RESET_PASSWORD: string;
  SAVE_AUTH_DATA: string;
  ACCOUNT_SAVED: string;
  LOGIN_HELP: string;
  MY_GAMES: string;
  WISHLIST: string;
  STORE: string;
  COLLECTION: string;
  PLATFORMS: string;
  GENRES: string;
};

export type FontSizesProperties = {
  [key: string]: string;
};

export interface NavLinkList {
  name: string;
  subLinks: {
    id: string;
    to: string;
    name: string;
    icon: string;
    tooltip: string;
  }[];
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
