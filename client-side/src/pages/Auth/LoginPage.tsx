import { FC } from "react";
import { LoginUserValues } from "../../types";
import { loginValidation } from "../../utils";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";

export const LoginPage: FC = () => {
  const { login } = useAuthService();

  const onSubmitLoginHandler = async (values: LoginUserValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  return (
    <FormTemplate schema={loginValidation} onSubmit={onSubmitLoginHandler} />
  );
};
