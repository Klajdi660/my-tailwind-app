import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { authFormData } from "../../constants";
import { TemplateProps } from "../../types/general.type";
import { SocialAuthButton, Title, Image } from "../UI";
import { iconName } from "../../assets/img";

export const Template: FunctionComponent<TemplateProps> = (props) => {
  const { title, description, formType, btnText } = props;

  const getAuthForm = () => {
    const formComponent = authFormData[formType];

    if (typeof formComponent === "function") {
      return formComponent(btnText);
    }

    return formComponent || null;
  };

  const authForm = getAuthForm();

  return (
    <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
      <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
        <div className="flex flex-col items-center mb-6 lg:mb-6">
          <Link to="/" className="flex flex-row items-center gap-1 m-0 logo">
            <Image imgUrl={iconName} name="Template Logo" width={100} />
          </Link>
        </div>
        <Title name={title || ""} desc={description} type="medium" />
        {["login", "register"]?.includes(formType) && (
          <>
            <SocialAuthButton />
            <div className="flex items-center justify-center gap-4 my-6 divider">
              <div className="h-[1px] bg-divider flex-1" />
              <span className="text-sm text-onNeutralBg">or</span>
              <div className="h-[1px] bg-divider flex-1" />
            </div>
          </>
        )}
        {authForm}
      </div>
    </div>
  );
};
