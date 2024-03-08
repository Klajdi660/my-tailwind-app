import { FunctionComponent } from "react";
import { Template } from "../../components";

const PasswordConfirmCode: FunctionComponent = () => {
  return (
    <Template
      title="Enter code to reset password"
      description="to continue to Groove"
      formType="password-code"
      btnText="Reset Password"
    />
  );
};
  
export default PasswordConfirmCode;
