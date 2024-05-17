import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import useAuthService from "../../services/AuthService";
import { RegisterUserInput } from "../../types/user.type";
import { registerValidation } from "../../utils";

const Register: FunctionComponent = () => {
  const { lists } = useFormList();
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
      lists={lists}
      schema={registerValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default Register;
