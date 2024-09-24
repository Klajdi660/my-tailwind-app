import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";
import { paths } from "../data";

export const PublicGuard: FC<ProviderProps> = ({ children }) => {
  const { discover, home } = paths;

  const { atoken } = useAppSelector((state) => state.auth);

  return atoken === null ? children : <Navigate to={discover} />;
};
