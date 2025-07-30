import { FC } from "react";
import { UseFormReset } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { LoginHelpValues } from "../../types";
import { useAuthService } from "../../services";
import { LoginHelpForm } from "../../components";
import { loginHelpActionName, loginHelpFormData } from "../../data";

export const LoginHelpPage: FC = () => {
  const location = useLocation();
  const { loginHelp } = useAuthService();

  const { toFormName } = location.state || {};
  const metadata = loginHelpFormData[toFormName];

  const onSubmitLogiHelp = async (
    values: LoginHelpValues,
    reset: UseFormReset<LoginHelpValues>
  ) => {
    try {
      values.action = loginHelpActionName[toFormName];
      values.toFormName = metadata.toFormName;
      await loginHelp(values);
    } catch (error) {
      reset();
      console.error(`login_help_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <LoginHelpForm metadata={metadata} onSubmit={onSubmitLogiHelp} />;
};
