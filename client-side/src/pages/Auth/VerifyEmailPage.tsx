import { FC } from "react";
import { useLocation } from "react-router-dom";
import { FormTemplate } from "../../components";
import { verifyValidation } from "../../utils";
import { useAuthService } from "../../services";
import { VerifyEmailValues } from "../../types";

export const VerifyEmailPage: FC = () => {
  const location = useLocation();
  const { emailVerify, register } = useAuthService();

  const { registerData } = location.state || {};

  const onSubmitVerifyEmailHandler = async (values: VerifyEmailValues) => {
    try {
      const { code } = values;
      await emailVerify({
        code,
        email: registerData?.email,
      });
    } catch (error) {
      console.error(`Failed sending code! ${error}`);
    }
  };

  const resendCodeHandler = async () => {
    try {
      await register(registerData);
    } catch (error) {
      console.error(`Failed to resend code! ${error}`);
    }
  };

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitVerifyEmailHandler}
      resendCodeHandler={resendCodeHandler}
      data={registerData}
    />
  );
};
