import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { socialAuthList } from "../../data";
import { SocialAuthButtonProps } from "../../types";

export const SocialAuthButton: FunctionComponent<
  SocialAuthButtonProps
> = () => {
  return (
    <div className="flex flex-col gap-3 mt-4 social_medium_buttons">
      {socialAuthList.map((item) => (
        <Link key={item.id} to={item.link} className="link">
          <button className="flex_justify_center items-center w-full gap-2 p-3 text-left border rounded border-divider hover:bg-primary-opacity">
            <Icon name={item.icon} size={25} />
            <span className="text-sm text-onNeutralBg">
              Log in with {item.name}
            </span>
          </button>
        </Link>
      ))}
    </div>
  );
};
