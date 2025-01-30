import dayjs from "dayjs";
import { FC, useState } from "react";
import { DatePicker, Select } from "antd";
import { Country } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../components";
import { useAppSelector } from "../../store";
import { useProfileService } from "../../services";
import { genderList, dateFormatList } from "../../data";

export const PersonalDetails: FC = () => {
  const { updateProfile } = useProfileService();

  const { user } = useAppSelector((state) => state.user);
  const {
    city,
    gender,
    address,
    country,
    lastName,
    firstName,
    postalCode,
    dateOfBirth,
    contactNumber,
  } = user.extra;
  const { phonePrefix, phoneNumber } = contactNumber || {};

  const [phonePrfx, setPhonePrfx] = useState<string>(phonePrefix || "");
  const phoneNr = phoneNumber
    ? phoneNumber.replace(phonePrfx, "").trim()
    : null;
  const [contactNr, setContactNr] = useState<string>(phoneNr || "");
  const [isFormChanged, setIsFormChanged] = useState(false);

  const birthdayDate = dateOfBirth
    ? dayjs(dateOfBirth, dateFormatList[2])
    : null;

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
  }));

  const phonePrefixData = Country.getAllCountries().map((item) => {
    const { phonecode, flag, name, isoCode } = item;
    const prefix = phonecode.startsWith("+") ? phonecode : `+${phonecode}`;
    return {
      key: `${prefix}-${isoCode}`,
      name,
      value: prefix,
      selected: `${item.flag} ${prefix}`,
      label: `${flag} ${name} ${prefix}`,
    };
  });

  const onPhonePrefixChange = (value: string) => {
    setPhonePrfx(value);
    setIsFormChanged(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setIsFormChanged(true);

    if (field === "contactNumber") {
      setContactNr(value);
    }
  };

  const filterPhonePrefix = (input: string, option: any) => {
    return option?.name.toLowerCase().includes(input.toLowerCase());
  };

  const handleMenuClick = async (data: any) => {
    try {
      const { dateOfBirth } = data;
      const values = {
        ...data,
        dateOfBirth: dateOfBirth ? dateOfBirth.format(dateFormatList[2]) : null,
        contactNumber: {
          phonePrefix: phonePrfx,
          phoneNumber: contactNr,
        },
      };
      await updateProfile(values);
      setIsFormChanged(false);
    } catch (error) {
      console.error(`Failed to update personal details! ${error}`);
    }
  };

  const {
    register: form,
    handleSubmit,
    control,
  } = useForm({
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit(handleMenuClick)}
      className="bg-card p-8 rounded"
    >
      <h5 className="text-lg font-semibold pb-6">Personal Details</h5>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              First Name
            </label>
            <input
              {...form("firstName")}
              name="firstName"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="First Name"
              autoComplete="firstName"
              defaultValue={firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Last Name
            </label>
            <input
              {...form("lastName")}
              name="lastName"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Last Name"
              autoComplete="lastName"
              defaultValue={lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Birthday
            </label>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={birthdayDate}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={dateFormatList[2]}
                  showNow={false}
                  placeholder={dateFormatList[2]}
                  className="w-full h-12"
                  onChange={(date) => {
                    field.onChange(date);
                    setIsFormChanged(true);
                  }}
                />
              )}
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              defaultValue={gender || null}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full h-12 text-sm"
                  placeholder="Select Gender"
                  options={genderList}
                  onChange={(value) => {
                    field.onChange(value);
                    setIsFormChanged(true);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
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
                onChange={onPhonePrefixChange}
                optionLabelProp="selected"
                className="contactNr-select bg-primary-opacity"
                placeholder="Prefix"
                dropdownStyle={{ width: 250 }}
                defaultValue={phonePrfx ? phonePrfx : null}
                showSearch
                filterOption={filterPhonePrefix}
              />
              <input
                name="contactNumber"
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
                className="w-full h-12 bg-transparent px-2 focus-within:none outline-0"
                type="text"
                placeholder="Phone Number"
                autoComplete="contactNumber"
                defaultValue={phoneNr}
              />
            </div>
          </div>
          <div className="w-full"></div>
        </div>
      </div>

      <h5 className="text-lg font-semibold py-6">Address Details</h5>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue={country || null}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full h-12 text-sm"
                  placeholder="Select country"
                  optionLabelProp="value"
                  options={countryData}
                  onChange={(value) => {
                    field.onChange(value);
                    setIsFormChanged(true);
                  }}
                />
              )}
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              City
            </label>
            <input
              {...form("city")}
              name="city"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Enter city"
              autoComplete="city"
              defaultValue={city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address Line
            </label>
            <input
              {...form("address")}
              name="address"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Enter address"
              autoComplete="address"
              defaultValue={address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Postal Code
            </label>
            <input
              {...form("postalCode")}
              name="postalCode"
              className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
              type="text"
              placeholder="Enter postal code"
              autoComplete="postalCode"
              defaultValue={postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        {/* <Button
          type="button"
          label="Cancel"
          variant="outlined"
          className="h-10"
          onClick={() => {
            navigate("/profile");
          }}
        /> */}
        <Button
          type="submit"
          label="Save Changes"
          variant="contained"
          className="h-10"
          disabled={!isFormChanged}
        />
      </div>
    </form>
  );
};
