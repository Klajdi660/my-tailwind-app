import { FunctionComponent } from "react";
import { Icon } from "../Icon";

interface MobileToggleButtonProps {}

export const MobileToggleButton: FunctionComponent<
  MobileToggleButtonProps
> = () => {
  return (
    <div className="flex items-center h-full lg:hidden">
      <button className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};
