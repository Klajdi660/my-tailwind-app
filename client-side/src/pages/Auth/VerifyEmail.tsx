import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import { verifyValidation } from "../../lib";

const VerifyEmail: FunctionComponent = () => {
  const { lists } = useFormList();
  const handleOnSubmit = async (values: any) => {
    console.log("values OTP:>> ", values);
  };

  return (
    <Template
      lists={lists}
      schema={verifyValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default VerifyEmail;
