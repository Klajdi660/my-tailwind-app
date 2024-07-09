import { FunctionComponent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Select } from "antd";
import { ErrorFormMessage } from "../Common";
import { Button } from "../UI";
import { genderList, dateFormatList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import { PersonalDetailsProps, PersonalDetailsInput } from "../../types";
import { personalDetailsValidation } from "../../utils";
import { Country, City, State } from "country-state-city";

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileService();
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const phoneCode = Country.getAllCountries().map((item) => ({
    // value: item.flag,
    value: item.phonecode,
    label: `${item.flag} ${item.name} ${item.phonecode}`,
  })) as any;
  console.log("data :>> ", phoneCode);

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const defaultValues = {
    ...user?.extra,
    gender: user?.extra?.gender.toLowerCase() || "Select Gender",
    dateOfBirth: user?.extra?.dateOfBirth
      ? dayjs(user.extra.dateOfBirth, dateFormatList[2])
      : null,
  };

  const {
    register: form,
    // setValue,
    // watch,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      // firstName: user?.extra.firstName,
      // lastName: user?.extra.lastName,
      // birthday: user?.extra.
      ...user?.extra,
    },
    // resolver: yupResolver(personalDetailsValidation),
  });

  // const gender = watch("gender");

  const handleMenuClick = async (data: any) => {
    try {
      console.log("phoneNumber :>> ", phoneNumber);
      const values = {
        ...data,
        extra: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: birthday ? birthday.format(dateFormatList[2]) : "",
          gender,
        },
      };
      await updateProfile(values);
    } catch (error) {
      console.error(`Failed to update personal details! ${error}`);
    }
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
              defaultValue={defaultValues.dateOfBirth}
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
              defaultValue={defaultValues.gender}
              // onChange={(value) => setValue("gender", value)}
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
            <Select
              labelInValue
              options={phoneCode}
              className="w-full"
              // onChange={(value) => setPhoneNumber(value.value)}
              optionLabelProp="value"
            />
            {/* <PhoneInput
              country={"al"}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              // placeholder="Select Contact Number"
            /> */}
          </div>
          <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <Select
              showSearch
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
