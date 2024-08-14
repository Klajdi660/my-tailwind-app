import { Select } from "antd";
import { FC } from "react";
import { Country } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../UI";
import { useAppModal } from "../../utils";
import { recommendedCountries } from "../../data";

interface ShippingAddrSettingProps {}

export const ShippingAddrSetting: FC<ShippingAddrSettingProps> = (props) => {
  const { setModalOpen } = useAppModal();

  const allCountries = Country.getAllCountries();

  const recommendedCountriesList = allCountries.filter((country) =>
    recommendedCountries.includes(country.name)
  );

  const otherCountries = allCountries.filter(
    (country) => !recommendedCountries.includes(country.name)
  );

  const combinedCountries = [
    {
      label: (
        <span className="text-onNeutralBg font-semibold">Recommended</span>
      ),
      options: recommendedCountriesList.map((country) => ({
        label: `${country.flag} ${country.name}`,
        value: country.isoCode,
      })),
    },
    {
      label: (
        <span className="text-onNeutralBg font-semibold">All Countries</span>
      ),
      options: otherCountries.map((country) => ({
        label: `${country.flag} ${country.name}`,
        value: country.isoCode,
      })),
    },
  ];

  const phonePrefixData = Country.getAllCountries().map((item) => {
    const { phonecode, flag, name, isoCode } = item;

    const prefix = phonecode.startsWith("+") ? phonecode : `+${phonecode}`;

    return {
      key: `${prefix}-${isoCode}`,
      value: prefix,
      selected: `${item.flag} ${prefix}`,
      label: `${flag} ${name} ${prefix}`,
    };
  });

  const handleModalClose = () => {
    setModalOpen("settingsModal", false);
  };

  const {
    register: form,
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
  });

  return (
    <form className="w-full flex flex-col gap-4">
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Country
        </label>
        <Controller
          name="shipinTo"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              //   variant="borderless"
              className="h-10 w-52 text-sm"
              placeholder="Select Country"
              //   dropdownStyle={{ width: 200 }}
              options={combinedCountries}
            />
          )}
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          Name
        </label>
        <input
          {...form("name")}
          name="name"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="Contact name"
          autoComplete="name"
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          Contact number
        </label>
        <div className="flex flex_justify_between">
          <Select
            options={phonePrefixData.map(({ key, ...rest }) => ({
              key,
              ...rest,
            }))}
            //   onChange={onPhonePrefixChange}
            optionLabelProp="selected"
            className="h-10 w-[100px] mr-2"
            placeholder="Prefix"
            dropdownStyle={{ width: 250 }}
          />
          <input
            name="contactNumber"
            //   onChange={(e) => setContactNumber(e.target.value)}
            className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
            type="text"
            placeholder="Phone Number"
            autoComplete="contactNumber"
          />
        </div>
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          Street
        </label>
        <input
          {...form("street")}
          name="street"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="Street address"
          autoComplete="street"
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          State
        </label>
        <input
          {...form("state")}
          name="state"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="State/Province"
          autoComplete="state"
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          City
        </label>
        <input
          {...form("city")}
          name="city"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="City"
          autoComplete="city"
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          Build number
        </label>
        <input
          {...form("buildNr")}
          name="buildNr"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="Apt, suite, unit, etc (optional)"
          autoComplete="buildNr"
        />
      </div>
      <div className="w-full flex_justify_between">
        <label className="block text-secondary text-sm font-semibold">
          ZIP code
        </label>
        <input
          {...form("zip")}
          name="zip"
          className="h-10 w-52 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
          type="text"
          placeholder="ZIP code"
          autoComplete="zip"
        />
      </div>
      <div className="flex items-center justify-end w-full mt-4">
        <Button
          type="button"
          label="Cancel"
          variant="outlined"
          className="mr-4"
          onClick={handleModalClose}
        />
        <Button type="submit" label="Save" variant="contained" />
      </div>
    </form>
  );
};
