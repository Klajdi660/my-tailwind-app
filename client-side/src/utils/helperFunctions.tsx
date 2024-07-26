import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { noGameImg } from "../assets";
import { GameParams } from "../types";

dayjs.extend(customParseFormat);

export const convertTZ = (rawDate: string, selectedTimeZone: string) => {
  const dateFormat = "DD-MM-YYYY HH:mm:ss";
  let [date, time] = moment
    .tz(rawDate, selectedTimeZone)
    .format(dateFormat)
    .split(" ");
  return { date, time };
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const getTimeOfDay = () => {
  const currentTime = dayjs();
  const hour = currentTime.hour();

  switch (true) {
    case hour >= 5 && hour < 12:
      return "Good Morning";
    case hour >= 12 && hour < 18:
      return "Good Afternoon";
    default:
      return "Good Evening";
  }
};

const getStorageValue = (key: string, defaultValue: any) => {
  const saved = localStorage.getItem(key) as any;
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useMobileResponsive = () => {
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return !isMobile;
};

export const useHiddenTopPlay = () => {
  const isTopPlayHidden = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  return isTopPlayHidden;
};

export const isRTokenExpired = () => {
  if (localStorage.rtoken) {
    const currentTime = dayjs().unix();
    const rTokenExpTime = JSON.parse(localStorage.rtoken).exp;
    return parseInt(rTokenExpTime) > currentTime;
  }
  return false;
};

export const isATokenExpired = () => {
  const atoken = atob(localStorage.atoken.split(".")[1]);

  if (atoken) {
    const currentTime = dayjs().unix();
    const tokenExpirationTime = JSON.parse(atoken).exp;
    return currentTime > parseInt(tokenExpirationTime);
  }

  return false;
};

export const fileBlob = (files: File[] | null) => {
  if (files?.[0]) {
    return {
      blobName: files[0]?.name,
      blobUrl: URL.createObjectURL(files[0]),
    };
  } else {
    return {};
  }
};

export const getGameCroppedImgUrl = (url: string) => {
  if (!url) return noGameImg;

  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export const gameNameTruncate = (str: string, len: number) => {
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
