import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation, isRTokenExpired } from "../../utils";

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

  const defaultValues = (() => {
    if (rememberMe.remember && isRTokenExpired()) {
      return rememberMe;
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
