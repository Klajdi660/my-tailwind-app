import { FC } from "react";
import {
  PasswordConfirmCodeValues,
  PasswordConfirmCodePageProps,
} from "../../types";
import { FormTemplate } from "../../components";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FC<PasswordConfirmCodePageProps> = () => {
  const onSubmitPassConfirmCodeHandler = async (
    values: PasswordConfirmCodeValues
  ) => {};

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitPassConfirmCodeHandler}
    />
  );
};
