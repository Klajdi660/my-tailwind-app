import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation } from "../../utils";

const Login: FunctionComponent<LoginPageProps> = () => {
  const { lists } = useFormList();
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
      lists={lists}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default Login;
