import dayjs from "dayjs";
import moment from "moment";
import { GameParams } from "../types";

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const isTokenExpired = (token: string): boolean => {
  const tokenData = JSON.parse(atob(token.split(".")[1]));

  const currentTime = dayjs().unix();
  const tokenExpirationTime = tokenData.exp;

  return currentTime > parseInt(tokenExpirationTime);
};

export const nameTruncate = (str: string, len?: number) => {
  if (!len) {
    const namePart = str.split("@")[0];
    return `${namePart}...`;
  }

  return str?.length
    ? str.length <= len
      ? `${str.slice(0, len)}`
      : `${str.slice(0, len)}...`
    : null;
};

export const calculateTimePassed = (time: number): string => {
  const unit = {
    year: 12 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - time;
  for (const key in unit) {
    if (diff > unit[key as keyof typeof unit]) {
      const timePassed = Math.floor(diff / unit[key as keyof typeof unit]);
      return `${timePassed} ${key}${timePassed > 1 ? "s" : ""}`;
    }
  }

  return "Just now";
};

export const getGamePrice = (game: GameParams) => {
  const { released, genres } = game;

  const isIndie = !!genres.find((genre) => genre.name !== "Indie");

  const releaseYear = new Date(released).getFullYear();
  const currentYear = new Date().getFullYear();
  const differenceYear = currentYear - releaseYear;

  const minPrice = 1;
  let discountPerYear = 0.35;
  let newPrice = isIndie ? 5 : 10;

  for (let i = 0; i < differenceYear; i++) {
    newPrice += 1 - discountPerYear;
    if (differenceYear > 0.1) {
      discountPerYear -= 0.08;
    } else {
      discountPerYear = 0.1;
    }
  }

  newPrice = Math.ceil(newPrice);
  newPrice = newPrice < minPrice ? minPrice : newPrice;
  return newPrice - 0.01;
};

const calculateShippingCost = (price: number | any) => {
  if (price <= 10.99) {
    return 0;
  }

  return 0.99;
};

export const calculateTotalPrice = (
  cartItems: GameParams[],
  quantities: { [id: string]: number }
) => {
  let shipping = 0;
  const subTotalPrice = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || 1;
    shipping += calculateShippingCost(item.price) * quantity;
    return parseFloat((total + item.price * quantity).toFixed(2));
  }, 0);

  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return {
    subTotalPrice,
    shipping: shipping.toFixed(2),
    totalPrice,
  };
};

export const maskCardNumber = (cardNumber: string) => {
  const last4Digits = cardNumber.slice(-4);
  const maskedNumber = cardNumber.slice(0, -4).replace(/\d/g, "*");
  return maskedNumber + last4Digits;
};

export const getAside = (pathname: string) => {
  const key = pathname.split("/")[1];
  const hasAside = ["browse"]?.includes(key);
  return hasAside;
};

export const convertTZ = (
  currDate: string,
  selectedTimeZone: string = "Europe/Tirane"
) => {
  const dateFormat = "DD-MM-YYYY HH:mm:ss";
  let [date, time] = moment
    .tz(currDate, selectedTimeZone)
    .format(dateFormat)
    .split(" ");
  return { date, time };
};

export const convertDayName = (timeAgo: string) => {
  if (timeAgo === "a minute" || timeAgo === "a few seconds") {
    return "0m";
  }

  return timeAgo
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" weeks", "w")
    .replace(" week", "w")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" years", "y")
    .replace(" year", "y");
};
