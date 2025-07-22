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
      console.error(`verify_code_page_error: ${JSON.stringify(error)}`);
    }
  };

  const resendCodeHandler = async () => {
    try {
      await register(verifyCodeData);
    } catch (error) {
      console.error(`verify_code_page_error_2: ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      {verifyCodeData && verifyCodeData.toFormName ? (
        <VerifyCodeForm
          onSubmit={onSubmitVerifyCode}
          resendCodeHandler={resendCodeHandler}
          data={verifyCodeFormData[verifyCodeData.toFormName]}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
