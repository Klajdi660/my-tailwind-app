import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { useAuthService } from "../../services";
import { ChangePasswordPageProps } from "../../types";
import { resetPassValidation } from "../../utils";

const ChangePassword: FunctionComponent<ChangePasswordPageProps> = () => {
  const { lists } = useFormList();
  const { email, hash } = useParams();
  const { resetPassword } = useAuthService();

  const handleOnSubmit = async (values: any) => {
    try {
      await resetPassword(values, email, hash);
    } catch (error) {
      console.error(`Failed to update password! ${error}`);
    }
  };

  return (
    <Template
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={resetPassValidation}
    />
  );
};

export default ChangePassword;
