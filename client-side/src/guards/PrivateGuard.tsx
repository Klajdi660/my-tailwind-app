/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../data";
import { useStore } from "../hooks";
import { ProviderProps } from "../types";
import { useAppSelector } from "../store";
import { isTokenExpired } from "../utils";

export const PrivateGuard: FC<ProviderProps> = ({ children }) => {
  const { HOME } = paths;

  const { setModalOpen, closeAllModals } = useStore();

  useEffect(() => {
    const checkATokenExpiry = () => {
      const token = localStorage.getItem("atoken");
      if (token && isTokenExpired(token)) {
        closeAllModals();
        setModalOpen("sessionExpiredModal", true);
      }
    };

    checkATokenExpiry();

    const interval = setInterval(checkATokenExpiry, 1000);

    return () => clearInterval(interval);
  }, []);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to={HOME} />;
};
