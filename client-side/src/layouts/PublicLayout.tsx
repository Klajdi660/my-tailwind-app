import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ScrollProvider } from "../providers";
import { TabTitle } from "../components";

export const PublicLayout: FC = () => {
  return (
    <ScrollProvider>
      <TabTitle />
      <Outlet />
    </ScrollProvider>
  );
};
