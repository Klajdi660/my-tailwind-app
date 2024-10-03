import { FC } from "react";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { useAppSelector, updateThemeConfig, setCurrency } from "../../../store";
import {
  themeList,
  languageList,
  currencyList,
  currencySymbolList,
} from "../../../data";

export const GeneralSettings: FC = () => {
  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.theme);

  const currencyOptions = Object.keys(currencyList).map((curr) => ({
    label: currencyList[curr].label,
    value: curr,
  }));

  const handleThemeChange = (value: string) => {
    dispatch(updateThemeConfig({ mode: value }));
  };

  const handleCurrencyChange = (value: string) => {
    dispatch(setCurrency(currencySymbolList[value]));
  };
  console.log("currencyOptions :>> ", currencyOptions);
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
            // onChange={handleLangChange}
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
            defaultValue={currencyOptions[0].label}
            onChange={handleCurrencyChange}
          />
        </div>
      </div>
    </div>
  );
};
