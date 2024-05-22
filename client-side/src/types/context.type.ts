import { User } from "../types/user.type";
import { RegisterUserInput } from "../types/user.type";
import { Translations } from "./language.type";

// Auth context
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
