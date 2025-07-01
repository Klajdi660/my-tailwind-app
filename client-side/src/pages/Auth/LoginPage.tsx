import { FC } from "react";
import { LoginUserValues } from "../../types";
import { loginValidation } from "../../utils";
import { FormTemplate, LoginForm } from "../../components";
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

  return (
    // <FormTemplate schema={loginValidation} onSubmit={onSubmitLoginHandler} />
    <LoginForm onSubmit={onSubmitLoginHandler} />
  );
};
