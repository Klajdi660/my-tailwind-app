import { FC } from "react";
import { LoginUserValues } from "../../types";
import { loginValidation } from "../../utils";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { LoginForm } from "../../components/Auth/LoginForm";

export const LoginPage: FC = () => {
  const { login } = useAuthService();

  const onSubmitLoginHandler = async (values: LoginUserValues) => {
    try {
      await login(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  return (
    // <FormTemplate schema={loginValidation} onSubmit={onSubmitLoginHandler} />
    <LoginForm onSubmit={onSubmitLoginHandler} />
  );
};
