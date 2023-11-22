import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PrivateGuard, PublicGuard } from "../guards";
import { PrivateLayout, PublicLayout } from "../layouts";
import Loadable from "./Loadable";


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
    },
  ]);

export default Routes;

const DashboardPage = Loadable(
    lazy(() => import("../components/common/Sidebar"))
);