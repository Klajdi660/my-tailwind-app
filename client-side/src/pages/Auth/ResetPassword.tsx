import { FunctionComponent } from "react";
import { Template } from "../../components";

const ResetPassword: FunctionComponent = () => {
  return (
    <Template
      title="Reset your password"
      description="We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
      formType="resetPassword"
    />
  );
};

export default ResetPassword;
