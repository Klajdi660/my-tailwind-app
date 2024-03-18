import { FunctionComponent } from "react";
import { DatePicker, Select } from "antd";
import { PatternBg } from "../UI";
import { genderList, dateFormatList } from "../../constants";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import CountryPhoneInput, {
//   CountryPhoneInputValue,
//   ConfigProvider,
// } from "antd-country-phone-input";
// import en from "world_countries_lists/data/countries/en/world.json";
// import "antd/dist/antd.css";
// import "antd-country-phone-input/dist/index.css";

interface PersonalDetailsProps {}

// const ContactNr = () => {
//   const [value, setValue] = useState<CountryPhoneInputValue>({ short: "US" });
//   return (
//     <ConfigProvider locale={en}>
//       <CountryPhoneInput
//         value={value}
//         onChange={(v) => {
//           setValue(v);
//         }}
//         className="your-custom-class"
//       />
//     </ConfigProvider>
//   );
// };

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
  // const [isUpdatingPhoneNr, setIsUpdatingPhoneNr] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [valid, setValid] = useState(true);
  // const [phone, setPhone] = useState("");

  // const handleChange = (value: any) => {
  //   setPhoneNumber(value);
  //   setValid(validatePhoneNumber(value));
  // };

  // const validatePhoneNumber = (phoneNumber: any) => {
  //   const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

  //   return phoneNumberPattern.test(phoneNumber);
  // };

  const handleMenuClick = (value: string) => {
    console.log("value :>> ", value);
  };

  return (
    <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Personal Details</h5>
      </div>
      <form className="w-full">
        <div className="flex flex-wrap pb-[20px]">
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              First Name
            </label>
            <input
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Last Name
            </label>
            <input
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex flex-wrap pb-[20px]">
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Birthday
            </label>
            <DatePicker
              format={dateFormatList[2]}
              showToday={false}
              placeholder="DD-MM-YYYY"
              className="w-full h-10"
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Gender
            </label>
            <Select
              placeholder="Select Gender"
              options={genderList}
              onChange={handleMenuClick}
              className="w-full h-10 text-sm border-red-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap pb-[20px]">
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Contact number
            </label>
            {/* <ContactNr /> */}
            {/* <PhoneInput
              country={"in"}
              value={phoneNumber}
              onChange={handleChange}
              inputProps={{
                required: true,
              }}
              containerClass="phone-nr"
              inputStyle={{
                width: "100%",
                height: "auto",
                background: "",
                border: "transparent",
                fontSize: "14px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                alignItems: "center",
              }}
            /> */}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address
            </label>
            <input
              className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
              type="text"
              placeholder="Street City Country"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
