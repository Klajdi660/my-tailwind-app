import { FunctionComponent, useEffect } from "react";
import { ProviderProps } from "../types";
import { isATokenExpired, useAppModal } from "../utils";

export const PrivateGuard: FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const { setModalOpen } = useAppModal();

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
