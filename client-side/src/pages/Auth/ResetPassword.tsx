import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { forgotPassValidation } from "../../lib";
import { Template } from "../../components";

const ResetPassword: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    // <Form
    //   lists={lists}
    //   onSubmit={handleOnSubmit}
    //   schema={forgotPassValidation}
    // />
    <Template
      title="Reset Password"
      description="to continue to Groove"
      formType="forgot-password"
    />
  );
};

export default ResetPassword;
