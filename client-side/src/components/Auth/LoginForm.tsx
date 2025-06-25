import { FC, useState } from "react";
import { LoginUserValues } from "../../types";
import { Link } from "react-router-dom";
import { loginFormData, paths } from "../../data";
import { iconName } from "../../assets";
import {
  IconButton,
  FormDivider,
  FormRedirect,
  Image,
  SocialAuthButton,
  ErrorFormMessage,
  Button,
  Title,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { classNames, loginValidation } from "../../utils";

interface LoginFormProps {
  onSubmit: (values: LoginUserValues) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { onSubmit } = props;

  const { HOME, REGISTER } = paths;
  const { metadata, inputMetadata } = loginFormData;
  const {
    formName,
    formTitle,
    description,
    footerTitle,
    footerLink,
    buttonName,
  } = metadata;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginValidation),
  });

  return (
    <div
      className={classNames(
        `${formName}_section`,
        "flex_justify_center h-screen"
      )}
    >
      <div className="flex flex-col p-8 gap-6 bg-card rounded w-[430px] max-w-[100vw] lg:max-w-[calc(100vw-80px)]">
        <Link to={HOME} className="flex_justify_center">
          <Image imgUrl={iconName} name="form_logo" width={140} />
        </Link>
        <Title name={formTitle} desc={description} type="medium" />
        <SocialAuthButton />
        <FormDivider />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          {inputMetadata.map((item) => (
            <fieldset key={item.name}>
              <div
                className={classNames(
                  "relative rounded",
                  errors[item.name]
                    ? "border border-red-500 hover:border-red-500"
                    : "border border-divider focus-within:border-primary hover:border-primary"
                )}
              >
                <input
                  className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                  placeholder={item.placeholder}
                  type={
                    item.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.type
                  }
                  {...form(item.name)}
                />
                <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                  {item.name === "password" ? (
                    <IconButton
                      name={showPassword ? item.iconHidden : item.iconVisible}
                      iconClassName="text-secondary hover:text-onNeutralBg hover:scale-[1.1]"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <IconButton
                      name={item.icon}
                      iconClassName="text-secondary"
                    />
                  )}
                </span>
              </div>
              <ErrorFormMessage errorMessage={errors?.[item.name]?.message} />
            </fieldset>
          ))}
          <Button
            className={classNames("mt-4", isValid && "hover:brightness-110")}
            type="submit"
            label={buttonName}
            variant="contained"
            disabled={!isValid}
          />
        </form>
        <FormRedirect
          formName={formName}
          footerTitle={footerTitle}
          footerLink={footerLink}
          linkTo={REGISTER}
        />
      </div>
    </div>
  );
};
