import {
  LoginUserInput,
  VerifyEmailInput,
  RegisterUserInput,
  ResetPasswordInput,
  ForgotPasswordInput,
} from "./page.type";

export interface AuthService {
  resetPassword: (
    hash: string | any,
    email: string | any,
    data: ResetPasswordInput | any
  ) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginUserInput) => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  register: (data: RegisterUserInput) => Promise<void>;
  verifyEmail: (data: VerifyEmailInput) => Promise<void>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
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
