import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { forgotPassValidation } from "../../utils";
import { Template } from "../../components";
import { useAuthService } from "../../services";
import { ForgotPasswordInput, ForgotPasswordPagePropes } from "../../types";

const ForgotPassword: FunctionComponent<ForgotPasswordPagePropes> = () => {
  const { lists } = useFormList();
  const { forgotPassword } = useAuthService();

  const handleOnSubmit = async (values: ForgotPasswordInput) => {
    try {
      await forgotPassword(values);
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
