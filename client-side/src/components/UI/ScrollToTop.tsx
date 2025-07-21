import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollToTopProps } from "../../types";

export const ScrollToTop: FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};
