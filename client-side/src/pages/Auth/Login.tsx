import { FunctionComponent /*useEffect, useRef*/ } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { Template } from "../../components";
import { useFormList /*useAuth*/ } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation } from "../../utils";
// import { InputRef } from "antd";
import { useDispatch } from "react-redux";
import { setRememberData } from "../../store/redux/slices/auth.slice";
const Login: FunctionComponent<LoginPageProps> = () => {
  const { lists } = useFormList();
  const { login } = useAuthService();
  const dispatch = useDispatch();
  // const { isAuthenticated } = useAuth();
  // const inputRef = useRef<InputRef>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated)
  //     localStorage.lastLocation
  //       ? navigate(`/${localStorage.lastLocation}`)
  //       : navigate(`/discover`);
  //   // inputRef.current!.focus();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleOnSubmit = async (values: LoginUserInput) => {
    try {
      await login(values);
      if (values.remember) {
        dispatch(setRememberData(values));
      }
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  const defaultValues = {
    identifier: "klajdi96",
    password: "Pass123.",
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
