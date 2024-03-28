import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";

const PasswordConfirmCode: FunctionComponent = () => {
  const { lists } = useFormList();
  const handleOnSubmit = async (values: any) => {};

  return <Template lists={lists} schema={""} onSubmit={handleOnSubmit} />;
};

export default PasswordConfirmCode;
