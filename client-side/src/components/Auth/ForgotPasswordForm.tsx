import { Select } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  classNames,
  forgotPasswordValidation,
  phonePrefixData,
} from "../../utils";
import {
  FormRedirect,
  Image,
  ErrorFormMessage,
  Button,
  Title,
  ForgotPasswordButton,
} from "../../components";
import { iconName } from "../../assets";
import { ForgotPasswordValues } from "../../types";
import { forgotPasswordFormData, paths } from "../../data";

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordValues) => Promise<void>;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { onSubmit } = props;

  const { HOME } = paths;
  const {
    formName,
    formTitle,
    description,
    footerTitle,
    footerLink,
    linkTo,
    emailText,
    smsText,
    emailPlaceholder,
    smsPlaceholder,
    emailButtonName,
    smsButtonName,
  } = forgotPasswordFormData;

  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("email");

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(forgotPasswordValidation),
    context: { selectedMethod },
  });

  return (
    <div
      className={classNames(
        `${formName}_section`,
        "flex_justify_center h-screen"
      )}
    >
      <div className="flex flex-col p-8 gap-6 bg-card rounded w-[450px] max-w-[100vw] lg:max-w-[calc(100vw-80px)]">
        <Link to={HOME} className="flex_justify_center">
          <Image imgUrl={iconName} name="form_logo" width={140} />
        </Link>
        <Title name={formTitle} desc={description} type="medium" />
        <p className="text-md">How would you like to reset your password?</p>
        <ForgotPasswordButton
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
        <p className="text-md">
          {selectedMethod === "email" ? emailText : smsText}
        </p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((values) =>
            onSubmit({ ...values, phonePrefix })
          )}
        >
          {selectedMethod === "email" ? (
            <fieldset>
              <div
                className={classNames(
                  "flex items-center relative rounded",
                  errors.email
                    ? "border border-red-500 hover:border-red-500"
                    : "border border-divider focus-within:border-primary hover:border-primary"
                )}
              >
                <input
                  className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                  placeholder={emailPlaceholder}
                  type="text"
                  {...form("email")}
                  autoComplete="on"
                />
              </div>
              <ErrorFormMessage errorMessage={errors?.email?.message} />
            </fieldset>
          ) : (
            <fieldset>
              <div
                className={classNames(
                  "flex items-center relative rounded px-2",
                  errors.phoneNumber
                    ? "border border-red-500 hover:border-red-500"
                    : "border border-divider focus-within:border-primary hover:border-primary"
                )}
              >
                <Select
                  options={phonePrefixData.map(({ key, ...rest }) => ({
                    key,
                    ...rest,
                  }))}
                  optionLabelProp="selected"
                  className="contactNr-select bg-primary-opacity"
                  placeholder="Prefix"
                  dropdownStyle={{ width: 250 }}
                  onChange={(value) => setPhonePrefix(value)}
                />
                <input
                  className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                  placeholder={smsPlaceholder}
                  type="text"
                  {...form("phoneNumber")}
                  autoComplete="on"
                />
              </div>
              <ErrorFormMessage errorMessage={errors?.phoneNumber?.message} />
            </fieldset>
          )}
          <Button
            className={classNames("mt-4", isValid && "hover:brightness-110")}
            type="submit"
            label={selectedMethod === "email" ? emailButtonName : smsButtonName}
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
