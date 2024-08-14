import { FC } from "react";
import { useParams } from "react-router-dom";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { resetPassValidation } from "../../utils";
import { ResetPasswordPageProps, ResetPasswordValues } from "../../types";

export const ResetPasswordPage: FC<ResetPasswordPageProps> = () => {
  const { email, hash } = useParams();
  const { resetPassword } = useAuthService();

  const onSubmitResetPassHandler = async (values: ResetPasswordValues) => {
    try {
      await resetPassword(values, email, hash);
    } catch (error) {
      console.error(`Failed to update password! ${error}`);
    }
  };

  return (
    <FormTemplate
      onSubmit={onSubmitResetPassHandler}
      schema={resetPassValidation}
    />
  );
};
