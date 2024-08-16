import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "./Form";
import { OTPCodeForm } from "./OTPCodeForm";
import { SocialAuthButton, Title, Image } from "../UI";
import { iconName } from "../../assets";
import { useForm } from "../../hooks";
import { classNames } from "../../utils";
import { FormTemplateProps } from "../../types";

export const FormTemplate: FC<FormTemplateProps> = (props) => {
  const { schema, onSubmit, defaultValues, resendCodeHandler, data } = props;

  const { listForm } = useForm();

  const [
    { linkTo, formName, formTitle, footerLink, description, footerTitle },
  ] = listForm as any;

  return (
    <div
      className={classNames(
        // `${formName}_section`,
        "flex-col h-full py-6 m-auto bg-main flex_justify_center absolute_center"
      )}
    >
      <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
        <Link to="/" className="flex_justify_center mb-6">
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
            <div className="flex items-center justify-center gap-4 my-6 divider">
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
            <div className="flex justify-center mt-6 text-sm text-onNeutralBg">
              {footerTitle}
              <Link to={linkTo}>
                <p className="ml-1 text-primary hover:underline underline-offset-2">
                  {footerLink}
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
