import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { forgotPassValidation } from "../../utils";
import { Template } from "../../components";

const ResetPassword: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={forgotPassValidation}
    />
  );
};

export default ResetPassword;
