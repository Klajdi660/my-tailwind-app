import {
  SettingListParams,
  CurrListParams,
  CardImgParams,
  CardImgListParams,
  CurrencySymbolProperties,
} from "../types";
import {
  usaExpCardImg,
  discoverCardImg,
  maestroCardImg,
  masterCardImg,
  visaCardImg,
  noCardTypeImg,
} from "../assets";

export const themeList: SettingListParams[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
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

export const currencySymbolList: CurrencySymbolProperties = {
  ALL: "L",
  EUR: "€",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
};

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

export const creditCardList = [
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
