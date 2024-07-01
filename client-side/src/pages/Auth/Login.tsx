import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Template } from "../../components";
import { useForm, useAuth } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation, isRTokenExpired } from "../../utils";

export const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { isAuthenticated, user } = useAuth();
  const { listForm } = useForm();
  const { login } = useAuthService();
  const navigate = useNavigate();

  const rememberMe = useSelector((state: any) => state.rememberMe);
  console.log("user login :>> ", user);
  useEffect(() => {
    if (localStorage.user) {
      // localStorage.lastLocation
      //   ? navigate(`/${localStorage.lastLocation}`)
      //   : navigate("/discover");
      navigate("/discover");
    }
  }, []);

  const handleOnSubmit = async (values: LoginUserInput) => {
    try {
      await login(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  const defaultValues = (() => {
    if (rememberMe.remember && isRTokenExpired()) {
      return rememberMe;
    } else {
      delete localStorage.rtoken;
      return {};
    }
  })();

  return (
    <Template
      listForm={listForm}
      schema={loginValidation}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default LoginPage;
