// import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PrivateGuard, PublicGuard } from "../guards";
// import { Loadable } from "./Loadable";
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

// const BrowsePage = Loadable(lazy(() => import("../pages/Root/Browse")));
// // const DiscoverPage = Loadable(lazy(() => import("../pages/Root/Discover")));
// const ForgotPasswordPage = Loadable(
//   lazy(() => import("../pages/Auth/ForgotPassword"))
// );
// const HomePage = Loadable(lazy(() => import("../pages/Root/Home")));
// const LoginPage = Loadable(lazy(() => import("../pages/Auth/Login")));
// const PasswordConfirmCodePage = Loadable(
//   lazy(() => import("../pages/Auth/PasswordConfirmCode"))
// );
// const ProfilePage = Loadable(lazy(() => import("../pages/Profile")));
// const RegisterPage = Loadable(lazy(() => import("../pages/Auth/Register")));
// const ResetPasswordPage = Loadable(
//   lazy(() => import("../pages/Auth/ChangePassword"))
// );
// const SocialAuth = Loadable(
//   lazy(() => import("../components/Auth/SocialAuth"))
// );
// const VerifyEmailPage = Loadable(
//   lazy(() => import("../pages/Auth/VerifyEmail"))
// );
// // const ErrorPage = Loadable(lazy(() => import("../pages/Error")));
// const ComingSoonPage = Loadable(lazy(() => import("../pages/ComingSoon")));
