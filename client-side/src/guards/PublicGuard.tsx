import { FC } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../data";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";

export const PublicGuard: FC<ProviderProps> = ({ children }) => {
  const { DISCOVER, SAVE_AUTH_DATA } = paths;

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { remember } = useAppSelector((state) => state.user);

  const navigateTo = remember ? DISCOVER : SAVE_AUTH_DATA;

  return !isAuthenticated ? children : <Navigate to={navigateTo} />;
};
