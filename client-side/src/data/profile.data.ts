import { paths } from "./general.data";
import {
  AvatarProfileList,
  CardImgListParams,
  CardImgParams,
  CurrListParams,
  GenderProperties,
  ProfileMenuItems,
  SettingListParams,
} from "../types";
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  discoverCardImg,
  maestroCardImg,
  masterCardImg,
  noCardTypeImg,
  usaExpCardImg,
  visaCardImg,
} from "../assets";

const { PROFILE } = paths;

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
      navigate(`${PROFILE}/account`);
    },
  },
  {
    id: "general",
    name: "Account Settings",
    icon: "AiOutlineSetting",
    onClick: () => {
      hidden();
      navigate(`${PROFILE}/general`);
    },
  },
  {
    id: "wallet",
    icon: "MdOutlinePayment",
    name: "GrooveIT Wallet",
    onClick: () => {
      hidden();
      navigate(`${PROFILE}/payments`);
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
