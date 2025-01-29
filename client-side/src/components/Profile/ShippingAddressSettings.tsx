import { Select } from "antd";
import { FC, useState } from "react";
import { Country } from "country-state-city";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ErrorFormMessage, Button, Icon } from "../../components";
import { classNames, shippingAddressValidation } from "../../utils";

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
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(shippingAddressValidation),
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
          "p-4 rounded cursor-pointer group",
          !openShippingSection && "hover:bg-primary-opacity",
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
          <Icon
            name="LuShip"
            size={30}
            className={classNames(
              !openShippingSection && "group-hover:text-primary"
            )}
          />
          <p
            className={classNames(
              !openShippingSection && "group-hover:text-primary"
            )}
          >
            Add new shipping address
          </p>
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
                        showSearch
                        {...field}
                        className={classNames(
                          "w-full h-12 text-sm rounded",
                          errors["country"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
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
                  <ErrorFormMessage errorMessage={errors["country"]?.message} />
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
                    {...form("contactName")}
                    name="contactName"
                    className={classNames(
                      "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                      errors["contactName"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider focus-within:border-primary hover:border-primary"
                    )}
                    type="text"
                    placeholder="Contact name"
                    autoComplete="contactName"
                  />
                  <ErrorFormMessage
                    errorMessage={errors["contactName"]?.message}
                  />
                </div>
                <div className="w-full group">
                  <div
                    className={classNames(
                      "flex items-center w-full h-12 text-sm text-onNeutralBg rounded px-2",
                      errors["contactNr"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider group-hover:border-primary"
                    )}
                  >
                    <input
                      {...form("prefix")}
                      name="prefix"
                      className={classNames(
                        "w-14 bg-transparent focus-within:none outline-0",
                        errors["contactNr"]
                          ? "border-r border-red-500 hover:border-r-red-500"
                          : "border-r border-divider group-hover:border-r-primary"
                      )}
                      type="text"
                      readOnly
                      placeholder="Prefix"
                      value={phonePrefix}
                    />
                    <input
                      {...form("contactNr")}
                      name="contactNr"
                      className="w-full h-12 bg-transparent px-2 focus-within:none outline-0"
                      type="text"
                      placeholder="Phone Number"
                      autoComplete="contactNr"
                    />
                  </div>
                  <ErrorFormMessage
                    errorMessage={errors["contactNr"]?.message}
                  />
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
                    className={classNames(
                      "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                      errors["street"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider focus-within:border-primary hover:border-primary"
                    )}
                    type="text"
                    placeholder="Street address"
                    autoComplete="street"
                  />
                  <ErrorFormMessage errorMessage={errors["street"]?.message} />
                </div>
                <div className="w-full">
                  <input
                    {...form("buildNr")}
                    name="buildNr"
                    className="w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0 border border-divider focus-within:border-primary hover:border-primary"
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
                    className={classNames(
                      "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                      errors["state"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider focus-within:border-primary hover:border-primary"
                    )}
                    type="text"
                    placeholder="State/Province"
                    autoComplete="state"
                  />
                  <ErrorFormMessage errorMessage={errors["state"]?.message} />
                </div>
                <div className="w-full">
                  <input
                    {...form("city")}
                    name="city"
                    className={classNames(
                      "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                      errors["city"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider focus-within:border-primary hover:border-primary"
                    )}
                    type="text"
                    placeholder="City"
                    autoComplete="city"
                  />
                  <ErrorFormMessage errorMessage={errors["city"]?.message} />
                </div>
                <div className="w-full">
                  <input
                    {...form("zip")}
                    name="zip"
                    className={classNames(
                      "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                      errors["zip"]
                        ? "border border-red-500 hover:border-red-500"
                        : "border border-divider focus-within:border-primary hover:border-primary"
                    )}
                    type="text"
                    placeholder="ZIP code"
                    autoComplete="zip"
                  />
                  <ErrorFormMessage errorMessage={errors["zip"]?.message} />
                </div>
              </div>
            </div>
            <div className="flex_justify_end">
              <Button
                type="submit"
                label="Add Shipping Address"
                variant="contained"
                className="h-10"
                disabled={!isValid}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
