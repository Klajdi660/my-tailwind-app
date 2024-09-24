import { FC, useEffect } from "react";
import { ProviderProps } from "../types";
import { isATokenExpired, useAppModal } from "../utils";
import { useAppSelector } from "../store";
import { paths } from "../data";
import { Navigate } from "react-router-dom";

export const PrivateGuard: FC<ProviderProps> = ({ children }) => {
  const { setModalOpen } = useAppModal();

  // useEffect(() => {
  //   const checkATokenExpiry = () => {
  //     if (isATokenExpired()) {
  //       setModalOpen("sessionExpiredModal", true);
  //     }
  //   };

  //   checkATokenExpiry();

  //   // Check token expiration every time localStorage.exp changes
  //   const interval = setInterval(checkATokenExpiry, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const { login, home } = paths;

  const { atoken } = useAppSelector((state) => state.auth);

  return atoken !== null ? children : <Navigate to={home} />;
};
