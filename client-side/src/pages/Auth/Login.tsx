import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Template } from "../../components";
import { useForm } from "../../hooks";
import { useAuthService } from "../../services";
import { LoginUserInput, LoginPageProps } from "../../types";
import { loginValidation, isRTokenExpired, useSubmitting } from "../../utils";

export const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { listForm } = useForm();
  const { login } = useAuthService();
  const { setIsSubmitting } = useSubmitting();

  const navigate = useNavigate();

  const rememberMe = useSelector((state: any) => state.rememberMe);

  useEffect(() => {
    if (localStorage.user) {
      // localStorage.lastLocation
      //   ? navigate(`/${localStorage.lastLocation}`)
      //   : navigate("/discover");
      navigate("/discover");
    }
  }, []);

  // const handleOnSubmit = async (values: LoginUserInput) => {
  //   try {
  //     await login(values);
  //   } catch (error) {
  //     console.error(`Failed to login! ${error}`);
  //   }
  // };

  const handleOnSubmit = async (values: LoginUserInput) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second timeout
      await login(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    } finally {
      setIsSubmitting(false);
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
