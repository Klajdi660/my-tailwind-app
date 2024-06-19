import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation } from "../../utils";

export const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { listForm } = useForm();
  const { login } = useAuthService();

  const rememberMe = useSelector((state: any) => state.rememberMe);

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
      return { ...rememberMe };
    } else {
      delete localStorage.rtoken;
      return {};
    }
  })();

  return (
    <Template
      listForm={listForm}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default LoginPage;
