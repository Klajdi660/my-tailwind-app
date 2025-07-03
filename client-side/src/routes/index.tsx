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
  HOME,
  LOGIN,
  BROWSE,
  PROFILE,
  DISCOVER,
  REGISTER,
  GAME_DETAILS,
  SOCIAL_AUTH,
  VERIFY_ACCOUNT,
  PASSWORD_CODE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  SAVE_AUTH_DATA,
  ACCOUNT_SAVED,
} = paths;

export const Routes = () =>
  useRoutes([
    {
      path: SAVE_AUTH_DATA,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <SaveDataAuthPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: ACCOUNT_SAVED,
      element: (
        <PublicGuard>
          <PublicLayout>
            <UserSaveForm />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: BROWSE,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <BrowsePage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: DISCOVER,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <DiscoverPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: `${GAME_DETAILS}/:gameId`,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <GameDetailPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: FORGOT_PASSWORD,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ForgotPasswordPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: HOME,
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
      path: LOGIN,
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
      path: PASSWORD_CODE,
      element: (
        <PublicGuard>
          <PublicLayout>
            <PasswordConfirmCodePage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: `${PROFILE}/:profileId`,
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <ProfilePage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: REGISTER,
      element: (
        <PublicGuard>
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: RESET_PASSWORD,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ResetPasswordPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: SOCIAL_AUTH,
      element: (
        <PublicGuard>
          <PublicLayout>
            <SocialAuth />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: VERIFY_ACCOUNT,
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
