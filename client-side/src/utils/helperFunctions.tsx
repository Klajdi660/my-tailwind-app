import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GameParams } from "../types";

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
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

export const isATokenExpired = () => {
  const atoken = atob(localStorage.atoken.split(".")[1]);

  if (atoken) {
    const currentTime = dayjs().unix();
    const tokenExpirationTime = JSON.parse(atoken).exp;
    return currentTime > parseInt(tokenExpirationTime);
  }

  return false;
};

export const isTokenExpired = (token: string): boolean => {
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  const expiryTime = tokenData.exp * 1000;
  return Date.now() > expiryTime;
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

const IMAGE_URL = "https://image.tmdb.org/t/p";

export const resizeImage = (
  imgUrl: string,
  width: string = "original"
): string => {
  return `${IMAGE_URL}/${width}${imgUrl}`;
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

export const getRandomDiscoverGames = (games: unknown[], length: number) => {
  const randomGames = new Set();

  while (randomGames.size < length) {
    const index = Math.floor(Math.random() * games?.length);
    randomGames.add(games[index]);
  }

  return { ...randomGames };
};

export const cycleDiscoverGameArray = (array: unknown[]) => {
  const newArray = [...array];
  newArray.push(newArray.shift());
  return newArray;
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
