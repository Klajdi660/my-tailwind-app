import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { verifyValidation } from "../../utils";
import { Template } from "../../components";

const VerifyEmail: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    // <Form 
    //   lists={lists}
    //   onSubmit={handleOnSubmit}
    //   schema={verifyValidation}
    // />
    <Template
      title="Verify your account"
      description="to continue to Groove"
      formType="verify-email"
    />
  );
};
  
export default VerifyEmail;
