import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { resetPassValidation } from "../../lib";
import { Template } from "../../components";

const ChangePassword: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      title="Change Password"
      description="to continue to Groove"
      formType="reset-password"
    />
  );
};

export default ChangePassword;
