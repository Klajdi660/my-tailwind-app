import { FunctionComponent } from "react";
import { ProviderProps } from "../types";

export const PublicGuard: FunctionComponent<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};
