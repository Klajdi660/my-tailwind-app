import { FunctionComponent } from "react";
// import { IconType } from "react-icons";
import { Icon } from "../UI";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface PlatformIconListProps {
  platforms: Platform[];
}

export const PlatformIconList: FunctionComponent<PlatformIconListProps> = ({
  platforms,
}) => {
  console.log("platforms :>> ", platforms);
  const iconMap: { [key: string]: string } = {
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

  return (
    <>
      {platforms.map((platform) => (
        <Icon
          key={platform.id}
          name={iconMap[platform.slug]}
          className="text-gray-400"
          size={16}
        />
      ))}
    </>
  );
};
