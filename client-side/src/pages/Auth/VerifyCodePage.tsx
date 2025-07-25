import { FC } from "react";
import { UseFormReset } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { useUserService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyAccountValues } from "../../types";
import { VerifyCodeForm } from "../../components";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { verifyAccount, verifyCode, resendCode } = useUserService();

  const { verifyCodeData } = location.state || {};
  const { action, toFormName, username, email, phoneNr, fullname } =
    verifyCodeData;

  const onSubmitVerifyCode = async (
    values: VerifyAccountValues,
    reset: UseFormReset<VerifyAccountValues>
  ) => {
    try {
      const payload = {
        code: values.code,
        username,
      };

      toFormName === "verify-account"
        ? await verifyAccount(payload)
        : await verifyCode({ ...payload, action });
    } catch (error) {
      reset();
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
        <VerifyCodeForm
          onSubmit={onSubmitVerifyCode}
          resendCodeHandler={resendCodeHandler}
          data={verifyCodeFormData[toFormName]}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
