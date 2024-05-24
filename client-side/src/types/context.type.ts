import { User, RegisterUserInput, Translations, FormListItem } from "../types";

// Auth context
export interface AuthContextType {
  authenticateUser: (user: User) => void;
  isAuthenticated: boolean;
  lToken: string | undefined;
  setLToken: (lToken: string) => void;
  // setSignUpData: (signupData: RegisterUserInput | any) => void;
  setSignUpData: (signupData: any) => void;
  // signupData?: RegisterUserInput | any;
  signupData?: any;
  unAuthenticateUser: () => void;
  updateUser: () => void;
  user?: User | null;
}

// Store context
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
  translations: Translations;
  setTranslations: (translations: Translations) => void;
}

export interface FormListContextType {
  lists: FormListItem[];
}
