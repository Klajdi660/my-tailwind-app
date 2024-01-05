import { ReactNode } from "react";
import { User } from "../types/user.type";
import { RegisterUser } from "../types/user.type";

// Auth context
export interface AuthProviderProps {
    children: ReactNode;
};
  
export interface AuthContextType {
    isAuthenticated: boolean;
    user?: User | null;
    lToken: string | undefined;
    setLToken: (lToken: string) => void;
    authenticateUser: (user: User) => void;
    unAuthenticateUser: () => void;
    updateUser: () => void;
    signupData?: RegisterUser | any;
    // setSignUpData?: any;
    setSignUpData: (signupData: RegisterUser | any) => void;
};

// Store context
export interface ProviderProps {
    children: ReactNode;
};
