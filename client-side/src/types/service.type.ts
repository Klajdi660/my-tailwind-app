import {
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from "./page.type";

export interface AuthService {
  login: (data: LoginUserInput) => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  register: (data: RegisterUserInput) => Promise<void>;
  verifyEmail: (data: VerifyEmailInput) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
  resetPassword: (
    data: ResetPasswordInput,
    email: string | any,
    hash: string | any
  ) => Promise<void>;
}

export interface AuthResponse {
  lToken(lToken: any): unknown;
  error: boolean;
  message: string;
  data: {
    aToken: string;
    rToken: string;
    user: any;
    // lToken: string;
  };
}

export interface RegisterResponse {
  lToken(lToken: any): unknown;
  error: boolean;
  message: string;
  data: {
    email: string;
    name: string;
    codeExpire: string;
  };
}

export interface UserDetailsResponse {
  error: boolean;
  message: string;
  data?: any;
}

export interface TranslationsResponse {
  [key: string]: string;
}
