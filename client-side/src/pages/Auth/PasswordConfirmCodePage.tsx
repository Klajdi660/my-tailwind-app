import { FC } from "react";
import { FormTemplate } from "../../components";
import { verifyValidation } from "../../utils";

export const PasswordConfirmCodePage: FC = () => {
  const onSubmitPassConfirmCode = async () => {};

  return (
    <FormTemplate
      schema={verifyValidation}
      onSubmit={onSubmitPassConfirmCode}
    />
  );
};
