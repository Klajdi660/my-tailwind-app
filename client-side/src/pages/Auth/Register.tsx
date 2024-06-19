import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import { useAuthService } from "../../services";
import { RegisterUserInput, RegisterPageProps } from "../../types";
import { registerValidation } from "../../utils";

export const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
  const { listForm } = useForm();
  const { register } = useAuthService();

  const handleOnSubmit = async (values: RegisterUserInput) => {
    try {
      await register(values);
    } catch (error) {
      console.error(`Failed to register! ${error}`);
    }
  };

  return (
    <Template
      listForm={listForm}
      schema={registerValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default RegisterPage;
