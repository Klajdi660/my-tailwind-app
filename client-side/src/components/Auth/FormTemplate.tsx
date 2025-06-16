import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Title,
  Image,
  Form,
  OTPCodeForm,
  SocialAuthButton,
} from "../../components";
import { paths } from "../../data";
import { useForm } from "../../hooks";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { FormTemplateProps, FormListItem } from "../../types";

export const FormTemplate: FC<FormTemplateProps> = (props) => {
  const { schema, onSubmit, defaultValues, resendCodeHandler, data } = props;

  const { HOME, FORGOT_PASSWORD } = paths;

  const { listForm } = useForm();

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
      <div className="flex flex-col p-8 gap-6 bg-card rounded w-[400px] max-w-[100vw] lg:max-w-[calc(100vw-80px)]">
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
            <div className="flex_justify_center gap-4 divider">
              <div className="h-[1px] bg-divider flex-1" />
              <span className="text-sm text-onNeutralBg">
                or use your email account
              </span>
              <div className="h-[1px] bg-divider flex-1" />
            </div>
          </>
        )}
        {["verify-email", "password-code"]?.includes(formName) ? (
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
            <div className="flex flex-col gap-4">
              {formName === "login" && (
                <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
                  Forgot Password!
                  <Link to={FORGOT_PASSWORD}>
                    <p className="text-primary hover:underline underline-offset-2">
                      Reset
                    </p>
                  </Link>
                </div>
              )}
              <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
                {footerTitle}
                <Link to={linkTo}>
                  <p className="text-primary hover:underline underline-offset-2">
                    {footerLink}
                  </p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
