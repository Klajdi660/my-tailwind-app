import { ReactNode } from "react";
import { User } from "../types/user.type";
import { RegisterUserInput } from "../types/user.type";

// Auth context
export interface AuthProviderProps {
  children: ReactNode;
}

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
export interface ProviderProps {
  children: ReactNode;
}
