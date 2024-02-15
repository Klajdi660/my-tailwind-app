import { FunctionComponent} from "react";
// import { Template } from "../../components";
import { Form } from "../../components/Auth/Form";
import { useFormList } from "../../hooks";

const SignUp: FunctionComponent = () => {
  const { lists } = useFormList();

  return (
    // <Template 
    //   title="Join the millions learning to code with StudyNotion"
    //   // description="Build skills for today, tomorrow and beyond."
    //   description="Register With"
    //   formType="signup"
    // />
    <Form 
      lists={lists}
      btnTxt={lists[0].btnTxt}
    />
  );
};

export default SignUp;
