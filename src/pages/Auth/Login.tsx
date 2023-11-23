import { FunctionComponent } from "react";
import { Template } from "../../components";
import { loginImg, img } from "../../assets/img";

const Login: FunctionComponent = () => {
  return (
    <Template
      title="Welcome Back"
      firstDescp="Build skills for today, tomorrow, and beyond."
      secondDescp="Education to future-proof your career."
      image={img}
      formType="login"
    />
  );
};

export default Login;
