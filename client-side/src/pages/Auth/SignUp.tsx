import { FunctionComponent} from "react";
import { Form } from "../../components/Auth/Form";
import { useFormList } from "../../hooks";
import { registerValidation } from "../../utils";
import { RegisterUserInput } from "../../types/user.type";
import { Template } from "../../components";

const SignUp: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: RegisterUserInput) => {};

  return (
    // <Form 
    //   lists={lists}
    //   schema={registerValidation}
    //   onSubmit={handleOnSubmit}
    // />
    <Template
      title="Create your account"
      description="to continue to Groove"
      formType="register"
    />
  );
};

export default SignUp;
