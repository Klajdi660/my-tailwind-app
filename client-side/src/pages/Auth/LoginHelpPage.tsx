import { FC } from "react";
import { useLocation } from "react-router-dom";
import { LoginHelpValues } from "../../types";
import { loginHelpActionName, loginHelpFormData } from "../../data";
import { useAuthService } from "../../services";
import { LoginHelpForm } from "../../components";

export const LoginHelpPage: FC = () => {
  const location = useLocation();

  const { loginHelp } = useAuthService();

  const { toFormName } = location.state || {};
  const metadata = loginHelpFormData[toFormName];

  const onSubmitLogiHelp = async (values: LoginHelpValues) => {
    try {
      values.action = loginHelpActionName[toFormName];
      values.toFormName = metadata.toFormName;
      await loginHelp(values);
    } catch (error) {
      console.error(`login_help_page_error: ${JSON.stringify(error)}`);
    }
  };

  return <LoginHelpForm metadata={metadata} onSubmit={onSubmitLogiHelp} />;
};
