/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthService } from "../../services";

export const SocialAuth: FC = () => {
  const { socialAuth } = useAuthService();

  const location = useLocation();

  const tokenParam = location.search;

  useEffect(() => {
    const fetchData = async () => {
      await socialAuth(tokenParam);
    };
    fetchData();
  }, [tokenParam]);

  return (
    <>
      <Navigate to="/discover" />
    </>
  );
};

export default SocialAuth;
