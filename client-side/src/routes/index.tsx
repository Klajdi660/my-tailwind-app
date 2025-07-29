import { createBrowserRouter } from "react-router-dom";
import {
  BrowsePage,
  ComingSoonPage,
  DiscoverPage,
  ErrorPage,
  GameDetailPage,
  HomePage,
  LoginHelpPage,
  LoginPage,
  PasswordConfirmCodePage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  SaveDataAuthPage,
  VerifyCodePage,
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
  VERIFY_CODE,
  PASSWORD_CODE,
  RESET_PASSWORD,
  SAVE_AUTH_DATA,
  ACCOUNT_SAVED,
  LOGIN_HELP,
  MY_GAMES,
} = paths;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <PublicGuard />,
        children: [
          {
            element: <PublicLayout />,
            errorElement: <ErrorPage />,
            children: [
              { index: true, path: HOME, element: <HomePage /> },
              { path: LOGIN, element: <LoginPage /> },
              { path: LOGIN_HELP, element: <LoginHelpPage /> },
              { path: REGISTER, element: <RegisterPage /> },
              { path: SOCIAL_AUTH, element: <SocialAuth /> },
              { path: VERIFY_CODE, element: <VerifyCodePage /> },
              { path: ACCOUNT_SAVED, element: <UserSaveForm /> },
              { path: RESET_PASSWORD, element: <ResetPasswordPage /> },
              { path: PASSWORD_CODE, element: <PasswordConfirmCodePage /> },
            ],
          },
        ],
      },
      {
        element: <PrivateGuard />,
        children: [
          {
            element: <PrivateLayout />,
            errorElement: <ErrorPage />,
            children: [
              { path: BROWSE, element: <BrowsePage /> },
              { path: DISCOVER, element: <DiscoverPage /> },
              { path: MY_GAMES, element: <ComingSoonPage /> },
              { path: SAVE_AUTH_DATA, element: <SaveDataAuthPage /> },
              { path: `${PROFILE}/:profileId`, element: <ProfilePage /> },
              { path: `${GAME_DETAILS}/:gameId`, element: <GameDetailPage /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
