// Auth Service
import {
  LoginUserInput,
  RegisterUserInput,
  ForgotPasswordInput,
} from "./user.type";

export interface AuthService {
  login: (data: LoginUserInput) => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  register: (data: RegisterUserInput) => Promise<void>;
  verifyEmail: (data: any) => void;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
  resetPassword: (data: any, token: string) => Promise<void>;
}
