import { FC } from "react";
import { nameOfForm } from "../../data";
import { AuthForm } from "../../components";
import { CreateUserValues } from "../../types";
import { useUserService } from "../../services";

export const RegisterPage: FC = () => {
  const { REGISTER } = nameOfForm;

  const { createUser } = useUserService();

  const onSubmitRegister = async (values: CreateUserValues) => {
    try {
      await createUser(values);
    } catch (error) {
      console.error(`register_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <AuthForm onSubmit={onSubmitRegister} nameForm={REGISTER} />;
};
