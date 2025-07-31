import { FC } from "react";
import { nameOfForm } from "../../data";
import { FormTemplate } from "../../components";
import { useUserService } from "../../services";
import { CreateAccountValues } from "../../types";

export const RegisterPage: FC = () => {
  const { REGISTER } = nameOfForm;

  const { createAccount } = useUserService();

  const handleSubmit = async (values: CreateAccountValues) => {
    await createAccount(values);
  };

  return <FormTemplate nameForm={REGISTER} onSubmit={handleSubmit} />;
};
