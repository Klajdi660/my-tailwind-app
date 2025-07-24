import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { VerifyAccountValues } from "../../types";
import { useUserService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyCodeForm } from "../../components";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { createUser, verifyAccount } = useUserService();

  const { verifyCodeData } = location.state || {};

  const onSubmitVerifyCode = async (values: VerifyAccountValues) => {
    try {
      if (["verify-account"].includes(verifyCodeData.toFormName)) {
        await verifyAccount({
          code: values.code,
          username: verifyCodeData.username,
        });
      }
    } catch (error) {
      console.error(`verify_code_page_error: ${JSON.stringify(error)}`);
    }
  };

  const resendCodeHandler = async () => {
    try {
      await createUser(verifyCodeData);
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
