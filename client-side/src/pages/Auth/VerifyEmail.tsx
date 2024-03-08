import { FunctionComponent } from "react";
import { Template } from "../../components";

const VerifyEmail: FunctionComponent = () => {
  return (
    <Template
      title="Verify your account"
      description="to continue to Groove"
      formType="verify-email"
      btnText="Verify Email"
    />
  );
};
  
export default VerifyEmail;
