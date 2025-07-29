import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../data";
import { useAppSelector } from "../store";

export const PublicGuard: FC = () => {
  const { DISCOVER, SAVE_AUTH_DATA } = paths;

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { remember } = useAppSelector((state) => state.user);

  const navigateTo = remember ? DISCOVER : SAVE_AUTH_DATA;

  return !isAuthenticated ? <Outlet /> : <Navigate to={navigateTo} />;
};
