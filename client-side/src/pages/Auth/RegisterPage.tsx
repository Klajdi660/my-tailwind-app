import { FC } from "react";
import { RegisterForm } from "../../components";
import { useAuthService } from "../../services";
import { RegisterUserValues } from "../../types";

export const RegisterPage: FC = () => {
  const { register } = useAuthService();

  const onSubmitRegisterHandler = async (values: RegisterUserValues) => {
    try {
      await register(values);
    } catch (error) {
      console.error(`Failed to register! ${error}`);
    }
  };

  return <RegisterForm onSubmit={onSubmitRegisterHandler} />;
};
