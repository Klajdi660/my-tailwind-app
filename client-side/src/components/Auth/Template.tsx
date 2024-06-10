import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { iconName } from "../../assets";
import { Form } from "./Form";
import { OTPCodeForm } from "./OTPCodeForm";
import { SocialAuthButton, Title, Image } from "../UI";
import { TemplateProps } from "../../types";

export const Template: FunctionComponent<TemplateProps> = (props) => {
  const { lists, schema, onSubmit, defaultValues, handleResendCode, data } =
    props;

  const [
    {
      formName,
      formTitle,
      footerTitle,
      footerLink,
      linkTo,
      description,
      btnTxt,
    },
  ] = lists;

  return (
    <section className={`${formName}_section`}>
      <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
        <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
          <div className="flex flex-col items-center mb-6 lg:mb-6">
            <Link to="/" className="flex flex-row items-center gap-1 m-0 logo">
              <Image imgUrl={iconName} name="template_logo" width={100} />
            </Link>
          </div>
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
                <span className="text-sm text-onNeutralBg">or</span>
                <div className="h-[1px] bg-divider flex-1" />
              </div>
            </>
          )}
          {["verify-email", "password-code"]?.includes(formName) ? (
            <OTPCodeForm
              btnText={btnTxt}
              footerTitle={footerTitle}
              footerLink={footerLink}
              linkTo={linkTo}
              onSubmit={onSubmit}
              handleResendCode={handleResendCode}
              data={data}
            />
          ) : (
            <>
              <Form
                lists={lists}
                schema={schema}
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                data={data}
              />
              <div className="flex justify-center mt-4 text-sm text-onNeutralBg">
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
    </section>
  );
};
