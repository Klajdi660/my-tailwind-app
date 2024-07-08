import { ProviderProps } from "../types";

export const ThemeProvider = ({ children }: ProviderProps): JSX.Element => {
  return <div className="app_container">{children}</div>;
};
