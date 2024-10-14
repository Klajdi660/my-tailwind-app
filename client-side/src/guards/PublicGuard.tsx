import { FC } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../data";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";

export const PublicGuard: FC<ProviderProps> = ({ children }) => {
  const { discover } = paths;

  const { user } = useAppSelector((state) => state.user);

  return user === null ? children : <Navigate to={discover} />;
};
