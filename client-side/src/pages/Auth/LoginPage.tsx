import { FC } from "react";
import { nameOfForm } from "../../data";
import { LoginValues } from "../../types";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";

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

  return <FormTemplate onSubmit={onSubmitLogin} nameForm={LOGIN} />;
};
