import { User, FormItem, RegisterUserValues } from "../types";

export interface AuthContextType {
  setUser?: any;
  user?: User | null;
  isAuthenticated: boolean;
  lToken: string | undefined;
  signupData?: RegisterUserValues | any;
  updateUser: () => void;
  unAuthenticateUser: () => void;
  setLToken: (lToken: string) => void;
  authenticateUser: (user: User) => void;
  setSignUpData: (signupData: RegisterUserValues | any) => void;
}

export interface FormContextType {
  listForm: FormItem[];
}

export interface TranslationsResponse {
  [key: string]: string;
}
export interface StoreContextType {
  lang: string;
  loading: boolean;
  currency: string | null;
  userStore: object;
  user?: User | null;
  shippingTo: string;
  timeZones: string[];
  openSwitch: boolean;
  toggleMenu: boolean;
  toggleSearch: boolean;
  usersTimeZone: string;
  selectedTimeZone: string;
  isUpdatingProfileImg: boolean;
  modals: Record<string, boolean>;
  translations: TranslationsResponse;
  userLangData: { [key: string]: string };
  closeAllModals: () => void;
  setLang: (lang: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrency: (currency: string) => void;
  setUserStore: (userStore: object) => void;
  setShippingTo: (shippingTo: string) => void;
  setToggleMenu: (toggleMenu: boolean) => void;
  setOpenSwitch: (openSwitch: boolean) => void;
  setToggleSearch: (toggleSearch: boolean) => void;
  setModalOpen: (key: string, value: boolean) => void;
  setSelectedTimeZone: (selectedTImeZone: string) => void;
  setTranslations: (translations: TranslationsResponse) => void;
  setIsUpdatingProfileImg: (isUpdatingProfileImg: boolean) => void;
  setUserLangData: (userLangData: { [key: string]: string }) => void;
}
