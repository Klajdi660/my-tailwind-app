import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { VerifyCodeValues } from "../../types";
import { useAuthService, useUserService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyCodeForm } from "../../components";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { verifyCode } = useAuthService();
  const { createUser } = useUserService();

  const { verifyCodeData } = location.state || {};
  console.log("verifyCodeData :>> ", verifyCodeData);
  const onSubmitVerifyCode = async (values: VerifyCodeValues) => {
    console.log("values :>> ", values);
    console.log(
      "typeof verifyCodeData.username :>> ",
      typeof verifyCodeData.username
    );
    try {
      await verifyCode({
        code: values.code,
        username: verifyCodeData.username,
      });
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
