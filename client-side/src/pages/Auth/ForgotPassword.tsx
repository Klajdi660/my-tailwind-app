import { FunctionComponent, useState } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { useAuthService } from "../../services";
import { ForgotPasswordInput, ForgotPasswordPagePropes } from "../../types";
import { forgotPassValidation } from "../../utils";

export const ForgotPasswordPage: FunctionComponent<
  ForgotPasswordPagePropes
> = () => {
  const { lists } = useFormList();
  const { forgotPassword } = useAuthService();
  const [resetPassEmail, setResetEmail] = useState<string>("");
  const [resetPassEmailSent, setResetPassEmailSent] = useState<boolean>(false);

  const handleOnSubmit = async (values: ForgotPasswordInput) => {
    try {
      await forgotPassword(values);
      setResetEmail(values.email);
      setResetPassEmailSent(true);
    } catch (error) {
      console.error(`Failed to verify email! ${error}`);
    }
  };

  return (
    <Template
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={forgotPassValidation}
      data={{ resetPassEmailSent, resetPassEmail }}
    />
  );
};

export default ForgotPasswordPage;
