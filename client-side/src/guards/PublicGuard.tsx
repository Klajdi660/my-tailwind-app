import { FC } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../data";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";

export const PublicGuard: FC<ProviderProps> = ({ children }) => {
  const { /*discover,*/ saveAuthData } = paths;

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return !isAuthenticated ? children : <Navigate to={saveAuthData} />;
};
