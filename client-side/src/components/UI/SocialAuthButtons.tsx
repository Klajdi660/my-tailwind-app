import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { socialAuthList } from "../../constants";

interface SocialAuthButtonProps {}

export const SocialAuthButton: FunctionComponent<
  SocialAuthButtonProps
> = () => {
  return (
    <div className="flex justify-center gap-5 mt-7 social_medium_buttons">
      {socialAuthList.map((item) => (
        <Link key={item.id} to={item.link} className="link">
          <button className="flex items-center justify-center w-16 h-16 border rounded border-divider hover:bg-primary-opacity">
            <Icon name={item.icon} size={30} />
          </button>
        </Link>
      ))}
    </div>
  );
};
