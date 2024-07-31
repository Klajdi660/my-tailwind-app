import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { Template } from "../../components";
import { useAuthService } from "../../services";
import { resetPassValidation } from "../../utils";
import { ResetPasswordPageProps, ResetPasswordInput } from "../../types";

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
