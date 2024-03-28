import { FunctionComponent } from "react";
// import { useFormList } from "../../hooks";
import { resetPassValidation } from "../../lib";
import { Template } from "../../components";
import { formList } from "../../constants";

const ChangePassword: FunctionComponent = () => {
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
