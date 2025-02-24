import { useRoutes } from "react-router-dom";
import {
  HomePage,
  // StorePage,
  // ErrorPage,
  LoginPage,
  BrowsePage,
  ProfilePage,
  // MyGamesPage,
  // WishlistPage,
  DiscoverPage,
  RegisterPage,
  // CollectionPage,
  GameDetailPage,
  ComingSoonPage,
  VerifyEmailPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  PasswordConfirmCodePage,
  SaveDataAuthPage,
} from "../pages";
import { paths } from "../data";
import { PrivateGuard, PublicGuard } from "../guards";
import { SocialAuth, UserSaveForm } from "../components";
import { PrivateLayout, PublicLayout } from "../layouts";

const {
  home,
  logIn,
  browse,
  profile,
  discover,
  register,
  gameDetail,
  socialAuth,
  verifyEmail,
  passwordCode,
  resetPassword,
  forgotPassword,
  saveAuthData,
  accountSaved,
} = paths;

export const Routes = () =>
  useRoutes([
    {
      path: saveAuthData,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <SaveDataAuthPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: accountSaved,
      element: (
        <PublicGuard>
          <PublicLayout>
            <UserSaveForm />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: browse,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <BrowsePage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: discover,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <DiscoverPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: `${gameDetail}/:gameId`,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <GameDetailPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: forgotPassword,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ForgotPasswordPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: home,
      element: (
        <PublicGuard>
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: logIn,
      element: (
        <PublicGuard>
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: passwordCode,
      element: (
        <PublicGuard>
          <PublicLayout>
            <PasswordConfirmCodePage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: `${profile}/:profileId`,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <ProfilePage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: register,
      element: (
        <PublicGuard>
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: resetPassword,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ResetPasswordPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: socialAuth,
      element: (
        <PublicGuard>
          <PublicLayout>
            <SocialAuth />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: verifyEmail,
      element: (
        <PublicGuard>
          <PublicLayout>
            <VerifyEmailPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: "*",
      element: <ComingSoonPage />,
    },
  ]);
