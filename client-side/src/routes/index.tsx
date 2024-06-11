// import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PrivateGuard, PublicGuard } from "../guards";
// import { Loadable } from "./Loadable";
import { paths } from "../data";
import { PrivateLayout, PublicLayout } from "../layouts";
import BrowsePage from "../pages/Root/Browse";
import DiscoverPage from "../pages/Root/Discover";
import ForgotPasswordPage from "../pages/Auth/ForgotPassword";
import HomePage from "../pages/Root/Home";
import LoginPage from "../pages/Auth/Login";
import PasswordConfirmCodePage from "../pages/Auth/PasswordConfirmCode";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Auth/Register";
import ResetPasswordPage from "../pages/Auth/ChangePassword";
import SocialAuth from "../components/Auth/SocialAuth";
import VerifyEmailPage from "../pages/Auth/VerifyEmail";
import ComingSoonPage from "../pages/ComingSoon";

const {
  browse,
  discover,
  forgotPassword,
  home,
  login,
  passwordCode,
  profile,
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
