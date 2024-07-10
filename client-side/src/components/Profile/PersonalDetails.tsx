import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Select } from "antd";
import { City, Country } from "country-state-city";
import { ErrorFormMessage } from "../Common";
import { Button } from "../UI";
import { genderList, dateFormatList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import { PersonalDetailsProps } from "../../types";

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileService();
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.name,
  }));

  const phonePrefixData = Country.getAllCountries().map((item) => ({
    value: item.phonecode,
    icon: item.flag,
    label: `${item.flag} ${item.name} ${item.phonecode}`,
  }));

  const onSearch = (value: string) => {};

  const defaultValues = {
    ...user?.extra,
    // contactNumber: user?.extra?.contactNumber,
    // gender: user?.extra?.gender?.toLowerCase(),
    // country: user?.extra?.country,
    // dateOfBirth: user?.extra?.dateOfBirth
    //   ? dayjs(user.extra.dateOfBirth, dateFormatList[2])
    //   : null,
  };
  console.log("user :>> ", user);
  const {
    register: form,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  console.log("defaultValues :>> ", defaultValues);

  const handleMenuClick = async (data: any) => {
    try {
      const values = {
        extra: {
          ...data,
          dateOfBirth: birthday ? birthday.format(dateFormatList[2]) : "",
          gender,
          contactNumber,
          country,
        },
      };
      await updateProfile(values);
    } catch (error) {
      console.error(`Failed to update personal details! ${error}`);
    }
  };

  const handlePhonePrefixChange = (value: string) => {
    const contactValue = `+${value}${contactNumber}`;
    setPhonePrefix(value);
    setContactNumber(contactValue);
  };

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Personal Details</h5>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleMenuClick)}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
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
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
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
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Birthday
            </label>
            <DatePicker
              format={dateFormatList[2]}
              // defaultValue={defaultValues.dateOfBirth}
              showToday={false}
              placeholder={dateFormatList[2]}
              className="w-full h-10"
              onChange={(date) => setBirthday(date)}
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Gender
            </label>
            <Select
              // value={gender}
              // defaultValue={defaultValues.gender}
              defaultValue={user?.extra?.gender?.toLowerCase()}
              placeholder="Select Gender"
              options={genderList}
              onChange={(value) => setGender(value)}
              className="w-full h-10 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Contact number
            </label>
            <div className="flex">
              <Select
                defaultValue={phonePrefixData[2].icon}
                options={phonePrefixData}
                // onChange={(value) => setPhonePrefix(value)}
                onChange={handlePhonePrefixChange}
                optionLabelProp="icon"
                className="w-[16%] h-10 mr-2"
                dropdownStyle={{ width: 250 }}
              />
              <input
                {...form("contactNumber")}
                // value={contactNumber}
                // onChange={(e) => setContactNumber(e.target.value)}
                name="contactNumber"
                className="w-[84%] h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Phone Number"
                autoComplete="contactNumber"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Select
              showSearch
              defaultValue={user?.extra?.country}
              placeholder="Select country"
              options={countryData}
              onChange={(value) => setCountry(value)}
              onSearch={onSearch}
              className="w-full h-10 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
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
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
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
            />
          </div>
        </div>
        <ErrorFormMessage />
        <div className="flex items-center justify-end w-full hover:brightness-110">
          <Button
            type="submit"
            label="Update Personal Details"
            variant="contained"
            className="w-fit"
            // disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};
