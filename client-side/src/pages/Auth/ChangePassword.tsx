import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { useFormList } from "../../hooks";
import { resetPassValidation } from "../../utils";
import { Template } from "../../components";
// import { formList } from "../../data";
import { ChangePasswordPageProps } from "../../types";
import { useAuthService } from "../../services";

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
