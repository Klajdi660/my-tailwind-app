import { Select } from "antd";
import { FC } from "react";
import { Country } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../UI";
import { useAppModal } from "../../../utils";
import { recommendedCountries } from "../../../data";

export const ShippingAddressSettings: FC = () => {
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
    <form className="w-full bg-card p-8 rounded">
      <h5 className="text-lg font-semibold pb-6">Shipping Address Details</h5>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-sm font-semibold mb-2">
              Name
            </label>
            <input
              {...form("name")}
              name="name"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Contact name"
              autoComplete="name"
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Contact number
            </label>
            <div className="flex items-center w-full h-12 text-sm text-onNeutralBg border border-divider rounded px-2 hover:border-primary">
              <Select
                options={phonePrefixData.map(({ key, ...rest }) => ({
                  key,
                  ...rest,
                }))}
                optionLabelProp="selected"
                className="contactNr-select bg-primary-opacity"
                dropdownStyle={{ width: 250 }}
              />
              <input
                name="contactNumber"
                className="w-full h-12 bg-transparent px-2 focus-within:none outline-0"
                type="text"
                placeholder="Phone Number"
                autoComplete="contactNumber"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full h-12 text-sm"
                  placeholder="Select country"
                  optionLabelProp="value"
                  options={combinedCountries}
                />
              )}
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              State
            </label>
            <input
              {...form("state")}
              name="state"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Enter State"
              autoComplete="state"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-sm font-semibold mb-2">
              City
            </label>
            <input
              {...form("city")}
              name="city"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="City"
              autoComplete="city"
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-sm font-semibold mb-2">
              Street
            </label>
            <input
              {...form("street")}
              name="street"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Street address"
              autoComplete="street"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-sm font-semibold mb-2">
              Build number
            </label>
            <input
              {...form("buildNr")}
              name="buildNr"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Apt, suite, unit, etc (optional)"
              autoComplete="buildNr"
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-sm font-semibold mb-2">
              ZIP code
            </label>
            <input
              {...form("zip")}
              name="zip"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="ZIP code"
              autoComplete="zip"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          type="button"
          label="Cancel"
          variant="outlined"
          className="h-10"
          onClick={handleModalClose}
        />
        <Button
          type="button"
          label="Add Shipping Address"
          variant="contained"
          className="h-10"
        />
      </div>
    </form>
  );
};
