import { Template } from "../../components";
import loginImg from "../../assets/img/money.svg";

const Login = () => {
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
