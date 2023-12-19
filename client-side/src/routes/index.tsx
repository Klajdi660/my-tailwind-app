import { lazy, FunctionComponent } from "react";
import { useRoutes } from "react-router-dom";
import { PrivateGuard, PublicGuard } from "../guards";
import { PrivateLayout, PublicLayout } from "../layouts";
import { Loadable } from "../components";

const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: (
        <PublicGuard>
          <PublicLayout>
            <DashboardPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true
    },
    {
      path: "login",
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
      path: "signup",
      element: (
        <PublicGuard>
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
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

const LoginPage = Loadable(
  // lazy(() => import("../pages/Auth/Login"))
  lazy(() => delayLoad(() => import("../pages/Auth/Login"), 2000))
);

const RegisterPage = Loadable(
  // lazy(() => import("../pages/Auth/SignUp"))
  lazy(() => delayLoad(() => import("../pages/Auth/SignUp"), 1000))
);