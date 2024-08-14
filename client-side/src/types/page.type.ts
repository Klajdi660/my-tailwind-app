export interface ForgotPasswordPagePropes {}
export interface LoginPageProps {}
export interface PasswordConfirmCodePageProps {}
export interface RegisterPageProps {}
export interface ResetPasswordPageProps {}
export interface VerifyEmailPagePorps {}
export interface BrowsePageProps {}
export interface GameDetailPageProps {}
export interface CollectionPageProps {}
export interface DiscoverPageProps {}
export interface HomePageProps {}
export interface MyGamesPageProps {}
export interface StorePageProps {}
export interface WishlistPageProps {}
export interface ComingSoonPageProps {}
export interface ErrorPageProps {}
export interface ProfilePageProps {}

export interface ResetPasswordValues {}
export interface PasswordConfirmCodeValues {}
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
