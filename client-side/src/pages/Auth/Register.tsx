import { FunctionComponent } from "react";
import { useForm } from "../../hooks";
import { Template } from "../../components";
import { useAuthService } from "../../services";
import { registerValidation } from "../../utils";
import { RegisterUserInput, RegisterPageProps } from "../../types";

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
