import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProviderProps } from "../types";

export const ScrollProvider: FC<ProviderProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};
