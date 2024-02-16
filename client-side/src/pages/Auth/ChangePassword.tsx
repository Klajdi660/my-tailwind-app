import { FunctionComponent } from "react";
import { useFormList } from "../../hooks";
import { Form } from "../../components/Auth/Form";
import { resetPassValidation} from "../../utils";

const ChangePassword: FunctionComponent = () => {
  const { lists } = useFormList();

  const handleOnSubmit = async (values: any) => {};

  return (
    <Form 
      lists={lists}
      onSubmit={handleOnSubmit}
      schema={resetPassValidation}
    />
  );
};

export default ChangePassword;
