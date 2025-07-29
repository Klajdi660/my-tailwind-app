import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../data";
import { useStore } from "../hooks";
import { useAppSelector } from "../store";
import { isTokenExpired } from "../utils";

export const PrivateGuard: FC = () => {
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
  }, [closeAllModals, setModalOpen]);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to={HOME} />;
};
