import { useRoutes } from "react-router-dom";
import {
  HomePage,
  StorePage,
  ErrorPage,
  LoginPage,
  BrowsePage,
  ProfilePage,
  MyGamesPage,
  WishlistPage,
  DiscoverPage,
  RegisterPage,
  CollectionPage,
  GameDetailPage,
  ComingSoonPage,
  EditProfilePage,
  VerifyEmailPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  PasswordConfirmCodePage,
} from "../pages";
import { paths } from "../data";
import { SocialAuth } from "../components";
import { PrivateGuard, PublicGuard } from "../guards";
import { PrivateLayout, PublicLayout } from "../layouts";

const {
  home,
  login,
  browse,
  profile,
  discover,
  register,
  gameDetail,
  socialAuth,
  editProfile,
  verifyEmail,
  passwordCode,
  resetPassword,
  forgotPassword,
} = paths;

export const Routes = () =>
  useRoutes([
    // {
    //   path: browse,
    //   element: (
    //     <PrivateGuard>
    //       <PrivateLayout>
    //         <BrowsePage />
    //       </PrivateLayout>
    //     </PrivateGuard>
    //   ),
    // },
    // {
    //   path: discover,
    //   element: (
    //     <PrivateGuard>
    //       <PrivateLayout>
    //         <DiscoverPage />
    //       </PrivateLayout>
    //     </PrivateGuard>
    //   ),
    // },
    // {
    //   path: `${gameDetail}/:gameId`,
    //   element: (
    //     <PrivateGuard>
    //       <PrivateLayout>
    //         <GameDetailPage />
    //       </PrivateLayout>
    //     </PrivateGuard>
    //   ),
    // },
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
