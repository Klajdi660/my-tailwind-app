import { GameIconMapsProperties, ImageDimsOptions } from "../types";

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
