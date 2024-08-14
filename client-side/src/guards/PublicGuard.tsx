import { FC } from "react";
import { ProviderProps } from "../types";

export const PublicGuard: FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};
