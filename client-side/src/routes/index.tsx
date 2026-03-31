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
              { index: true, path: paths.HOME, element: <HomePage /> },
              { path: paths.LOGIN, element: <LoginPage /> },
              { path: paths.LOGIN_HELP, element: <LoginHelpPage /> },
              { path: paths.REGISTER, element: <RegisterPage /> },
              { path: paths.SOCIAL_AUTH, element: <SocialAuth /> },
              { path: paths.VERIFY_CODE, element: <VerifyCodePage /> },
              { path: paths.ACCOUNT_SAVED, element: <UserSaveForm /> },
              { path: paths.RESET_PASSWORD, element: <ResetPasswordPage /> },
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
              { path: paths.BROWSE, element: <BrowsePage /> },
              { path: paths.STORE, element: <ComingSoonPage /> },
              { path: paths.DISCOVER, element: <DiscoverPage /> },
              { path: paths.GENRES, element: <ComingSoonPage /> },
              { path: paths.MY_GAMES, element: <ComingSoonPage /> },
              { path: paths.WISHLIST, element: <ComingSoonPage /> },
              { path: paths.PLATFORMS, element: <ComingSoonPage /> },
              { path: paths.COLLECTION, element: <ComingSoonPage /> },
              { path: paths.SAVE_AUTH_DATA, element: <SaveDataAuthPage /> },
              { path: `${paths.ACCOUNT}/:profileId`, element: <ProfilePage /> },
              {
                path: `${paths.GAME_DETAILS}/:gameId`,
                element: <GameDetailPage />,
              },
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
