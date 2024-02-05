import { FunctionComponent } from "react";
import { Template } from "../../components";

const ChooseUsername: FunctionComponent = () => {
  return (
    <Template
      title="Choose Username"
      description="Auto Generate Username"
      formType="chooseUsername"
    />
  );
};

export default ChooseUsername
