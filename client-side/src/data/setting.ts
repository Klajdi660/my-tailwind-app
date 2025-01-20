import {
  SettingListParams,
  CurrListParams,
  CardImgParams,
  CardImgListParams,
  CurrencySymbolProperties,
} from "../types";
import {
  americanExpressCardImg,
  discoverCardImg,
  maestroCardImg,
  masterCardImg,
  paypalCardImg,
  payseraCardImg,
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

export const cardMonthList: SettingListParams[] = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "Decemeber" },
];

export const cardYearList: SettingListParams[] = [
  { value: "24", label: "2024" },
  { value: "25", label: "2025" },
  { value: "26", label: "2026" },
  { value: "27", label: "2027" },
  { value: "28", label: "2028" },
  { value: "29", label: "2029" },
  { value: "30", label: "2030" },
  { value: "31", label: "2031" },
  { value: "32", label: "2032" },
  { value: "33", label: "2033" },
  { value: "34", label: "2034" },
  { value: "35", label: "2035" },
  { value: "36", label: "2036" },
  { value: "37", label: "2037" },
  { value: "38", label: "2038" },
  { value: "39", label: "2039" },
  { value: "40", label: "2040" },
  { value: "41", label: "2041" },
  { value: "42", label: "2042" },
  { value: "43", label: "2043" },
  { value: "44", label: "2044" },
  { value: "45", label: "2045" },
  { value: "46", label: "2046" },
  { value: "47", label: "2047" },
  { value: "48", label: "2048" },
  { value: "49", label: "2049" },
  { value: "50", label: "2050" },
];

export const cardImgList: CardImgListParams[] = [
  { id: 1, name: "visa_card", img: visaCardImg, width: 50 },
  { id: 2, name: "master_card", img: masterCardImg, width: 40 },
  { id: 3, name: "maestro_card", img: maestroCardImg, width: 40 },
  // { id: 4, name: "paysera_card", img: payseraCardImg, width: 60 },
  // { id: 5, name: "paypal_card", img: paypalCardImg, width: 60 },
  { id: 6, name: "discover_card", img: discoverCardImg, width: 35 },
  {
    id: 7,
    name: "americanExpress_card",
    img: americanExpressCardImg,
    width: 50,
  },
];

export const cardImg: CardImgParams = {
  visa: visaCardImg,
  mastercard: masterCardImg,
  discover: discoverCardImg,
  noCardType: noCardTypeImg,
};
