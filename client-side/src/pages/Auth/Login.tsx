import { FunctionComponent } from "react";
import { Template } from "../../components";
import { useFormList } from "../../hooks";
import useAuthService from "../../services/AuthService";
import { LoginUserInput } from "../../types/user.type";
import { loginValidation } from "../../lib";

const Login: FunctionComponent = () => {
  const { lists } = useFormList();
  const { login } = useAuthService();

  const handleOnSubmit = async (values: LoginUserInput) => {
    const { username, password, remember } = values;
    console.log("values :>> ", values);
    try {
      await login(username, password, remember);
    } catch (error) {
      console.error("Failed to login!", error);
    }
  };

  const defaultValues = {
    // username: "klajdi96",
    // password: "Klajdi96@",
  };

  return (
    <Template
      lists={lists}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default Login;
