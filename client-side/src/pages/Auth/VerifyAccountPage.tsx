import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useAuthService } from "../../services";
import { VerifyAccountValues } from "../../types";
import { VerifyAccountForm } from "../../components";

export const VerifyAccountPage: FC = () => {
  const location = useLocation();
  const { verifyAccount, register } = useAuthService();

  const { registerData } = location.state || {};

  const onSubmitVerifyAccountHandler = async (values: VerifyAccountValues) => {
    try {
      await verifyAccount({
        code: values.code,
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
    <VerifyAccountForm
      onSubmit={onSubmitVerifyAccountHandler}
      resendCodeHandler={resendCodeHandler}
    />
  );
};
