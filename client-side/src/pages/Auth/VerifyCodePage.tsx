import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { VerifyAccountValues } from "../../types";
import { useUserService } from "../../services";
import { verifyCodeFormData } from "../../data";
import { VerifyCodeForm } from "../../components";
import { UseFormReset } from "react-hook-form";

export const VerifyCodePage: FC = () => {
  const location = useLocation();
  const { createAccount, verifyAccount, verifyCode } = useUserService();

  const { verifyCodeData } = location.state || {};
  const { action, toFormName, username } = verifyCodeData;

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
      await createAccount(verifyCodeData);
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
