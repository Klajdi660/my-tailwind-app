import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Template } from "../../components";
import { useFormList, useAuth } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation } from "../../utils";

export const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { lists } = useFormList();
  const { isAuthenticated } = useAuth();
  const { login } = useAuthService();
  const navigate = useNavigate();

  const rememberMe = useSelector((state: any) => state.rememberMe);

  useEffect(() => {
    if (isAuthenticated)
      localStorage.lastLocation
        ? navigate(`/${localStorage.lastLocation}`)
        : navigate(`/discover`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = async (values: LoginUserInput) => {
    try {
      await login(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  const checkRTokenExpiry = () => {
    if (localStorage.rtoken) {
      const currentTime = dayjs().unix();
      const tokenExpirationTime = JSON.parse(localStorage.rtoken).exp;
      return parseInt(tokenExpirationTime) > currentTime;
    }
    return false;
  };

  const defaultValues = (() => {
    if (rememberMe.remember && checkRTokenExpiry()) {
      console.log("HYRI 111");
      return { ...rememberMe };
    } else {
      console.log("HYRI 222");
      delete localStorage.rtoken;
      return {};
    }
  })();

  return (
    <Template
      lists={lists}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default LoginPage;
