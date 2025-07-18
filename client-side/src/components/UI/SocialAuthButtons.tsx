import { FC } from "react";
import { Link } from "react-router-dom";
import { socialAuthList } from "../../data";
import { FormDivider, Icon } from "../../components";

export const SocialAuthButton: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-3 social_medium_buttons">
        {socialAuthList.map((item) => (
          <Link key={item.id} to={item.link} className="link group">
            <button className="flex_justify_center items-center w-full p-3 gap-2 text-left border rounded border-divider hover:bg-primary-opacity">
              <Icon name={item.icon} size={25} />
              <span className="text-sm text-onNeutralBg group-hover:text-primary">
                Log in with {item.name}
              </span>
            </button>
          </Link>
        ))}
      </div>
      <FormDivider />
    </>
  );
};
