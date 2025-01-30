import { FC } from "react";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { useStore } from "../../hooks";
import { useProfileService } from "../../services";
import { themeList, languageList, currencyList } from "../../data";
import { useAppSelector, updateThemeConfig } from "../../store";

export const GeneralSettings: FC = () => {
  const { timeZones } = useStore();
  const { updateProfile } = useProfileService();

  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);

  const { curr, lang, GMT } = user.extra;

  const currencyOptions = Object.keys(currencyList).map((curr) => ({
    label: currencyList[curr].label,
    value: curr,
  }));

  const timezoneOptions = timeZones.map((timezone) => ({
    label: timezone,
    value: timezone,
  }));

  const handleThemeChange = (value: string) => {
    dispatch(updateThemeConfig({ mode: value }));
  };

  const handleGeneralSettingChange = async (values: object) => {
    try {
      await updateProfile(values);
    } catch (error) {
      console.error(`Failed to update general details setting! ${error}`);
    }
  };

  return (
    <div className="w-full text-onNeutralBg">
      <div className="flex flex-col bg-card p-8 rounded gap-6">
        <h5 className="text-lg font-semibold">Display</h5>
        <div className="flex_justify_between">
          <label className="flex flex-col font-semibold text-md">
            Theme
            <span className="text-secondary">
              Choose how your GrooveIT experience looks for this device.
            </span>
          </label>
          <Select
            className="w-1/2 h-12 text-sm"
            placeholder="Select theme"
            options={themeList}
            defaultValue={theme.mode}
            onChange={handleThemeChange}
          />
        </div>
        <h5 className="text-lg font-semibold">General preferences</h5>
        <div className="flex_justify_between">
          <label className="flex flex-col font-semibold text-md">
            Language
            <span className="text-secondary">
              Select the language you use on GrooveIT
            </span>
          </label>
          <Select
            className="w-1/2 h-12 text-sm"
            placeholder="Select language"
            options={languageList}
            defaultValue={lang}
            onChange={(value) => handleGeneralSettingChange({ lang: value })}
          />
        </div>
        <div className="flex_justify_between">
          <label className="flex flex-col font-semibold text-md">
            Timezone
            <span className="text-secondary">
              Select the timezone you use on GrooveIT
            </span>
          </label>
          <Select
            showSearch
            className="w-1/2 h-12 text-sm"
            placeholder="Select timezone"
            options={timezoneOptions}
            defaultValue={GMT}
            onChange={(value) => handleGeneralSettingChange({ GMT: value })}
          />
        </div>
        <div className="flex_justify_between">
          <label className="flex flex-col font-semibold text-md">
            Currency
            <span className="text-secondary">
              Select the currency you use on GrooveIT
            </span>
          </label>
          <Select
            className="w-1/2 h-12 text-sm"
            placeholder="Select currency"
            options={currencyOptions}
            defaultValue={curr}
            onChange={(value) => handleGeneralSettingChange({ curr: value })}
          />
        </div>
      </div>
    </div>
  );
};
