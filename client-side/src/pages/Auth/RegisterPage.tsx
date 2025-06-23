import { FC } from "react";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { registerValidation } from "../../utils";
import { RegisterUserValues } from "../../types";

export const RegisterPage: FC = () => {
  const { register } = useAuthService();

  const onSubmitRegisterHandler = async (values: RegisterUserValues) => {
    try {
      console.log("values :>> ", values);
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
