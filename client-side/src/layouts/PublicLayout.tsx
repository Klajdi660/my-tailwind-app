import { FC } from "react";
import { ProviderProps } from "../types";

export const PublicLayout: FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};
