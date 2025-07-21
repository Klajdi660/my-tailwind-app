import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { VerifyCodeValues } from "../../types";
import { useAuthService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyCodeForm } from "../../components";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { verifyCode, register } = useAuthService();

  const { verifyCodeData } = location.state || {};

  const onSubmitVerifyCode = async (values: VerifyCodeValues) => {
    try {
      await verifyCode({
        code: values.code,
        email: verifyCodeData?.email,
      });
    } catch (error) {
      console.error("Failed sending code");
    }
  };

  const resendCodeHandler = async () => {
    try {
      await register(verifyCodeData);
    } catch (error) {
      console.error("Failed to resend code");
    }
  };

  return (
    <>
      {verifyCodeData && verifyCodeData.nameForm ? (
        <VerifyCodeForm
          onSubmit={onSubmitVerifyCode}
          resendCodeHandler={resendCodeHandler}
          data={verifyCodeFormData[verifyCodeData.nameForm]}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
