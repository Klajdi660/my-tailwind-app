import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { authFormData } from "../../data";
import { TemplateProps } from "../../types/general.type";
import { Icons, SocialAuthButton, Title } from "../UI";
import { logo } from "../../constants";
import { icon } from "../../assets/img";

export const Template: FunctionComponent<TemplateProps> = (props) => {
    const { title, description, formType } = props;

    return (
        <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
            <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
                <div className="flex flex-col items-center mb-6 lg:mb-6">
                    <Link
                        to="/"
                        className="flex flex-row items-center gap-1 m-0 logo"                
                    >
                        {/* <Icons
                            name={logo.icon}
                            className="!text-primary"
                            size={20}
                        />
                        <h1 className="text-[20px] text-primary font-bold">
                            {logo.name}
                        </h1> */}
                        <img
                            src={icon} 
                            alt={'fund_logo'} 
                            width={100}
                        />
                    </Link>
                </div>
                <Title 
                    name={title || ""}
                    desc={description}
                    type="medium"
                />
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
                {authFormData[formType] || null}
            </div>
        </div>
    );
};
