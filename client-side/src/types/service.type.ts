import {
  LoginUserValues,
  VerifyEmailValues,
  RegisterUserValues,
  ResetPasswordValues,
  ForgotPasswordValues,
} from "./page.type";

export interface AuthService {
  resetPassword: (
    hash: string | any,
    email: string | any,
    data: ResetPasswordValues | any
  ) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginUserValues) => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  register: (data: RegisterUserValues) => Promise<void>;
  emailVerify: (data: VerifyEmailValues) => Promise<void>;
  forgotPassword: (data: ForgotPasswordValues) => Promise<void>;
}

export interface AuthResponse {
  error: boolean;
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

export interface UserDetailsResponse {
  data?: any;
  error: boolean;
  message: string;
}

export interface ServerResponse {
  data?: any;
  error: boolean;
  message: string;
}

export interface TranslationsResponse {
  [key: string]: string;
}
