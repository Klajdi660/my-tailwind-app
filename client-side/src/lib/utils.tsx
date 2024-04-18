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
  const formattedTime = currentTime.format("HH:mm");

  if (formattedTime >= "05:00" && formattedTime < "12:00") {
    return "Good Morning";
  } else if (formattedTime >= "12:00" && formattedTime < "18:00") {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const getStorageValue = (key: string, defaultValue: any) => {
  // getting stored value
  const saved = localStorage.getItem(key) as any;
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
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
