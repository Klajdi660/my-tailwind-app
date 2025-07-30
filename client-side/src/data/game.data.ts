import {
  GameFilterListProperties,
  GameIconMapsProperties,
  GameRatingListProperties,
  GameTabsButtonProperties,
  ImageDimsOptions,
} from "../types";

export const gameIconMap: GameIconMapsProperties = {
  xbox: "FaXbox",
  mac: "FaApple",
  web: "BsGlobe",
  pc: "FaWindows",
  linux: "FaLinux",
  ios: "MdPhoneIphone",
  android: "FaAndroid",
  nintendo: "SiNintendo",
  playstation: "FaPlaystation",
};

export const imageDimsOpt: ImageDimsOptions = {
  11: "h-11 w-11",
  16: "h-16 w-16",
  20: "h-20 w-20",
  28: "h-28 w-28",
};

export const gameTabsButton: GameTabsButtonProperties[] = [
  { id: "overall", name: "Overall" },
  { id: "developer", name: "Developer" },
  { id: "reviews", name: "Reviews" },
  { id: "seasons", name: "Seasons" },
];

export const gameFilterList: GameFilterListProperties[] = [
  { id: 1, name: "Platforms", value: "platform", width: "300px" },
  { id: 2, name: "Genres", value: "genre", width: "300px" },
  { id: 3, name: "Rating", value: "rating", width: "0px" },
  // { id: 4, name: "Name", value: "name", width: "" },
  // { id: 5, name: "Relevance", value: "relevance", width: "" },
  // { id: 6, name: "Popularity", value: "popularity", width: "" },
  // { id: 7, name: "Release date", value: "release", width: "" },
];

export const gameRatingList: GameRatingListProperties[] = [
  { id: 1, name: "1", value: 1 },
  { id: 2, name: "2", value: 2 },
  { id: 3, name: "3", value: 3 },
  { id: 4, name: "4", value: 4 },
  { id: 5, name: "5", value: 5 },
];
