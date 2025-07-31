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

  const handleSubmit = async (values: VerifyAccountValues) => {
    const isVerifyAccount = ["verify-account"].includes(toFormName);
    if (isVerifyAccount) {
      await verifyAccount({ ...values, username });
    } else {
      await verifyCode({ ...values, action, toFormName });
    }
  };

  const resendCodeHandler = async () => {
    await resendCode({ username, action, email, phoneNr, fullname });
  };

  return (
    <>
      {verifyCodeData && toFormName ? (
        <FormTemplate
          nameForm={toFormName}
          onSubmit={handleSubmit}
          resendCodeHandler={resendCodeHandler}
        />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
