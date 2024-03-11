import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const getToken = async (type = "l", authorise = 0) => {};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const getTimeOfDay = () => {
  const currentTime = dayjs();
  const formattedTime = currentTime.format('HH:mm');

  if (formattedTime >= '05:00' && formattedTime < '12:00') {
    return "Good Morning";
  } else if (formattedTime >= '12:00' && formattedTime < '18:00') {
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
}

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
