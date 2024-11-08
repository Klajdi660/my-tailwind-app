export interface RegisterUserValues {
  email: string;
  fullname: string;
  password: string;
  username: string;
  // passwordConfirm: string;
}
export interface VerifyEmailValues {
  code: string;
  email: string;
}
export interface LoginUserValues {
  password: string;
  remember: boolean;
  identifier: string;
}
export interface ForgotPasswordValues {
  email: string;
}
