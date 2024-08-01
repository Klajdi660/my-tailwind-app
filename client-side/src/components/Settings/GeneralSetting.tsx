import { Select } from "antd";
import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateThemeConfig } from "../../store";

interface GeneralSettingProps {}

export const GeneralSetting: FunctionComponent<GeneralSettingProps> = (
  props
) => {
  const dispatch = useDispatch();

  const theme = useSelector((state: any) => state.theme);

  const handleThemeChange = (value: string) => {
    dispatch(updateThemeConfig({ mode: value }));
  };

  // const handleLangChange = (value: string) => {};

  return (
    <form className="w-full flex flex-col gap-4">
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Theme
        </label>
        <Select
          // variant="borderless"
          className="h-10 w-52 text-sm"
          placeholder="Select theme"
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
          defaultValue={theme.mode}
          onChange={handleThemeChange}
        />
      </div>
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Language
        </label>
        <Select
          className="h-10 w-52 text-sm"
          placeholder="Select language"
          options={[
            { value: "Albanian", label: "Albanian" },
            { value: "English", label: "English" },
          ]}
          // onChange={handleLangChange}
        />
      </div>
    </form>
  );
};
