import { FC } from "react";
import { nameOfForm } from "../../data";
import { LoginValues } from "../../types";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";

export const LoginPage: FC = () => {
  const { LOGIN } = nameOfForm;

  const { login } = useAuthService();

  const handleSubmit = async (values: LoginValues) => {
    await login(values);
  };

  return <FormTemplate nameForm={LOGIN} onSubmit={handleSubmit} />;
};
