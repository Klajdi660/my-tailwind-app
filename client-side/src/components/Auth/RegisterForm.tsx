import { Select } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { iconName } from "../../assets";
import { RegisterUserValues } from "../../types";
import { paths, registerFormData, userRegex } from "../../data";
import { classNames, phonePrefixData, registerValidation } from "../../utils";

interface RegisterFormProps {
  onSubmit: (values: RegisterUserValues) => Promise<void>;
}

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onSubmit } = props;

  const { HOME } = paths;
  const { isPhoneNumberRegex } = userRegex;
  const { metadata, inputMetadata } = registerFormData;
  const {
    formName,
    formTitle,
    description,
    footerTitle,
    footerLink,
    buttonName,
    linkTo,
  } = metadata;

  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identifierValue, setIdentifierValue] = useState<string>("");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(registerValidation),
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
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((values) =>
            onSubmit({ ...values, phonePrefix })
          )}
        >
          {inputMetadata.map((item) => (
            <fieldset key={item.name}>
              <div
                className={classNames(
                  "flex items-center relative rounded",
                  errors[item.name]
                    ? "border border-red-500 hover:border-red-500"
                    : "border border-divider focus-within:border-primary hover:border-primary"
                )}
              >
                {item.name === "identifier" &&
                  isPhoneNumberRegex.test(identifierValue) && (
                    <Select
                      options={phonePrefixData.map(({ key, ...rest }) => ({
                        key,
                        ...rest,
                      }))}
                      optionLabelProp="selected"
                      className="contactNr-select bg-primary-opacity ml-2"
                      placeholder="Prefix"
                      dropdownStyle={{ width: 250 }}
                      onChange={(value) => setPhonePrefix(value)}
                    />
                  )}
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
                  autoComplete="on"
                  onChange={(e) => {
                    form(item.name).onChange(e);
                    if (item.name === "identifier") {
                      setIdentifierValue(e.target.value);
                    }
                  }}
                />
                <span
                  className={classNames(
                    "absolute right-2 top-[50%] translate-y-[-50%]",
                    "opacity-0 pointer-events-none transition-opacity duration-200",
                    "focus-within:opacity-100 focus-within:pointer-events-auto"
                  )}
                >
                  {item.name === "password" && (
                    <IconButton
                      name={showPassword ? item.iconHidden : item.iconVisible}
                      iconClassName="text-secondary hover:text-onNeutralBg hover:scale-[1.1]"
                      onClick={toggleShowPassword}
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
          linkTo={linkTo}
        />
      </div>
    </div>
  );
};
