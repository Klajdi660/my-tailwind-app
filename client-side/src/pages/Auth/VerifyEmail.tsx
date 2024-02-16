import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { verifyValidation } from "../../utils";

const VerifyEmail: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Form 
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={verifyValidation}
    />
  );
};
  
export default VerifyEmail;
