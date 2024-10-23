import { FC } from "react";
import { FormTemplate } from "../../components";
import { useAuthService } from "../../services";
import { LoginUserValues, LoginPageProps } from "../../types";
import { loginValidation, useSubmitting } from "../../utils";

export const LoginPage: FC<LoginPageProps> = () => {
  const { login } = useAuthService();
  const { setIsSubmitting } = useSubmitting();

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

  return (
    <FormTemplate schema={loginValidation} onSubmit={onSubmitLoginHandler} />
  );
};
