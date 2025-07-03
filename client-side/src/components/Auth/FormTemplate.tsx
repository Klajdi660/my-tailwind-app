import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Title,
  Image,
  Form,
  OTPCodeForm,
  FormRedirect,
  SocialAuthButton,
  FormDivider,
} from "../../components";
import { paths } from "../../data";
import { useForms } from "../../hooks";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { FormTemplateProps, FormListItem } from "../../types";

export const FormTemplate: FC<FormTemplateProps> = (props) => {
  const { schema, onSubmit, defaultValues, resendCodeHandler, data } = props;

  const { HOME } = paths;

  const { listForm } = useForms();

  const [
    { linkTo, formName, formTitle, footerLink, description, footerTitle },
  ] = listForm as FormListItem[];

  return (
    <div
      className={classNames(
        `${formName}_section`,
        "h-screen flex_justify_center px-2"
      )}
    >
      <div className="flex flex-col p-8 gap-6 bg-card rounded w-[430px] max-w-[100vw] lg:max-w-[calc(100vw-80px)]">
        <Link to={HOME} className="flex_justify_center">
          <Image imgUrl={iconName} name="template_logo" width={140} />
        </Link>
        {!data?.resetPassEmailSent ? (
          <Title name={formTitle || ""} desc={description} type="medium" />
        ) : (
          <Title
            name="Check Email"
            desc="to reset password to continue to Groove"
            type="medium"
          />
        )}

        {["login", "register"]?.includes(formName) && (
          <>
            <SocialAuthButton />
            <FormDivider />
          </>
        )}
        {["verify-account", "password-code"]?.includes(formName) ? (
          <OTPCodeForm
            onSubmit={onSubmit}
            resendCodeHandler={resendCodeHandler}
            data={data}
          />
        ) : (
          <>
            <Form
              listForm={listForm}
              schema={schema}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              data={data}
            />
            <FormRedirect
              formName={formName}
              footerTitle={footerTitle}
              footerLink={footerLink}
              linkTo={linkTo}
            />
          </>
        )}
      </div>
    </div>
  );
};
