import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

  // if (hour >= 5 && hour < 12) {
  //   return "Good Morning";
  // } else if (hour >= 12 && hour < 18) {
  //   return "Good Afternoon";
  // } else {
  //   return "Good Evening";
  // }

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
