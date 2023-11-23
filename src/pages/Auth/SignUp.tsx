import { FunctionComponent} from "react";
import { Template } from "../../components";
import { signupImg } from "../../assets/img";

const SignUp: FunctionComponent = () => {
  return (
    <Template 
      title="Join the millions learning to code with StudyNotion"
      firstDescp="Build skills for today, tomorrow and beyond."
      secondDescp="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  );
};

export default SignUp;
