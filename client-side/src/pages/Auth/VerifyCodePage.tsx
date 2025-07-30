import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { useUserService } from "../../services";
import { FormTemplate } from "../../components";
import { VerifyAccountValues } from "../../types";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { verifyAccount, verifyCode, resendCode } = useUserService();

  const { verifyCodeData } = location.state || {};
  const { action, toFormName, username, email, phoneNr, fullname } =
    verifyCodeData;

  const onSubmitVerifyCode = async (values: VerifyAccountValues) => {
    try {
      const payload = {
        code: values.code,
        username,
      };

      toFormName === "verify-account"
        ? await verifyAccount(payload)
        : await verifyCode({ ...payload, action });
    } catch (error) {
      values.reset?.();
      console.error(`verify_code_page_error: ${JSON.stringify(error)}`);
    }
  };

  const resendCodeHandler = async () => {
    try {
      await resendCode({ username, action, email, phoneNr, fullname });
    } catch (error) {
      console.error(`verify_code_page_error_2: ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      {verifyCodeData && toFormName ? (
        <FormTemplate
          nameForm={toFormName}
          onSubmit={onSubmitVerifyCode}
          resendCodeHandler={resendCodeHandler}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
