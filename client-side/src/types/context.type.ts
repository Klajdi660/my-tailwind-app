import {
  User,
  RegisterUserInput,
  TranslationsResponse,
  FormItem,
} from "../types";

export interface AuthContextType {
  authenticateUser: (user: User) => void;
  isAuthenticated: boolean;
  lToken: string | undefined;
  setLToken: (lToken: string) => void;
  setSignUpData: (signupData: RegisterUserInput | any) => void;
  signupData?: RegisterUserInput | any;
  unAuthenticateUser: () => void;
  updateUser: () => void;
  user?: User | null;
  setUser?: any;
}

export interface FormContextType {
  listForm: FormItem[];
}

export interface StoreContextType {
  user?: User | null;
  userStore: object;
  setUserStore: (userStore: object) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedTimeZone: string;
  setSelectedTimeZone: (selectedTImeZone: string) => void;
  timeZones: string[];
  usersTimeZone: string;
  lang: string;
  setLang: (lang: string) => void;
  translations: TranslationsResponse;
  setTranslations: (translations: TranslationsResponse) => void;
}
