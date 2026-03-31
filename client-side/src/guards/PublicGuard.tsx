import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../data";
import { useAppSelector } from "../store";

export const PublicGuard: FC = () => {
  const { remember } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navigateTo = remember ? paths.DISCOVER : paths.SAVE_AUTH_DATA;

  return !isAuthenticated ? <Outlet /> : <Navigate to={navigateTo} />;
};
