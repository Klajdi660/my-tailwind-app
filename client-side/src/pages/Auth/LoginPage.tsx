import { FC } from "react";
import { LoginValues } from "../../types";
import { LoginForm } from "../../components";
import { useAuthService } from "../../services";

export const LoginPage: FC = () => {
  const { login } = useAuthService();

  const onSubmitLogin = async (values: LoginValues) => {
    try {
      await login(values);
    } catch (error) {
      console.error("Failed to login");
    }
  };

  return <LoginForm onSubmit={onSubmitLogin} />;
};
