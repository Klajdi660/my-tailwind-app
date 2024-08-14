import { FC, useState } from "react";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { forgotPassValidation } from "../../utils";
import { ForgotPasswordInput, ForgotPasswordPagePropes } from "../../types";

export const ForgotPasswordPage: FC<ForgotPasswordPagePropes> = () => {
  const { forgotPassword } = useAuthService();

  const [resetPassEmail, setResetEmail] = useState<string>("");
  const [resetPassEmailSent, setResetPassEmailSent] = useState<boolean>(false);

  const onSubmitForgotPassHandler = async (values: ForgotPasswordInput) => {
    try {
      await forgotPassword(values);
      setResetEmail(values.email);
      setResetPassEmailSent(true);
    } catch (error) {
      console.error(`Failed to verify email! ${error}`);
    }
  };

  return (
    <FormTemplate
      onSubmit={onSubmitForgotPassHandler}
      schema={forgotPassValidation}
      data={{ resetPassEmailSent, resetPassEmail }}
    />
  );
};
