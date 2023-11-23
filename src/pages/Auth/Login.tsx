import { FunctionComponent } from "react";
import { Template } from "../../components";
import { loginImg } from "../../assets/img";

const Login: FunctionComponent = () => {
  return (
    <Template
      title="Welcome Back"
      firstDescp="Build skills for today, tomorrow, and beyond."
      secondDescp="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
};

export default Login;
