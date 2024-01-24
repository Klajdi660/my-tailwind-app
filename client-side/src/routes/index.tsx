import { lazy, FunctionComponent } from "react";
import { useRoutes } from "react-router-dom";
import { PublicGuard } from "../guards";
import { PublicLayout } from "../layouts";
import { Loadable } from "../components";
import { path } from "../data";

const { 
  home, 
  login, 
  signup, 
  verifyEmail, 
  forgotPassword, 
  changePassword, 
  myCourses,
  profile,
} = path;

const Routes = () =>
  useRoutes([
    {
      path: home,
      element: (
        <PublicGuard>
          <PublicLayout>
            <HomePage />
          </PublicLayout >
        </PublicGuard>
      ),
      // index: true
    },
    {
      path: myCourses,
      element: (
        <PublicGuard>
          <PublicLayout>
            <DashboardPage />
          </PublicLayout >
        </PublicGuard>
      ),
      // index: true
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
      // index: true,
    },
    {
      path: signup,
      element: (
        <PublicGuard>
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        </PublicGuard>
      ),
      // index: true,
    },
    {
      path: verifyEmail,
      element: (
        <PublicGuard>
          <PublicLayout>
            <VerifyEmailPage/>
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: forgotPassword,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ResetPasswordPage/>
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: changePassword,
      element: (
        <PublicGuard>
          <PublicLayout>
            <UpdatePasswordPage/>
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: profile,
      element: (
        <PublicGuard>
          <PublicLayout>
            <ProfilePage/>
          </PublicLayout>
        </PublicGuard>
      ),
    },
  ]);

export default Routes;

const delayLoad = (component: () => Promise<{ default: FunctionComponent<any> }>, delay: number) => {
  return new Promise<{ default: FunctionComponent<any> }>((resolve) => {
    setTimeout(() => {
      resolve(component());
    }, delay);
  });
};

const DashboardPage = Loadable(
  // lazy(() => import("../pages/Dashboard"))
  lazy(() => delayLoad(() => import("../pages/Dashboard"), 1000))
);

const HomePage = Loadable(
  // lazy(() => import("../pages/Dashboard"))
  lazy(() => delayLoad(() => import("../pages/Home"), 1000))
);

const LoginPage = Loadable(
  // lazy(() => import("../pages/Auth/Login"))
  lazy(() => delayLoad(() => import("../pages/Auth/Login"), 2000))
);

const RegisterPage = Loadable(
  // lazy(() => import("../pages/Auth/SignUp"))
  lazy(() => delayLoad(() => import("../pages/Auth/SignUp"), 1000))
);

const VerifyEmailPage = Loadable(
  lazy(() => delayLoad(() => import("../pages/Auth/VerifyEmail"), 1000))
);

const ResetPasswordPage = Loadable(
  lazy(() => delayLoad(() => import("../pages/Auth/ResetPassword"), 1000))
);

const UpdatePasswordPage = Loadable(
  lazy(() => delayLoad(() => import("../pages/Auth/ChangePassword"), 1000))
);

const ProfilePage = Loadable(
  // lazy(() => import("../pages/Dashboard"))
  lazy(() => delayLoad(() => import("../pages/Profile"), 1000))
);
