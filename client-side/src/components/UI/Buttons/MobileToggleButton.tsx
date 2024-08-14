import { FC } from "react";
import { Icon } from "../Icon";
import { useAppUtil } from "../../../utils";
import { MobileToggleButtonProps } from "../../../types";

export const MobileToggleButton: FC<MobileToggleButtonProps> = () => {
  const { toggleMenu, setToggleMenu } = useAppUtil();

  return (
    <div className="flex items-center h-full lg:hidden">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};
