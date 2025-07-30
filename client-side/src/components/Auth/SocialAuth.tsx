import { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
  }, [loginWithSocialApp, tokenParam]);

  return (
    <>
      <Navigate to="/discover" />
    </>
  );
};

export default SocialAuth;
