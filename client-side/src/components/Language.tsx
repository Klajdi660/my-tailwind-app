import React, { FunctionComponent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country } from "country-state-city";
import { State } from "country-state-city";
import { Select } from "antd";
import { Button } from "./UI";
import { currencyList } from "../data";
import { useStore } from "../hooks";
import { LanguageProps } from "../types";

const recommendedCountries = [
  "Spain",
  "Italy",
  "Chile",
  "Korea",
  "Brazil",
  "France",
  "Israel",
  "Canada",
  "Poland",
  "Ukraine",
  "Australia",
  "Netherlands",
  "Switzerland",
  "Saudi Arabia",
  "United States",
  "United Kingdom",
];

const currencyMap = [
  "France",
  "Albania",
  "Switzerland",
  "United States",
  "United Kingdom",
];

const languageMaps = [
  "French",
  "German",
  "Spanish",
  "English",
  "Italian",
  "Albanian",
];

export const Language: FunctionComponent<LanguageProps> = (props) => {
  const { setShippingTo } = useStore();

  const [selectedCurrency, setSelectedCurrency] = useState<string>("ALL");
  const [selectedIsoCode, setSelectedIsoCode] = useState<string>("AL");

  const allCountries = Country.getAllCountries();

  const recommendedCountriesList = allCountries.filter((country) =>
    recommendedCountries.includes(country.name)
  );

  const otherCountries = allCountries.filter(
    (country) => !recommendedCountries.includes(country.name)
  );

  const currencyCountries = allCountries.filter((country) =>
    currencyMap.includes(country.name)
  );

  const currencyOptions = currencyCountries.map((country) => ({
    label: `${country.currency} (${currencyList[country.currency]})`,
    value: country.currency,
  }));

  const stateData = State.getStatesOfCountry(selectedIsoCode).map((state) => ({
    value: state.name,
    displayValue: `${state.name} - ${state.isoCode}`,
  }));

  console.log("selectedIsoCode :>> ", selectedIsoCode);

  const combinedCountries = [
    {
      label: "Recommended",
      options: recommendedCountriesList.map((country) => ({
        label: `${country.flag} ${country.name}`,
        value: country.isoCode,
      })),
    },
    {
      label: "All Countries",
      options: otherCountries.map((country) => ({
        label: `${country.flag} ${country.name}`,
        value: country.isoCode,
      })),
    },
  ];

  const languageOptions = languageMaps.map((language) => ({
    label: language,
    value: language,
  }));

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = allCountries.find(
      (country) => country.isoCode === countryCode
    );

    if (selectedCountry) {
      const { isoCode, currency, name } = selectedCountry;

      setSelectedCurrency(currency);
      setSelectedIsoCode(isoCode);
      setShippingTo(name);
      setValue("currency", currency);
    }
  };

  const { register, handleSubmit, control, setValue } = useForm({
    mode: "onTouched",
  });

  return (
    <form className="p-2 space-y-3 min-w-[300px]">
      <div className="w-full flex flex-col mb-4 gap-4">
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
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        />
      </div>
    </form>
  );
};
