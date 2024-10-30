/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../data";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";
import { isATokenExpired, useAppModal } from "../utils";

export const PrivateGuard: FC<ProviderProps> = ({ children }) => {
  const { home, accountSaved } = paths;

  const { setModalOpen } = useAppModal();

  useEffect(() => {
    const checkATokenExpiry = () => {
      if (isATokenExpired()) {
        setModalOpen("sessionExpiredModal", true);
      }
    };

    checkATokenExpiry();

    const interval = setInterval(checkATokenExpiry, 1000);

    return () => clearInterval(interval);
  }, []);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { remember } = useAppSelector((state) => state.user);

  const navigateTo = remember ? home : accountSaved;

  return isAuthenticated ? children : <Navigate to={navigateTo} />;
};
