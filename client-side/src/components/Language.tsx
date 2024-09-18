import { Select } from "antd";
import { State } from "country-state-city";
import { Country } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import React, { FC, useState } from "react";
import { Button } from "./UI";
import { LanguageProps } from "../types";
import { useProfileService } from "../services";
import { useAppSelector } from "../store";
import { currencyList, recommendedCountries, languageMaps } from "../data";

export const Language: FC<LanguageProps> = (props) => {
  const { setOpen } = props;
  const { user } = useAppSelector((state) => state.user);
  const { updateProfile } = useProfileService();

  // const [selectedCurrency, setSelectedCurrency] = useState<string>("ALL");
  const [selectedIsoCode, setSelectedIsoCode] = useState<string>("AL");

  const allCountries = Country.getAllCountries();

  const recommendedCountriesList = allCountries.filter((country) =>
    recommendedCountries.includes(country.name)
  );

  const otherCountries = allCountries.filter(
    (country) => !recommendedCountries.includes(country.name)
  );

  const languageOptions = Object.keys(languageMaps).map((lang) => ({
    label: languageMaps[lang].label,
    value: lang,
  }));

  const currencyOptions = Object.keys(currencyList).map((curr) => ({
    label: currencyList[curr].label,
    value: curr,
  }));

  const stateData = State.getStatesOfCountry(selectedIsoCode).map((state) => ({
    value: state.name,
    displayValue: `${state.name} - ${state.isoCode}`,
  }));

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

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = allCountries.find(
      (country) => country.isoCode === countryCode
    );

    if (selectedCountry) {
      const { isoCode, currency } = selectedCountry;

      const curr = currencyList[currency]
        ? currencyList[currency].value
        : currencyList["USD"].value;

      const lang = languageMaps[isoCode]
        ? languageMaps[isoCode].value
        : languageMaps["US"].value;

      // setSelectedCurrency(currency);
      // setSelectedIsoCode(isoCode);

      setValue("currency", curr);
      setValue("lang", lang);
      setValue("shipTo", isoCode);
    }
  };

  const handleMenuClick = async (data: any) => {
    const selectedCountry = allCountries.find(
      (country) => country.isoCode === data.shipTo
    );
    const values = {
      extra: {
        ...data,
        shipTo: selectedCountry?.name,
        flag: selectedCountry?.flag,
      },
    };
    await updateProfile(values);
    setOpen(false);
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
    <form
      className="p-2 space-y-3 min-w-[300px]"
      onSubmit={handleSubmit(handleMenuClick)}
    >
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="provider"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Ship to
        </label>
        <Controller
          name="shipTo"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full h-10 text-sm"
              placeholder="Select ship country"
              options={combinedCountries}
              onChange={handleCountryChange}
              showSearch
              defaultValue={
                user?.extra?.shipTo &&
                `${user?.extra?.flag} ${user?.extra?.shipTo}`
              }
            />
          )}
        />
        {selectedIsoCode === "US" && (
          <Controller
            name="shipToState"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="w-full h-10 text-sm"
                placeholder="Select state"
                options={stateData}
                showSearch
              />
            )}
          />
        )}
      </div>
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="provider"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Language
        </label>
        <Controller
          name="lang"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full h-10 text-sm"
              placeholder="Select language"
              options={languageOptions}
              defaultValue={user?.extra?.lang}
            />
          )}
        />
      </div>
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="currency"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Currency
        </label>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full h-10 text-sm"
              placeholder="Select currency"
              options={currencyOptions}
              defaultValue={user?.extra?.currency}
            />
          )}
        />
      </div>
      <div className="w-full flex_justify_center mt-4 group">
        <Button
          label="Save"
          variant="none"
          className="w-full bg-primary rounded-full text-white group-hover:opacity-70"
          iconClassName="text-white"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
