import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { forgotPassValidation } from "../../utils";
import { Template } from "../../components";
import useAuthService from "../../services/AuthService";
import { ForgotPasswordInput } from "../../types/user.type";

const ForgotPassword: FunctionComponent = () => {
  const { lists } = useFormList();
  const { verifyEmail } = useAuthService();

  const handleOnSubmit = async (values: ForgotPasswordInput) => {
    try {
      await verifyEmail(values);
    } catch (error) {
      console.error(`Failed to verify email! ${error}`);
    }
  };

  return (
    <Template
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={forgotPassValidation}
    />
  );
};

export default ForgotPassword;
