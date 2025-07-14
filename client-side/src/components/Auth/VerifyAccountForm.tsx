import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  ErrorFormMessage,
  FormRedirect,
  Image,
  Title,
} from "../../components";
import { iconName } from "../../assets";
import { VerifyAccountValues } from "../../types";
import { paths, verifyAccountFormData } from "../../data";
import { classNames, verifyAccountValidation } from "../../utils";

interface VerifyAccountFormProps {
  onSubmit: (values: VerifyAccountValues) => Promise<void>;
  resendCodeHandler: () => Promise<void>;
}

export const VerifyAccountForm: FC<VerifyAccountFormProps> = (props) => {
  const { onSubmit, resendCodeHandler } = props;

  const { HOME } = paths;
  const { metadata, inputMetadata } = verifyAccountFormData;
  const {
    formName,
    formTitle,
    description,
    buttonName,
    footerTitle,
    footerLink,
    linkTo,
  } = metadata;

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(verifyAccountValidation),
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
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex justify-center text-sm text-onNeutralBg">
          Didn't recieve code? &nbsp;
          <div className="cursor-pointer" onClick={resendCodeHandler}>
            <p className="text-primary hover:underline underline-offset-2">
              Resend
            </p>
          </div>
        </div>
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
