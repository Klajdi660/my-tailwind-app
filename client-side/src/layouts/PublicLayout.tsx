import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ScrollProvider } from "../providers";

export const PublicLayout: FC = () => {
  return (
    <ScrollProvider>
      <Outlet />
    </ScrollProvider>
  );
};
