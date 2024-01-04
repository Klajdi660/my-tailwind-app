import { FunctionComponent } from "react";
import { Template } from "../../components";

const ChangePassword: FunctionComponent = () => {
  return (
    <Template
      title="Choose new password"
      description="Almost done. Enter your new password and youre all set."
      formType="changePassword"
    />
  );
};

export default ChangePassword;
