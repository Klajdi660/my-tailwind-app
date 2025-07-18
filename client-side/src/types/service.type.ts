import {
  LoginValues,
  RegisterUserValues,
  LoginHelpValues,
  VerifyCodeValues,
} from "../types";

// Auth

export interface AuthService {
  resetPassword: (
    hash: string | any,
    email: string | any,
    data: any
  ) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginValues) => Promise<void>;
  loginSavedUser: () => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  register: (data: RegisterUserValues) => Promise<void>;
  verifyCode: (data: VerifyCodeValues) => Promise<void>;
  loginHelp: (data: LoginHelpValues) => Promise<void>;
}

export interface AuthResponse {
  error: boolean;
  errorType: string;
  message: string;
  data: {
    user: any;
    aToken: string;
    rToken: string;
    // lToken: string;
  };
  lToken(lToken: any): unknown;
}

export interface RegisterResponse {
  error: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    codeExpire: string;
  };
  lToken(lToken: any): unknown;
}

// Games
export interface ServerResponse {
  data?: any;
  error: boolean;
  message: string;
}

// Profile/User
export interface UserDetailsResponse {
  data?: any;
  error: boolean;
  message: string;
}
