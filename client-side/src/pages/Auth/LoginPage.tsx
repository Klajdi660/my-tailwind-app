import { FC } from "react";
import { LoginValues } from "../../types";
import {
  AuthForm,
  // LoginForm
} from "../../components";
import { useAuthService } from "../../services";

export const LoginPage: FC = () => {
  const { login } = useAuthService();

  const onSubmitLogin = async (values: LoginValues) => {
    try {
      await login(values);
    } catch (error) {
      console.error(`login_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <AuthForm onSubmit={onSubmitLogin} nameForm="login" />;
  // return <LoginForm onSubmit={onSubmitLogin} />;
};
