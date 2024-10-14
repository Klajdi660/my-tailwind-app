import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import { FormTemplate } from "../../components";
import { useAppSelector } from "../../store";
import { useAuthService } from "../../services";
import { LoginUserValues, LoginPageProps } from "../../types";
import { loginValidation, isRTokenExpired, useSubmitting } from "../../utils";

export const LoginPage: FC<LoginPageProps> = () => {
  const { login } = useAuthService();
  const { setIsSubmitting } = useSubmitting();

  // const navigate = useNavigate();

  const rememberMe = useAppSelector((state) => state.rememberMe);

  // useEffect(() => {
  //   if (localStorage.user) {
  //     navigate("/discover");
  //   }
  // }, []);

  const onSubmitLoginHandler = async (values: LoginUserValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      // delete localStorage.rtoken;
      return {};
    }
  })();

  return (
    <FormTemplate
      schema={loginValidation}
      onSubmit={onSubmitLoginHandler}
      defaultValues={defaultValues}
    />
  );
};
