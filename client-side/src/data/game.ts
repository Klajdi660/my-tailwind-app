import { GameIconMapsProperties, ImageDimsOptions } from "../types";

interface GameFilterListProperties {
  id: number;
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
  { id: 1, name: "Platforms" },
  { id: 2, name: "Genres" },
  { id: 3, name: "Name" },
  { id: 4, name: "Relevance" },
  { id: 5, name: "Popularity" },
  { id: 6, name: "Rating" },
  { id: 7, name: "Release date" },
];
