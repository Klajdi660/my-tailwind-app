import { FC } from "react";
import { AuthForm } from "../../components";
import { useAuthService } from "../../services";
import { RegisterUserValues } from "../../types";

export const RegisterPage: FC = () => {
  const { register } = useAuthService();

  const onSubmitRegister = async (values: RegisterUserValues) => {
    try {
      await register(values);
    } catch (error) {
      console.error(`Failed to register! ${error}`);
    }
  };

  return <AuthForm onSubmit={onSubmitRegister} nameForm="register" />;
};
