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
  formType?: string;
  formName?: string;
  formTitle?: string;
  description?: string;
  btnTxt?: string;
  footerTitle?: string;
  footerLink?: string;
  linkTo?: string;
  type?: string;
  name?: string;
  label?: string;
  props?: {
    type: string;
    placeholder: string;
    disabled?: boolean;
  };
}

export interface FormItemList {
  [key: string]: FormItem[];
}

// Currency
export type CurrencyProperties = {
  [key: number]: string;
};

// Footer
export interface FooterLink2 {
  title: string;
  links: {
    title: string;
    link: string;
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
  tabName: string;
  type: string;
}

interface SubLinkList {
  id: string;
  name: string;
  to: string;
  icon: string;
  tooltip: string;
}

export interface NavLinkList {
  name: string;
  subLinks: SubLinkList[];
}

// Profile
export interface ProfileItemList {
  formName?: string;
  formTitle?: string;
  btnTxt?: string;
  type?: string;
  name?: string;
  label?: string;
  containerDims?: string;
  borderType?: string;
  props?: {
    type?: string;
    placeholder?: string;
    disabled?: boolean;
  };
}

export interface GenderProperties {
  value: string;
  label: string;
}

export interface ProfileMenuItems {
  navigate: (path: string) => void;
  hidden: () => void;
  logout: () => void;
}
