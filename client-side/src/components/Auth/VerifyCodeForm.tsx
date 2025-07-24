import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  ErrorFormMessage,
  ErrorResponse,
  FormRedirect,
  Image,
  Title,
} from "../../components";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { VerifyAccountValues, VerifyCodeFormProps } from "../../types";
import { classNames, verifyCodeValidation } from "../../utils";
import { useAuth } from "../../hooks";

export const VerifyCodeForm: FC<VerifyCodeFormProps> = (props) => {
  const { onSubmit, resendCodeHandler, data } = props;

  const { HOME } = paths;
  const { metadata, inputMetadata } = data;
  const {
    formName,
    formTitle,
    description,
    buttonName,
    footerTitle,
    footerLink,
    linkTo,
    otherLink,
  } = metadata;

  const { errorResponse } = useAuth();

  const handleFormSubmit = (values: VerifyAccountValues) => {
    onSubmit(values, reset);
  };

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(verifyCodeValidation),
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
        {errorResponse.error && <ErrorResponse />}
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleFormSubmit)}
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
                <input
                  className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                  placeholder={item.placeholder}
                  type={item.type}
                  {...form(item.name)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      ""
                    );
                  }}
                  autoComplete="one-time-code"
                />
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
          resendCodeHandler={resendCodeHandler}
          otherLink={otherLink}
        />
      </div>
    </div>
  );
};
