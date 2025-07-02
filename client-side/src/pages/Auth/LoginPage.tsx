import { FC } from "react";
import { LoginForm } from "../../components";
import { LoginUserValues } from "../../types";
import { useAuthService } from "../../services";

export const LoginPage: FC = () => {
  const { login } = useAuthService();

  const onSubmitLoginHandler = async (values: LoginUserValues) => {
    try {
      await login(values);
    } catch (error) {
      console.error("Failed to login");
    }
  };

  return <LoginForm onSubmit={onSubmitLoginHandler} />;
};
