// Auth
export interface ForgotPasswordValues {
  email?: string;
  phoneNumber?: string;
  phonePrefix?: string;
}

export interface LoginUserValues {
  password: string;
  remember?: boolean;
  identifier: string;
  phonePrefix?: string;
}

export interface RegisterUserValues {
  fullname: string;
  password: string;
  username: string;
  identifier: string;
  phonePrefix?: string;
}

export interface VerifyEmailValues {
  code: string;
  email: string;
}
