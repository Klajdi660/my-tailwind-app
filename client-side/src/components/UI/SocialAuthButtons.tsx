import { FunctionComponent } from "react";
import { Icons } from "./Icon";
import { socialAuthList } from "../../constants";

interface SocialAuthButtonProps {};

export const SocialAuthButton: FunctionComponent<SocialAuthButtonProps> = () => {
    return (
        <div className="flex flex-col gap-3 mt-4 social_medium_buttons">
            {socialAuthList.map((item) => (
                <button
                    key={item.id}
                    className="flex items-center w-full gap-2 p-3 text-left border rounded border-divider hover:bg-primary-opacity"
                >
                    <Icons name={item.icon}/>
                    <span className="text-sm text-onNeutralBg">Continue with {item.name}</span>
                </button>
            ))}
        </div>
    );
};