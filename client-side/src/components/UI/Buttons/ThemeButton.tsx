import { FunctionComponent } from "react";
import { updateThemeConfig } from "../../../store/redux/slices/theme";
import { Icon } from "../Icon";

interface ThemeButtonProps {
  mode: string;
  dispatch: any;
}

export const ThemeButton: FunctionComponent<ThemeButtonProps> = (props) => {
  const { mode, dispatch } = props;

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch(updateThemeConfig({ mode: newMode }));
  };

  return (
    <div className="items-center hidden h-full lg:flex">
      {mode === "light" ? (
        <button
          onClick={toggleMode}
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        >
          <Icon name="MdOutlineWbSunny" className="group-hover:!text-white" />
        </button>
      ) : (
        <button
          onClick={toggleMode}
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        >
          <Icon name="BsMoonStars" className="group-hover:!text-white" />
        </button>
      )}
    </div>
  );
};
