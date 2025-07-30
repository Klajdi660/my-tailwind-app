import { FC } from "react";
import { verifyValidation } from "../../utils";
import { FormTemplate } from "../../components";

export const PasswordConfirmCodePage: FC = () => {
  const onSubmitPassConfirmCode = async () => {};

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitPassConfirmCode}
    />
  );
};
