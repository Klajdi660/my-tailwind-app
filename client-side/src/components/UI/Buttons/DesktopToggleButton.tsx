import { FunctionComponent } from "react";
import { updateThemeConfig } from "../../../store/redux/slices/theme.slice";
import { Icon } from "../Icon";

interface DesktopToggleButtonProps {
  theme: any;
  dispatch: any;
}

export const DesktopToggleButton: FunctionComponent<
  DesktopToggleButtonProps
> = (props) => {
  const { theme, dispatch } = props;

  const changeTheme = (value: any) => {
    dispatch(updateThemeConfig({ ...theme, ...value }));
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};
