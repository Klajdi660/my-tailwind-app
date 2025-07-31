import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormRedirect,
  Image,
  ServiceResponse,
  SocialAuthButton,
  Title,
} from "../../components";
import { useStore } from "../../hooks";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { FormTemplateProps } from "../../types";
import { formData, paths } from "../../data";

export const FormTemplate: FC<FormTemplateProps> = (props) => {
  const { nameForm, onSubmit, resendCodeHandler } = props;

  const { HOME } = paths;
  const { metadata } = formData[nameForm];
  const {
    formName,
    toFormName,
    formTitle,
    description,
    footerTitle,
    footerLink,
    linkTo,
    otherLink,
  } = metadata;

  const { serviceResponse } = useStore();

  const { serviceSubmitting, serviceError } = serviceResponse;

  return (
    <div
      className={classNames(
        `${formName}_section`,
        "h-screen flex_justify_center"
      )}
    >
      <div className="flex flex-col p-12 gap-6 bg-card rounded w-full max-w-[480px]">
        <Link to={HOME} className="flex_justify_center">
          <Image imgUrl={iconName} name="form_logo" width={140} />
        </Link>
        <Title name={formTitle} desc={description} type="medium" />
        {serviceError && (
          <ServiceResponse resendCodeHandler={resendCodeHandler} />
        )}
        {serviceSubmitting && <ServiceResponse />}
        {["login", "register"].includes(formName) && <SocialAuthButton />}
        <Form nameForm={nameForm} onSubmit={onSubmit} />
        <FormRedirect
          formName={formName}
          toFormName={toFormName}
          footerTitle={footerTitle}
          footerLink={footerLink}
          linkTo={linkTo}
          otherLink={otherLink}
          resendCodeHandler={resendCodeHandler}
        />
      </div>
    </div>
  );
};
