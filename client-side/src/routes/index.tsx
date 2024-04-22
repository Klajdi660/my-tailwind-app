import { lazy, /*FunctionComponent*/ } from "react";
import { useRoutes } from "react-router-dom";
import PrivateGuard from "../guards/PrivateGuard";
import PublicGuard from "../guards/PublicGuard";
import { Loadable } from "../components";
import { paths } from "../constants";
// import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "../layouts";
// import { FormListProvider } from "../contexts/FormListContext";

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

const Routes = () =>
  useRoutes([
    {
      path: home,
      element: (
        <PublicGuard>
          <PublicLayout>
            <HomePage />
            {/* <LoginPage /> */}
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
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
      path: verifyEmail,
      element: (
        <PublicGuard>
          <PublicLayout>
            <VerifyEmailPage />
          </PublicLayout>
        </PublicGuard>
      )
    },
    {
      path: "*",
      element: <ComingSoonPage />,
    },
    // {
    //   path: signup,
    //   element: (
    //     <PublicGuard>
    //       <PublicLayout>
    //         <RegisterPage />
    //       </PublicLayout>
    //     </PublicGuard>
    //   ),
    // },
    // {
    //   path: verifyEmail,
    //   element: (
    //     <PublicGuard>
    //       <PublicLayout>
    //         <VerifyEmailPage />
    //       </PublicLayout>
    //     </PublicGuard>
    //   ),
    // },
    // {
    //   path: forgotPassword,
    //   element: (
    //     <PublicGuard>
    //       <PublicLayout>
    //         <ResetPasswordPage />
    //       </PublicLayout>
    //     </PublicGuard>
    //   ),
    // },
    // {
    //   path: changePassword,
    //   element: (
    //     <PublicGuard>
    //       <PublicLayout>
    //         <UpdatePasswordPage />
    //       </PublicLayout>
    //     </PublicGuard>
    //   ),
    // },
    // {
    //   path: profile,
    //   element: (
    //     <PublicGuard>
    //       <PublicLayout>
    //         <ProfilePage />
    //       </PublicLayout>
    //     </PublicGuard>
    //   ),
    // },
  ]);

export default Routes;

// const delayLoad = (
//   component: () => Promise<{ default: FunctionComponent<any> }>,
//   delay: number
// ) => {
//   return new Promise<{ default: FunctionComponent<any> }>((resolve) => {
//     setTimeout(() => {
//       resolve(component());
//     }, delay);
//   });
// };

// const DashboardPage = Loadable(
//   lazy(() => import("../pages/Dashboard"))
//   // lazy(() => delayLoad(() => import("../pages/Dashboard"), 1000))
// );

const HomePage = Loadable(lazy(() => import("../pages/Root/Home")));
// const BrowsePage = Loadable(lazy(() => import("../pages/Root/Browse")));
const DiscoverPage = Loadable(lazy(() => import("../pages/Root/Discover")));

const LoginPage = Loadable(lazy(() => import("../pages/Auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/Auth/SignUp")));
const VerifyEmailPage = Loadable(
  lazy(() => import("../pages/Auth/VerifyEmail"))
);

// const ErrorPage = Loadable(lazy(() => import("../pages/Error")));
const ComingSoonPage = Loadable(lazy(() => import("../pages/ComingSoon")));

// const SocialAuth = Loadable(
//   lazy(() => import("../components/Auth/SocialAuth"))
// );

// const ResetPasswordPage = Loadable(
//   lazy(() => import("../pages/Auth/ResetPassword"))
// );
// const PasswordConfirmCodePage = Loadable(
//   lazy(() => import("../pages/Auth/PasswordConfirmCode"))
// );
// const ChangePasswordPage = Loadable(
//   lazy(() => import("../pages/Auth/ChangePassword"))
// );

// const ProfilePage = Loadable(lazy(() => import("../pages/Profile")));

// export const router = createBrowserRouter([
//   {
//     path: home,
//     children: [
//       {
//         element: <PrivateLayout />,
//         errorElement: <ErrorPage />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to="/discover" replace />,
//           },
//           {
//             path: `/${discover}`,
//             element: <DiscoverPage />,
//           },
//           {
//             path: `/${browse}`,
//             element: <BrowsePage />,
//           },
//           {
//             path: profile,
//             element: <ProfilePage />,
//           },
//         ],
//       },
//       {
//         element: (
//           <FormListProvider>
//             <PublicLayout />
//           </FormListProvider>
//         ),
//         errorElement: <ErrorPage />,
//         children: [
//           {
//             path: login,
//             element: <LoginPage />,
//           },
//           {
//             path: socialAuth,
//             element: <SocialAuth />,
//           },
//           {
//             path: register,
//             element: <RegisterPage />,
//           },
//           {
//             path: verifyEmail,
//             element: <VerifyEmailPage />,
//           },
//           {
//             path: forgotPassword,
//             element: <ResetPasswordPage />,
//           },
//           {
//             path: resetPassword,
//             element: <ChangePasswordPage />,
//           },
//           {
//             path: passwordCode,
//             element: <PasswordConfirmCodePage />,
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <ComingSoonPage />,
//       },
//     ],
//   },
// ]);
