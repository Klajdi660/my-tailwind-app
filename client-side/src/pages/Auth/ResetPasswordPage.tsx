import { FC } from "react";
import { useLocation } from "react-router-dom";
import { FormTemplate } from "../../components";
import { useUserService } from "../../services";

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const { resetPassword } = useUserService();

  const { toFormName, username } = location.state || {};

  const handleSubmit = async (values: any) => {
    values.username = username;
    await resetPassword(values);
  };

  return <FormTemplate nameForm={toFormName} onSubmit={handleSubmit} />;
};
