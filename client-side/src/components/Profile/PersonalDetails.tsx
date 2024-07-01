import { FunctionComponent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Select } from "antd";
import { ErrorMessage } from "../Common";
import { Button, PatternBg } from "../UI";
import { genderList, dateFormatList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import {
  PersonalDetailsProps,
  PhoneNumberValidationProps,
  PersonalDetailsInput,
} from "../../types";
import { personalDetailsValidation } from "../../utils";

const PhoneNumberValidation: FunctionComponent<PhoneNumberValidationProps> = ({
  value,
  onChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [valid, setValid] = useState(true);

  const handleChange = (value: any) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
    onChange(value);
  };

  const validatePhoneNumber = (phoneNumber: any) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <PhoneInput
      country={"al"}
      value={phoneNumber}
      onChange={handleChange}
      placeholder="Select Contact Number"
    />
  );
};

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileService();
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

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
    <div className="relative p-4 rounded xs:p-6 bg-card overflow-hidden">
      <PatternBg />
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
              onChange={(date: any) => setBirthday(date)}
            />
          </div>
          <div className="w-full md:w-1/2 pb-5">
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
              className="w-full h-10 text-sm border-red-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          {/* <div className="w-full md:w-1/2 md:pr-5 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Contact number
            </label>
            <PhoneNumberValidation
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div> */}
          {/* <div className="w-full md:w-1/2 pb-5">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address
            </label>
            <input
              {...form("address")}
              name="address"
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="Street City Country"
              autoComplete="off"
            />
          </div> */}
        </div>
        <ErrorMessage />
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
