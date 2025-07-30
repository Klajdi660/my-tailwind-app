import { FC } from "react";
import { useLocation } from "react-router-dom";
import { FormTemplate } from "../../components";
// import { useAuthService } from "../../services";

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  // const { resetPassword } = useAuthService();

  const { toFormName } = location.state || {};

  const onSubmitResetPassword = async (values: any) => {
    try {
      // await resetPassword(values);
    } catch (error) {
      console.error(`reset_password_page_error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <FormTemplate nameForm={toFormName} onSubmit={onSubmitResetPassword} />
  );
};
