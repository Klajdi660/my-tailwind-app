import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { verifyValidation } from "../../lib";

const PasswordConfirmCode: FunctionComponent = () => {
  const { lists } = useFormList();
  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      lists={lists}
      schema={verifyValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default PasswordConfirmCode;
