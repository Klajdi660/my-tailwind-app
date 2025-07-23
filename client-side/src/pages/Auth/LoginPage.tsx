import { FC } from "react";
import { nameOfForm } from "../../data";
import { LoginValues } from "../../types";
import { useAuthService } from "../../services";
import { AuthForm /*LoginForm*/ } from "../../components";

export const LoginPage: FC = () => {
  const { LOGIN } = nameOfForm;

  const { login } = useAuthService();

  const onSubmitLogin = async (values: LoginValues) => {
    try {
      await login(values);
    } catch (error) {
      console.error(`login_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <AuthForm onSubmit={onSubmitLogin} nameForm={LOGIN} />;
  // return <LoginForm onSubmit={onSubmitLogin} />;
};
