import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { forgotPassValidation } from "../../utils";
import { Template } from "../../components";

const ForgotPassword: FunctionComponent = () => {
  const { lists } = useFormList();
  console.log("lists  res:>> ", lists);
  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={forgotPassValidation}
    />
  );
};

export default ForgotPassword;
