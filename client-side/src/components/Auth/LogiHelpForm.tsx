import { Select } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  classNames,
  emailOrPhoneValidation,
  phonePrefixData,
} from "../../utils";
import {
  Button,
  EmailOrPhoneButton,
  ErrorFormMessage,
  FormRedirect,
  Image,
  ServiceResponse,
  Title,
} from "../../components";
import { paths } from "../../data";
import { useStore } from "../../hooks";
import { iconName } from "../../assets";
import { LoginHelpFormProps, LoginHelpValues } from "../../types";

export const LoginHelpForm: FC<LoginHelpFormProps> = (props) => {
  const { metadata, onSubmit } = props;
  const {
    formName,
    formTitle,
    formDescription,
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
  } = metadata;
  const { HOME } = paths;

  const { serviceResponse } = useStore();

  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("email");

  const handleFormSubmit = (values: LoginHelpValues) => {
    onSubmit({ ...values, phonePrefix }, reset);
  };

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(emailOrPhoneValidation),
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
        {serviceResponse.serviceError && <ServiceResponse />}
        <p className="text-md">{formDescription}</p>
        <EmailOrPhoneButton
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
        <p className="text-md">
          {selectedMethod === "email" ? emailText : smsText}
        </p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleFormSubmit)}
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </div>
              <ErrorFormMessage errorMessage={errors?.phoneNumber?.message} />
            </fieldset>
          )}
          <Button
            className={classNames("mt-4", isValid && "hover:brightness-110")}
            type="submit"
            isSubmitting={true}
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
