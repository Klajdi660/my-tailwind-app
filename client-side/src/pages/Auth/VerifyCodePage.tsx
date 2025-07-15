import { FC } from "react";
import { useLocation } from "react-router-dom";
import { VerifyCodeValues } from "../../types";
import { useAuthService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyCodeForm } from "../../components";
import { ErrorPage } from "../ErrorPage";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { verifyCode, register } = useAuthService();

  const { verifyCodData } = location.state || {};

  const onSubmitVerifyCode = async (values: VerifyCodeValues) => {
    try {
      await verifyCode({
        code: values.code,
        email: verifyCodData?.email,
      });
    } catch (error) {
      console.error("Failed sending code");
    }
  };

  const resendCodeHandler = async () => {
    try {
      await register(verifyCodData);
    } catch (error) {
      console.error("Failed to resend code");
    }
  };

  return (
    <>
      {verifyCodData && verifyCodData.nameForm ? (
        <VerifyCodeForm
          onSubmit={onSubmitVerifyCode}
          resendCodeHandler={resendCodeHandler}
          data={verifyCodeFormData[verifyCodData.nameForm]}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
