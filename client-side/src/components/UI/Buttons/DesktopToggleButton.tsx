import { FC } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";
import { updateThemeConfig, useAppSelector } from "../../../store";

export const DesktopToggleButton: FC = () => {
  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.theme);

  const changeTheme = (value: any) => {
    dispatch(updateThemeConfig({ ...theme, ...value }));
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        className="flex_justify_center w-10 h-10 rounded-full hover:bg-primary-opacity group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:text-primary" />
      </button>
    </div>
  );
};
