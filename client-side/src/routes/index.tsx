import { useRoutes } from "react-router-dom";
import { PrivateGuard, PublicGuard } from "../guards";
import { paths } from "../data";
import { SocialAuth } from "../components";
import { PrivateLayout, PublicLayout } from "../layouts";
import {
  ForgotPasswordPage,
  LoginPage,
  PasswordConfirmCodePage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
  BrowsePage,
  // CollectionPage,
  DiscoverPage,
  GameDetailPage,
  HomePage,
  // MyGamesPage,
  // StorePage,
  // WishlistPage,
  ComingSoonPage,
  // ErrorPage,
  ProfilePage,
  EditProfilePage,
} from "../pages";

const {
  browse,
  discover,
  gameDetail,
  forgotPassword,
  home,
  login,
  passwordCode,
  profile,
  editProfile,
  register,
  resetPassword,
  socialAuth,
  verifyEmail,
} = paths;

export const Routes = () =>
  useRoutes([
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
      path: login,
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
      path: profile,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <ProfilePage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: editProfile,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <EditProfilePage />
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
