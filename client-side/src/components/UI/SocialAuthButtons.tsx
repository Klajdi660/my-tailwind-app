import { FunctionComponent } from "react";
import { Icon } from "./Icon";
import { socialAuthList } from "../../constants";
import { Button } from "antd";

interface SocialAuthButtonProps {}

export const SocialAuthButton: FunctionComponent<
  SocialAuthButtonProps
> = () => {
  return (
    // <div className="flex flex-col gap-3 mt-4 social_medium_buttons">
    <div className="flex justify-center gap-5 mt-7 social_medium_buttons">
      {socialAuthList.map((item) => (
        <Button
          href={item.link}
          key={item.id}
          // className="flex items-center w-14 h-14 gap-2 p-3 text-left border rounded border-divider hover:bg-primary-opacity"
          className="flex items-center justify-center w-16 h-16 border rounded border-divider hover:bg-primary-opacity"
        >
          <Icon name={item.icon} size={30} />
          {/* <span className="text-sm text-onNeutralBg">Continue with {item.name}</span> */}
        </Button>
      ))}
    </div>
  );
};
