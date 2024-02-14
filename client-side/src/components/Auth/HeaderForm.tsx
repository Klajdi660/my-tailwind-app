import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../UI/Icon";
import { SocialAuthButton } from "../UI/SocialAuthButtons";
import { Title } from "../UI/Title";

interface HeaderFormProps {
    title: string;
    logoName: string;
    logoIcon: any; 
    pathname: string;
};

export const HeaderForm: FunctionComponent<HeaderFormProps> = (props) => {
    const { title, logoName, logoIcon, pathname } = props;

    return (
        <>
            <div className="flex flex-col items-center mb-6 lg:mb-6">
              <Link
                to="/"
                className="flex flex-row items-center gap-1 m-0 logo"                
              >
                <Icons
                  name={logoIcon}
                  className="!text-primary"
                  size={20}
                />
                <h1 className="text-[20px] text-primary font-bold">
                  {logoName}
                </h1>
              </Link>
            </div>
            <Title 
              name={title || ""}
              desc="to continue to Groove"
              type="medium"
            />
            {["register", "login"]?.includes(pathname) && (
              <>
                <SocialAuthButton />
                <div className="flex items-center justify-center gap-4 my-6 divider">
                  <div className="h-[1px] bg-divider flex-1" />
                  <span className="text-sm text-onNeutralBg">or</span>
                  <div className="h-[1px] bg-divider flex-1" />
                </div>
              </>
            )}
        </>
    );
};
