import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import { Country } from "country-state-city";
import { Button } from "../UI";
import { genderList, dateFormatList } from "../../data";
import { useAppSelector } from "../../store";
import { useProfileService } from "../../services";
import { PersonalDetailsProps } from "../../types";

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  const { updateProfile } = useProfileService();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const { address, country, city, postalCode } = user.extra;

  const [phonePrefix, setPhonePrefix] = useState<string>(
    user?.extra?.contactNumber?.phonePrefix || ""
  );

  const phoneNumber = user?.extra?.contactNumber?.phoneNumber
    .replace(phonePrefix, "")
    .trim();
  const [contactNumber, setContactNumber] = useState<string>(phoneNumber || "");

  const [isFormChanged, setIsFormChanged] = useState(false);

  const defaultValues = {
    firstName: user?.extra?.firstName,
    lastName: user?.extra?.lastName,
    dateOfBirth: user?.extra.dateOfBirth
      ? dayjs(user?.extra.dateOfBirth, dateFormatList[2])
      : null,
    gender: user?.extra?.gender,
    country: country,
    city: city,
    address: address,
    postalCode: postalCode,
  };

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
  }));

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

  const onPhonePrefixChange = (value: string) => {
    setPhonePrefix(value);
    setIsFormChanged(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setIsFormChanged(true);

    if (field === "contactNumber") {
      setContactNumber(value);
    }
  };

  const handleMenuClick = async (data: any) => {
    try {
      const { dateOfBirth } = data;
      const values = {
        extra: {
          ...data,
          dateOfBirth: dateOfBirth
            ? dateOfBirth.format(dateFormatList[2])
            : null,
          contactNumber: {
            phonePrefix: phonePrefix,
            phoneNumber: contactNumber,
          },
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
    <form onSubmit={handleSubmit(handleMenuClick)}>
      <h5 className="text-lg font-semibold pb-6">Personal Details</h5>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
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
              defaultValue={defaultValues.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div className="w-full md:w-[48%]">
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
              defaultValue={defaultValues.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Birthday
            </label>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={defaultValues.dateOfBirth}
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
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              defaultValue={defaultValues.gender}
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
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
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
                dropdownStyle={{ width: 250 }}
                defaultValue={
                  phonePrefix ? phonePrefix : phonePrefixData[2].selected
                }
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
                defaultValue={phoneNumber}
              />
            </div>
          </div>
        </div>
      </div>

      <h5 className="text-lg font-semibold py-6">Address Details</h5>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue={defaultValues.country || ""}
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
          <div className="w-full md:w-[48%]">
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
              defaultValue={defaultValues.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
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
              defaultValue={defaultValues.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
          <div className="w-full md:w-[48%]">
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
              defaultValue={defaultValues.postalCode}
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

// if value is empty
// if (!value) {
//   setIsFormChanged(false);
// } else {
//   setIsFormChanged(true);
// }
