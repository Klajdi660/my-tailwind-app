import { FunctionComponent } from "react";
import { Icon } from "../UI";
import { gameIconMap } from "../../data";
import { PlatformIconListProps } from "../../types";

export const PlatformIconList: FunctionComponent<PlatformIconListProps> = ({
  platforms,
}) => {
  return (
    <>
      {platforms.map((platform) => (
        <Icon
          key={platform.id}
          name={gameIconMap[platform.slug]}
          className="text-gray-400 group-hover:text-primary"
          size={15}
        />
      ))}
    </>
  );
};
