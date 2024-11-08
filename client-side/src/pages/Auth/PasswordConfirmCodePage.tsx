import { FC } from "react";
import { FormTemplate } from "../../components";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FC = () => {
  const onSubmitPassConfirmCodeHandler = async () => {};

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitPassConfirmCodeHandler}
    />
  );
};
