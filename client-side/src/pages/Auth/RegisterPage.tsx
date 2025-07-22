import { FC } from "react";
import {
  AuthForm,
  //  RegisterForm
} from "../../components";
import { useAuthService } from "../../services";
import { RegisterUserValues } from "../../types";

export const RegisterPage: FC = () => {
  const { register } = useAuthService();

  const onSubmitRegister = async (values: RegisterUserValues) => {
    try {
      await register(values);
    } catch (error) {
      console.error(`register_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <AuthForm onSubmit={onSubmitRegister} nameForm="register" />;
  // return <RegisterForm onSubmit={onSubmitRegister} />;
};
