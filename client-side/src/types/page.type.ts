// Auth
export interface ForgotPasswordValues {
  email: string;
}

export interface LoginUserValues {
  password: string;
  remember: boolean;
  identifier: string;
}

export interface RegisterUserValues {
  email?: string;
  fullname: string;
  password: string;
  username: string;
  mobile?: string;
  identifier?: string;
}

export interface VerifyEmailValues {
  code: string;
  email: string;
}
