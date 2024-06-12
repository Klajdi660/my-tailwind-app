import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { PasswordConfirmCodePageProps } from "../../types";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FunctionComponent<
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

export default PasswordConfirmCodePage;
