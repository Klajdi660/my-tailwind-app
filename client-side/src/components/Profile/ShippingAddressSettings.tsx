import { Select } from "antd";
import { FC, useState } from "react";
import { Country } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { Button, Icon } from "../UI";
import { classNames } from "../../utils";

export const ShippingAddressSettings: FC = () => {
  const [openShippingSection, setOpenShippingSection] =
    useState<boolean>(false);
  const [phonePrefix, setPhonePrefix] = useState<string>("");

  const allCountries = Country.getAllCountries().map((country) => ({
    label: `${country.flag} ${country.name}`,
    value: country.isoCode,
    dialCode: country.phonecode,
  }));

  const handleCountryChange = (selectedCountryCode: string) => {
    const selectedCountry = allCountries.find(
      (country) => country.value === selectedCountryCode
    );
    if (selectedCountry) {
      setPhonePrefix(`+${selectedCountry.dialCode}`);
    }
  };

  const {
    register: form,
    // handleSubmit,
    control,
    // setValue,
    // formState: { isValid },
  } = useForm({
    mode: "onTouched",
  });

  return (
    <div className="w-full flex flex-col gap-6 bg-card p-8 rounded">
      <h5 className="text-lg font-semibold">Shipping Address Details</h5>
      <p className="text-secondary">
        By saving your shipping address details, this shipping address will be
        set as the default for all purchases made using your Epic Games Account
        on PC and mobile, including purchases on the GrooveIT Games Store.
      </p>

      <div
        className={classNames(
          "bg-primary-opacity p-4 rounded cursor-pointer",
          openShippingSection && "flex flex-col gap-4 border border-primary"
        )}
        onClick={() => setOpenShippingSection(true)}
      >
        <div className="flex_justify_start gap-4">
          <button
            type="button"
            className={classNames(
              "flex_justify_center w-5 h-5 rounded-full",
              openShippingSection
                ? "bg-primary border border-primary"
                : "border border-onNeutralBg"
            )}
          >
            {openShippingSection && (
              <Icon name="FaCheck" className="text-white" size={15} />
            )}
          </button>
          <Icon name="LuShip" size={30} />
          <p>Add new shipping address</p>
        </div>
        {openShippingSection && (
          <form className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-semibold">
                Country/region
              </label>
              <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                <div className="w-full">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="w-full h-12 text-sm border border-onNeutralBg rounded"
                        placeholder="Select country"
                        optionLabelProp="label"
                        options={allCountries}
                        onChange={(value) => {
                          field.onChange(value);
                          handleCountryChange(value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="w-full"></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-semibold">
                Contact information
              </label>
              <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                <div className="w-full">
                  <input
                    {...form("name")}
                    name="name"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="Contact name"
                    autoComplete="name"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center w-full h-12 text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 hover:border-primary">
                    <input
                      className="w-14 bg-transparent focus-within:none outline-0 border-r border-onNeutralBg"
                      type="text"
                      readOnly
                      placeholder="Prefix"
                      value={phonePrefix}
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
            </div>
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-semibold">Address</label>
              <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                <div className="w-full">
                  <input
                    {...form("street")}
                    name="street"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="Street address"
                    autoComplete="street"
                  />
                </div>
                <div className="w-full">
                  <input
                    {...form("buildNr")}
                    name="buildNr"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="Apt, suite, unit, etc (optional)"
                    autoComplete="buildNr"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                <div className="w-full">
                  <input
                    {...form("state")}
                    name="state"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="State/Province"
                    autoComplete="buildNr"
                  />
                </div>
                <div className="w-full">
                  <input
                    {...form("city")}
                    name="city"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="City"
                    autoComplete="city"
                  />
                </div>
                <div className="w-full">
                  <input
                    {...form("zip")}
                    name="zip"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                    type="text"
                    placeholder="ZIP code"
                    autoComplete="zip"
                  />
                </div>
              </div>
            </div>
            <div className="flex_justify_end">
              <Button
                type="button"
                label="Add Shipping Address"
                variant="contained"
                className="h-10"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
