import { FunctionComponent } from "react";
// import { useFormList } from "../../hooks";
import { resetPassValidation } from "../../utils";
import { Template } from "../../components";
import { formList } from "../../data";
import { ChangePasswordPageProps } from "../../types";

const ChangePassword: FunctionComponent<ChangePasswordPageProps> = () => {
  // const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      lists={formList?.["reset-password"]}
      onSubmit={handleOnSubmit}
      schema={resetPassValidation}
    />
  );
};

export default ChangePassword;
