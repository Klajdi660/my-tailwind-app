import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { noGameImg } from "../assets";

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
