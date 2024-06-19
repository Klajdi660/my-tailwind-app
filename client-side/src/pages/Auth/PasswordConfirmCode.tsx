import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import {
  PasswordConfirmCodePageProps,
  PasswordConfirmCodeInput,
} from "../../types";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FunctionComponent<
  PasswordConfirmCodePageProps
> = () => {
  const { listForm } = useForm();
  const handleOnSubmit = async (values: PasswordConfirmCodeInput) => {};

  return (
    <Template
      listForm={listForm}
      schema={verifyValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default PasswordConfirmCodePage;
