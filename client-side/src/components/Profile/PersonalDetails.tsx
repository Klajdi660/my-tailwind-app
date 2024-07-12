import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Select } from "antd";
import { Country } from "country-state-city";
// import { ErrorFormMessage } from "../Common";
import { Button } from "../UI";
import { genderList, dateFormatList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import { PersonalDetailsProps } from "../../types";

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileService();

  const navigate = useNavigate();

  const [gender, setGender] = useState<string | null>(
    user?.extra?.gender || null
  );
  const [birthday, setBirthday] = useState<Dayjs | null>(
    (user?.extra?.dateOfBirth &&
      dayjs(user?.extra?.dateOfBirth, dateFormatList[2])) ||
      null
  );
  const [country, setCountry] = useState<string | null>(
    user?.extra?.country || null
  );
  const [phonePrefix, setPhonePrefix] = useState<string>(
    user?.extra?.contactNumber?.phonePrefix || ""
  );

  const phoneNumber = user?.extra?.contactNumber?.phoneNumber
    .replace(phonePrefix, "")
    .trim();

  const [contactNumber, setContactNumber] = useState<string>(phoneNumber || "");
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.name,
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

  const onCountrySearch = (value: string) => {
    setCountry(value);
  };

  const onPhonePrefixChange = (value: string) => {
    setPhonePrefix(value);
  };

  const handleMenuClick = async (data: any) => {
    try {
      const values = {
        extra: {
          ...data,
          dateOfBirth: birthday ? birthday.format(dateFormatList[2]) : "",
          gender,
          contactNumber: {
            phonePrefix: phonePrefix,
            phoneNumber: contactNumber,
          },
          country,
        },
      };

      await updateProfile(values);
    } catch (error) {
      console.error(`Failed to update personal details! ${error}`);
    }
  };

  const { register: form, handleSubmit } = useForm({
    mode: "onTouched",
  });

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Personal Details</h5>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleMenuClick)}>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              First Name
            </label>
            <input
              {...form("firstName")}
              name="firstName"
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="First Name"
              autoComplete="firstName"
              defaultValue={user?.extra?.firstName}
            />
          </div>
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Last Name
            </label>
            <input
              {...form("lastName")}
              name="lastName"
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="Last Name"
              autoComplete="lastName"
              defaultValue={user?.extra?.lastName}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Birthday
            </label>
            <DatePicker
              format={dateFormatList[2]}
              defaultValue={
                user?.extra?.dateOfBirth
                  ? dayjs(user.extra.dateOfBirth, dateFormatList[2])
                  : null
              }
              showNow={false}
              placeholder={dateFormatList[2]}
              className="w-full h-10"
              onChange={(date) => setBirthday(date)}
            />
          </div>
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Gender
            </label>
            <Select
              defaultValue={user?.extra?.gender}
              placeholder="Select Gender"
              options={genderList}
              // optionLabelProp="label"
              onChange={(value) => setGender(value)}
              className="w-full h-10 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%] pb-5">
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
                className="w-[20%] h-10 mr-2"
                dropdownStyle={{ width: 250 }}
                defaultValue={
                  phonePrefix ? phonePrefix : phonePrefixData[2].selected
                }
              />
              <input
                name="contactNumber"
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-[80%] h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Phone Number"
                autoComplete="contactNumber"
                defaultValue={phoneNumber}
              />
            </div>
          </div>
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Select
              showSearch
              defaultValue={user?.extra?.country}
              placeholder="Select country"
              options={countryData}
              onChange={(value) => setCountry(value)}
              onSearch={onCountrySearch}
              className="w-full h-10 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              City
            </label>
            <input
              {...form("city")}
              name="city"
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="City"
              autoComplete="city"
              defaultValue={user?.extra?.city}
            />
          </div>
          <div className="w-full md:w-[48%] pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address
            </label>
            <input
              {...form("address")}
              name="address"
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="Address"
              autoComplete="address"
              defaultValue={user?.extra?.address}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            label="Cancel"
            variant="outlined"
            onClick={() => {
              navigate("/profile");
            }}
          />
          <Button type="submit" label="Save" variant="contained" />
        </div>
      </form>
    </div>
  );
};
