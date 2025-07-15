import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormDataType,
  VerifyCodeInputMetadata,
  VerifyCodeValues,
} from "../../types";
import {
  Button,
  ErrorFormMessage,
  FormRedirect,
  Image,
  Title,
} from "../../components";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { classNames, verifyCodeValidation } from "../../utils";

interface VerifyCodeFormProps {
  onSubmit: (values: VerifyCodeValues) => Promise<void>;
  resendCodeHandler: () => Promise<void>;
  data: FormDataType<VerifyCodeInputMetadata>;
}

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
  } = metadata;

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
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
