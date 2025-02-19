import { paths } from "./general";
import {
  ProfileItemList,
  GenderProperties,
  ProfileMenuItems,
  AvatarProfileList,
  PersonalDetailsList,
  SettingListParams,
  CurrListParams,
  CardImgParams,
  CardImgListParams,
  CreditCatdListProperties,
} from "../types";
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  usaExpCardImg,
  discoverCardImg,
  maestroCardImg,
  masterCardImg,
  visaCardImg,
  noCardTypeImg,
} from "../assets";

const { profile } = paths;

// General
export const themeList: SettingListParams[] = [
  { value: "default", label: "System default" },
  { value: "dark", label: "Always on" },
  { value: "light", label: "Always off" },
];

export const languageList: SettingListParams[] = [
  { value: "al", label: "Albanian" },
  { value: "en", label: "English" },
];

export const currencyList: CurrListParams = {
  ALL: { label: "ALL (Albanian Lek)", value: "ALL" },
  EUR: { label: "EUR (Euro)", value: "EUR" },
  GBP: { label: "GBP (Pound)", value: "GBP" },
  USD: { label: "USD (US Dollar)", value: "USD" },
  CHF: { label: "CHF (Swiss Franc)", value: "CHF" },
};

// Account

export const avatarProfileList: AvatarProfileList[] = [
  { id: 1, name: avatar1, size: "w-28 h-28" },
  { id: 2, name: avatar2, size: "w-24 h-24" },
  { id: 3, name: avatar3, size: "w-20 h-20" },
  { id: 4, name: avatar4, size: "w-16 h-16" },
];

export const profileList: ProfileItemList[] = [
  {
    type: "input",
    name: "username",
    label: "Username",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    props: {
      type: "text",
      placeholder: "",
    },
  },
];

export const personalDetailsList: PersonalDetailsList[] = [
  {
    type: "input",
    name: "firstName",
    label: "First Name",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "lastName",
    label: "Last Name",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    label: "Birthday",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "dateOfBirth",
  },
  {
    type: "input",
    name: "gender",
    label: "Gender",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "contactNumber",
    label: "Contact Number",
  },
  {
    type: "input",
    name: "country",
    label: "Country",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    name: "city",
    type: "input",
    label: "City",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "address",
    label: "Address",
    props: {
      type: "text",
      placeholder: "",
    },
  },
];

export const editProfileList: ProfileItemList[] = [
  {
    btnTxt: "Save",
    formName: "profile",
    formTitle: "Profile",
  },
  {
    label: "",
    props: {
      type: "file",
      placeholder: "",
    },
    name: "imageUrl",
    type: "image_dropzone",
    containerDims: "h-32 w-32",
    borderType: "rounded-full",
  },
  {
    type: "input",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "username",
    iconName: "AiOutlineUser",
    label: "Username",
  },
  {
    type: "input",
    name: "email",
    iconName: "AiOutlineMail",
    label: "Email",
    props: {
      type: "text",
      disabled: true,
      placeholder: "",
    },
  },
];

export const genderList: GenderProperties[] = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Prefer not to say",
    label: "Prefer not to say",
  },
];

export const changePasswordList = (isPasswordEnabled: boolean) => [
  {
    formName: "password",
    btnTxt: "Update Password",
    formTitle: "Change Password",
  },
  {
    type: "input",
    name: "currentPassword",
    label: "",
    props: {
      placeholder: "Current Password",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
  {
    type: "input",
    name: "newPassword",
    label: "",
    props: {
      placeholder: "New Password",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
  {
    type: "input",
    name: "confirmNewPassword",
    label: "Confirm New Password",
    props: {
      placeholder: "Confirm New Password",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
];

export const dateFormatList: string[] = [
  "DD/MM/YY",
  "DD-MM-YY",
  "DD/MM/YYYY",
  "DD-MM-YYYY",
];

export const profileMenuItems = ({
  hidden,
  logout,
  navigate,
}: ProfileMenuItems) => [
  {
    id: "profile",
    name: "Profile",
    icon: "AiOutlineUser",
    onClick: () => {
      hidden();
      navigate(`${profile}/account`);
    },
  },
  {
    id: "general",
    name: "Account Settings",
    icon: "AiOutlineSetting",
    onClick: () => {
      hidden();
      navigate(`${profile}/general`);
    },
  },
  {
    id: "wallet",
    icon: "MdOutlinePayment",
    name: "GrooveIT Wallet",
    onClick: () => {
      hidden();
      navigate(`${profile}/payments`);
    },
  },
  {
    id: "wishlist",
    icon: "SlSocialDropbox",
    name: "Wishlist",
    onClick: () => {
      hidden();
    },
  },
  {
    id: "logout",
    name: "Sign out",
    icon: "LiaSignOutAltSolid",
    onClick: () => {
      logout();
      hidden();
    },
  },
];

// Payment
export const cardTypList: SettingListParams[] = [
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
];

export const cardImgList: CardImgListParams[] = [
  { id: 1, name: "visa_card", img: visaCardImg, width: 10, height: 4 },
  { id: 2, name: "master_card", img: masterCardImg, width: 10, height: 5 },
  { id: 3, name: "maestro_card", img: maestroCardImg, width: 10, height: 5 },
  { id: 4, name: "discover_card", img: discoverCardImg, width: 10, height: 5 },
  { id: 5, name: "usaExp_card", img: usaExpCardImg, width: 10, height: 5 },
];

export const cardImg: CardImgParams = {
  visa: visaCardImg,
  mastercard: masterCardImg,
  discover: discoverCardImg,
  noCardType: noCardTypeImg,
};

export const creditCardList: CreditCatdListProperties[] = [
  {
    btnTxt: "Save billing account",
    formName: "creditCard",
    formTitle: "Your payment method",
  },
  {
    type: "input",
    name: "cardName",
    label: "",
    props: {
      placeholder: "Name on crad",
      type: "text",
    },
  },
  {
    type: "input",
    name: "cardNr",
    label: "",
    props: {
      placeholder: "Card number",
      type: "text",
    },
  },
  {
    type: "input",
    name: "cardExp",
    label: "",
    props: {
      placeholder: "Expiration",
      type: "text",
    },
  },
  {
    type: "input",
    name: "cardCvvNr",
    label: "",
    props: {
      placeholder: "CVV",
      type: "text",
    },
  },
];
