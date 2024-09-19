import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import { Country } from "country-state-city";
import { Button, Icon } from "../UI";
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
            <div className="relative">
              <input
                {...form("firstName")}
                name="firstName"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="First Name"
                autoComplete="firstName"
                defaultValue={user?.extra?.firstName}
              />
              <Icon
                name="BiUser"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Last Name
            </label>
            <div className="relative">
              <input
                {...form("lastName")}
                name="lastName"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Last Name"
                autoComplete="lastName"
                defaultValue={user?.extra?.lastName}
              />
              <Icon
                name="BiUser"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
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
              defaultValue={
                user?.extra.dateOfBirth
                  ? dayjs(user?.extra.dateOfBirth, dateFormatList[2])
                  : null
              }
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={dateFormatList[2]}
                  showNow={false}
                  placeholder={dateFormatList[2]}
                  className="w-full h-12"
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
              defaultValue={user?.extra?.gender}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full h-12 text-sm"
                  placeholder="Select Gender"
                  options={genderList}
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
            <div className="flex">
              <Select
                options={phonePrefixData.map(({ key, ...rest }) => ({
                  key,
                  ...rest,
                }))}
                onChange={onPhonePrefixChange}
                optionLabelProp="selected"
                className="w-[28%] md:w-[20%] sm:w-[14%] h-12 mr-2"
                dropdownStyle={{ width: 250 }}
                defaultValue={
                  phonePrefix ? phonePrefix : phonePrefixData[2].selected
                }
              />
              <div className="relative w-[86%]">
                <input
                  name="contactNumber"
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                  type="text"
                  placeholder="Phone Number"
                  autoComplete="contactNumber"
                  defaultValue={phoneNumber}
                />
                <Icon
                  name="MdOutlinePhoneEnabled"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
                />
              </div>
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
            <div className="relative">
              <input
                {...form("country")}
                name="country"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter country"
                autoComplete="country"
                defaultValue={country}
              />
              <Icon
                name="TiLocationArrowOutline"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              City
            </label>
            <div className="relative">
              <input
                {...form("city")}
                name="city"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter city"
                autoComplete="city"
                defaultValue={city}
              />
              <Icon
                name="MdOutlineLocationSearching"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address Line
            </label>
            <div className="relative">
              <input
                {...form("address")}
                name="address"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter address"
                autoComplete="address"
                defaultValue={address}
              />
              <Icon
                name="HiOutlineLocationMarker"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Postal Code
            </label>
            <div className="relative">
              <input
                {...form("postalCode")}
                name="postalCode"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter postal code"
                autoComplete="postalCode"
                defaultValue={postalCode}
              />
              <Icon
                name="BsSignpostSplit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          type="submit"
          label="Cancel"
          variant="outlined"
          className="h-10"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <Button
          type="submit"
          label="Save Changes"
          variant="contained"
          className="h-10"
        />
      </div>
    </form>
  );
};
