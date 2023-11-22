import { ReactNode } from "react";
import { User } from "../types/user.type";
import { Translations } from "./language.type";

// Auth context
export interface AuthProviderProps {
    children: ReactNode,
};
  
export interface AuthContextType {
    isAuthenticated: boolean;
    user?: User | null;
    lToken: string | undefined,
    setLToken: (lToken: string) => void,
    authenticateUser: (user: User) => void;
    unAuthenticateUser: () => void;
    updateUser: () => void;
};

// Store context
export interface ProviderProps {
    children: ReactNode,
};

// export type usersType = {
//     schema: any,
//     data: any,
// };

// export type transactionsType = {
//     schema: any,
//     data: any;
// };

export interface StoreContextType {
    user?: User | null,
    userStore: object,
    setUserStore: (userStore: object) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    selectedTimeZone: string,
    setSelectedTimeZone: (selectedTImeZone: string) => void,
    timeZones: string[],
    usersTimeZone: string,
    lang: string,
    setLang: (lang: string) => void,
    translations: Translations,
    setTranslations: (translations: Translations) => void,
};
