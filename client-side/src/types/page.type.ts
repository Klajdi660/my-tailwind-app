export interface ForgotPasswordPagePropes {}

export interface ForgotPasswordInput {
  email: string;
}

export interface LoginPageProps {}

export interface LoginUserInput {
  password: string;
  remember: boolean;
  identifier: string;
}

export interface PasswordConfirmCodePageProps {}

export interface PasswordConfirmCodeInput {}

export interface RegisterPageProps {}

export interface RegisterUserInput {
  email: string;
  fullname: string;
  password: string;
  // passwordConfirm: string;
  username: string;
}

export interface ResetPasswordPageProps {}

export interface ResetPasswordInput {}

export interface VerifyEmailPagePorps {}

export interface VerifyEmailInput {
  code: string;
  email: string;
}

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
