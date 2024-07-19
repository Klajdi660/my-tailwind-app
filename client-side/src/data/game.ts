import { GameIconMapsProperties, ImageDimsOptions } from "../types";

export const gameIconMap: GameIconMapsProperties = {
  pc: "FaWindows",
  playstation: "FaPlaystation",
  xbox: "FaXbox",
  nintendo: "SiNintendo",
  mac: "FaApple",
  linux: "FaLinux",
  android: "FaAndroid",
  ios: "MdPhoneIphone",
  web: "BsGlobe",
};

export const imageDimsOpt: ImageDimsOptions = {
  11: "h-11 w-11",
  16: "h-16 w-16",
  20: "h-20 w-20",
  28: "h-28 w-28",
};

export const gameTabsButton = [
  { id: "overall", name: "Overall" },
  { id: "cast", name: "Cast" },
  { id: "reviews", name: "Reviews" },
  { id: "seasons", name: "Seasons" },
];
