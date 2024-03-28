import { FunctionComponent } from "react";
import { Template } from "../../components";
// import { useFormList } from "../../hooks";
import { formList } from "../../constants";
const PasswordConfirmCode: FunctionComponent = () => {
  // const { lists } = useFormList();
  const handleOnSubmit = async (values: any) => {};

  return (
    <Template
      lists={formList?.["password-code"]}
      schema={""}
      onSubmit={handleOnSubmit}
    />
  );
};

export default PasswordConfirmCode;
