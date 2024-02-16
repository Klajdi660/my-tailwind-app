import { FunctionComponent } from "react";
// import { Template } from "../../components";
import { useFormList } from "../../hooks";
import useAuthService from "../../services/AuthService";
import { Form } from "../../components/Auth/Form";
import { LoginUserInput } from "../../types/user.type";
import { loginValidation } from "../../utils";

const Login: FunctionComponent = () => {
  const { lists } = useFormList();
  const { login } = useAuthService();

  const handleOnSubmit = async (values: LoginUserInput) => {
    const { username, password, /*remember*/ } = values;
    try {
      await login(username, password);
    } catch (error) {
      console.error("Failed to login!", error)
    }
  };

  return (
    // <Template
    //   title="Welcome Back"
    //   description="Login With"
    //   formType="login"
    // />
    <Form 
      lists={lists}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
    />
  );
};

export default Login;
