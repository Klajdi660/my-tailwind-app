import { FC, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthService } from "../../services";

export const SocialAuth: FC = () => {
  const { loginWithSocialApp } = useAuthService();

  const location = useLocation();

  const tokenParam = location.search;

  useEffect(() => {
    const fetchData = async () => {
      await loginWithSocialApp(tokenParam);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenParam]);

  return (
    <>
      <Navigate to="/discover" />
    </>
  );
};

export default SocialAuth;
