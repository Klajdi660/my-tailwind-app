import { FunctionComponent } from "react";
import {
  PasswordConfirmCodeInput,
  PasswordConfirmCodePageProps,
} from "../../types";
import { useForm } from "../../hooks";
import { Template } from "../../components";
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
