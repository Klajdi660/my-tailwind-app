import {
  User,
  FormItem,
  RegisterUserValues,
  TranslationsResponse,
} from "../types";

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

export interface StoreContextType {
  lang: string;
  loading: boolean;
  currency: string;
  userStore: object;
  user?: User | null;
  shippingTo: string;
  timeZones: string[];
  usersTimeZone: string;
  selectedTimeZone: string;
  translations: TranslationsResponse;
  setLang: (lang: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrency: (currency: string) => void;
  setUserStore: (userStore: object) => void;
  setShippingTo: (shippingTo: string) => void;
  setSelectedTimeZone: (selectedTImeZone: string) => void;
  setTranslations: (translations: TranslationsResponse) => void;
  setUserLangData: (userLangData: { [key: string]: string }) => void;
  userLangData: { [key: string]: string };
}
