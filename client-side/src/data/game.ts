import { GameIconMapsProperties, ImageDimsOptions } from "../types";

interface GameFilterListProperties {
  id: number;
  name: string;
  value: string;
  width: string;
  filterList?: any[];
}

interface GameRatingListProperties {
  id: number;
  value: number;
  name: string;
}

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

export const gameTabsButton = [
  { id: "cast", name: "Cast" },
  { id: "overall", name: "Overall" },
  { id: "reviews", name: "Reviews" },
  { id: "seasons", name: "Seasons" },
];

export const gameFilterList: GameFilterListProperties[] = [
  { id: 1, name: "Platforms", value: "platforms", width: "400px" },
  { id: 2, name: "Genres", value: "genres", width: "400px" },
  { id: 3, name: "Rating", value: "rating", width: "0px" },
  // { id: 4, name: "Name" },
  // { id: 5, name: "Relevance" },
  // { id: 6, name: "Popularity" },
  // { id: 7, name: "Release date" },
];

export const gameRatingList: GameRatingListProperties[] = [
  { id: 1, name: "1", value: 1 },
  { id: 2, name: "2", value: 2 },
  { id: 3, name: "3", value: 3 },
  { id: 4, name: "4", value: 4 },
  { id: 5, name: "5", value: 5 },
];
