import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { useAuthService } from "../../services";
import { VerifyEmailPagePorps } from "../../types";
import { verifyValidation } from "../../utils";

export const VerifyEmailPage: FunctionComponent<VerifyEmailPagePorps> = () => {
  const location = useLocation();
  const { lists } = useFormList();
  const { verifyEmail, register } = useAuthService();

  const { registerData } = location.state || {};

  const handleOnSubmit = async (values: any) => {
    try {
      const { code } = values;
      await verifyEmail({
        code,
        email: registerData?.email,
      });
    } catch (error) {
      console.error(`Failed sending code! ${error}`);
    }
  };

  const handleResendCode = async () => {
    try {
      await register(registerData);
    } catch (error) {
      console.error(`Failed to resend code! ${error}`);
    }
  };

  return (
    <Template
      lists={lists}
      schema={verifyValidation}
      onSubmit={handleOnSubmit}
      handleResendCode={handleResendCode}
      data={registerData}
    />
  );
};

export default VerifyEmailPage;
