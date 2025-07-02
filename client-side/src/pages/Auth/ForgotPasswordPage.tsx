import { FC } from "react";
import { useAuthService } from "../../services";
import { ForgotPasswordValues } from "../../types";
import { ForgotPasswordForm } from "../../components";

export const ForgotPasswordPage: FC = () => {
  const { forgotPassword } = useAuthService();

  const onSubmitForgotPassHandler = async (values: ForgotPasswordValues) => {
    try {
      await forgotPassword(values);
    } catch (error) {
      console.error(`Failed to verify email! ${error}`);
    }
  };

  return <ForgotPasswordForm onSubmit={onSubmitForgotPassHandler} />;
};
