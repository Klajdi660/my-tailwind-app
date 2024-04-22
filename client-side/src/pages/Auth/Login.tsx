import { FunctionComponent, useEffect, /*useRef*/ } from "react";
import { useNavigate, /*useLocation*/ } from "react-router-dom";
import { Template } from "../../components";
import { /*useFormList,*/ useAuth } from "../../hooks";
import useAuthService from "../../services/AuthService";
import { LoginUserInput } from "../../types/user.type";
import { loginValidation } from "../../utils";
// import { InputRef } from "antd";
import { formList } from "../../constants";

const Login: FunctionComponent = () => {
  // const { lists } = useFormList();
  const { login } = useAuthService();

  const { isAuthenticated } = useAuth();
  // const inputRef = useRef<InputRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      localStorage.lastLocation
        ? navigate(`/${localStorage.lastLocation}`)
        : navigate(`/discover`);
    // inputRef.current!.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (localStorage.lastLocation) {
  //       console.log("HYRI 111");
  //       console.log(
  //         "localStoreage.lastLocation :>> ",
  //         localStorage.lastLocation
  //       );
  //       navigate(`/${localStorage.lastLocation}`);
  //     } else {
  //       console.log("HYRI 222");
  //       navigate("/discover");
  //     }
  //   }

  //   // inputRef.current?.focus();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleOnSubmit = async (values: LoginUserInput) => {
    const { username, password, remember } = values;
    try {
      await login(username, password, remember);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  const defaultValues = {
    username: "klajdi96",
    password: "Klajdi96@",
  };

  return (
    <Template
      // lists={lists}
      lists={formList["login"]}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default Login;
