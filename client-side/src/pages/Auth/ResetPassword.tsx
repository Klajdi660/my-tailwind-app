import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import { useAuthService } from "../../services";
import { ResetPasswordPageProps, ResetPasswordInput } from "../../types";
import { resetPassValidation } from "../../utils";

export const ResetPasswordPage: FunctionComponent<
  ResetPasswordPageProps
> = () => {
  const { listForm } = useForm();
  const { email, hash } = useParams();
  const { resetPassword } = useAuthService();

  const handleOnSubmit = async (values: ResetPasswordInput) => {
    try {
      await resetPassword(values, email, hash);
    } catch (error) {
      console.error(`Failed to update password! ${error}`);
    }
  };

  return (
    <Template
      listForm={listForm}
      onSubmit={handleOnSubmit}
      schema={resetPassValidation}
    />
  );
};

export default ResetPasswordPage;
