import { FunctionComponent } from "react";
import { Icon } from "../UI";
import { gameIconMap } from "../../data";
import {
  PlatformIconListProps,
  DeveloperListProps,
  PublisherListPorps,
} from "../../types";
import { classNames } from "../../utils";

export const PlatformIconList: FunctionComponent<PlatformIconListProps> = ({
  platforms,
  className,
}) => {
  return (
    <>
      {platforms.map((p) => (
        <Icon
          key={p.id}
          name={gameIconMap[p.slug]}
          className={classNames("text-gray-500", className)}
          size={15}
        />
      ))}
    </>
  );
};

export const DeveloperList: FunctionComponent<DeveloperListProps> = ({
  developers,
}) => {
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

export const PublisherList: FunctionComponent<PublisherListPorps> = ({
  publishers,
}) => {
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
