import { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks";
import { ProviderProps } from "../types";
import { isATokenExpired, useAppModal } from "../utils";
import { paths } from "../data";

export const PrivateGuard: FunctionComponent<ProviderProps> = ({
  children,
}) => {
  // const { isAuthenticated } = useAuth();
  const { setModalOpen } = useAppModal();
  const location = useLocation();

  useEffect(() => {
    const checkATokenExpiry = () => {
      if (isATokenExpired()) {
        setModalOpen("sessionExpiredModal", true);
      }
    };

    checkATokenExpiry();

    // Check token expiration every time localStorage.exp changes
    const interval = setInterval(checkATokenExpiry, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};
