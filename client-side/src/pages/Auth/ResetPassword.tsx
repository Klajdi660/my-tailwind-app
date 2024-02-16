import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { forgotPassValidation } from "../../utils";

const ResetPassword: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Form 
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={forgotPassValidation}
    />
  );
};

export default ResetPassword;
