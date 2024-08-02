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

// Currency
export type CurrencyProperties = {
  [key: number]: string;
};

// Modal
export type ModalProperties = {
  [key: number]: string;
};

// Footer
export interface FooterLink2 {
  title: string;
  links: {
    link: string;
    title: string;
  }[];
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

export interface SettingsLinksParams {
  id: string;
  to: string;
  name: string;
  icon: string;
}

// Profile
export interface ProfileItemList {
  type?: string;
  name?: string;
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

export interface GameIconMapsProperties {
  [key: string]: string;
}

// Settings
export type CurrListParams = {
  [key: string]: { label: string; value: string };
};

export type SettingListParams = {
  label: string;
  value: string;
};
