import { FC } from "react";
import { Icon } from "../Icon";
import { updateThemeConfig } from "../../../store";
import { DesktopToggleButtonProps } from "../../../types";

export const DesktopToggleButton: FC<DesktopToggleButtonProps> = (props) => {
  const { theme, dispatch } = props;

  const changeTheme = (value: any) => {
    dispatch(updateThemeConfig({ ...theme, ...value }));
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        // className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        className="flex_justify_center w-10 h-10 rounded-full hover:bg-primary-opacity group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:text-primary" />
      </button>
    </div>
  );
};
