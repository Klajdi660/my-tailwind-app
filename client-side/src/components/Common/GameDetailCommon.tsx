import { FC } from "react";
import { Icon } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
} from "../../types";

export const PlatformIconList: FC<PlatformIconListProps> = ({
  platforms,
  className,
}) => {
  return (
    <>
      {platforms.map((p) => (
        <Icon
          key={p.id}
          name={gameIconMap[p.slug]}
          className={className}
          size={15}
        />
      ))}
    </>
  );
};

export const DeveloperList: FC<DeveloperListProps> = ({ developers }) => {
  return (
    <>
      {developers.map((dev, index) => (
        <span className="text-secondary capitalize" key={dev.id}>
          {dev.name.toLowerCase()}
          {index < developers.length - 1 ? " | " : ""}
        </span>
      ))}
    </>
  );
};

export const PublisherList: FC<PublisherListPorps> = ({ publishers }) => {
  return (
    <>
      {publishers.map((pub) => (
        <span className="text-secondary capitalize" key={pub.id}>
          {pub.name.toLowerCase()}
        </span>
      ))}
    </>
  );
};
