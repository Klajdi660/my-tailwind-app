import { FC } from "react";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { registerValidation } from "../../utils";
import { RegisterUserValues, RegisterPageProps } from "../../types";

export const RegisterPage: FC<RegisterPageProps> = () => {
  const { register } = useAuthService();

  const onSubmitRegisterHandler = async (values: RegisterUserValues) => {
    try {
      await register(values);
    } catch (error) {
      console.error(`Failed to register! ${error}`);
    }
  };

  return (
    <FormTemplate
      schema={registerValidation}
      onSubmit={onSubmitRegisterHandler}
    />
  );
};
