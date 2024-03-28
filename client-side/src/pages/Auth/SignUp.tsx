import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
// import useAuthService from "../../services/AuthService";
import { RegisterUserInput } from "../../types/user.type";
import { registerValidation } from "../../lib";

const SignUp: FunctionComponent = () => {
  const { lists } = useFormList();
  // const { signup } = useAuthService();

  const handleOnSubmit = async (values: RegisterUserInput) => {};

  return (
    <Template
      lists={lists}
      schema={registerValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default SignUp;
