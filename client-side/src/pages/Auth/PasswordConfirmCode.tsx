import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { PasswordConfirmCodePageProps } from "../../types";
import { verifyValidation } from "../../utils";

const PasswordConfirmCode: FunctionComponent<
  PasswordConfirmCodePageProps
> = () => {
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
