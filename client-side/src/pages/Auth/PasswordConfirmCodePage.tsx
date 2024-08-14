import { FC } from "react";
import {
  PasswordConfirmCodeInput,
  PasswordConfirmCodePageProps,
} from "../../types";
import { FormTemplate } from "../../components";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FC<PasswordConfirmCodePageProps> = () => {
  const onSubmitPassConfirmCodeHandler = async (
    values: PasswordConfirmCodeInput
  ) => {};

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitPassConfirmCodeHandler}
    />
  );
};
