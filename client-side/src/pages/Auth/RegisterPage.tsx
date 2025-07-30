import { FC } from "react";
import { nameOfForm } from "../../data";
import { FormTemplate } from "../../components";
import { useUserService } from "../../services";
import { CreateAccountValues } from "../../types";

export const RegisterPage: FC = () => {
  const { REGISTER } = nameOfForm;

  const { createAccount } = useUserService();

  const onSubmitRegister = async (values: CreateAccountValues) => {
    try {
      await createAccount(values);
    } catch (error) {
      console.error(`register_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <FormTemplate onSubmit={onSubmitRegister} nameForm={REGISTER} />;
};
