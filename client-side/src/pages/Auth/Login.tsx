import { FunctionComponent } from "react";
import { Template } from "../../components";

const Login: FunctionComponent = () => {
  return (
    <Template
      title="Welcome Back"
      // description="Education to future-proof your career."
      description="Login With"
      formType="login"
    />
  );
};

export default Login;
