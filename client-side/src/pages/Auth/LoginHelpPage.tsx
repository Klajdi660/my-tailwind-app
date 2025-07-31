import { FC } from "react";
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

  const handleSubmit = async (values: LoginHelpValues) => {
    values.action = loginHelpActionName[toFormName];
    values.toFormName = metadata.toFormName;
    await loginHelp(values);
  };

  return <LoginHelpForm metadata={metadata} onSubmit={handleSubmit} />;
};
