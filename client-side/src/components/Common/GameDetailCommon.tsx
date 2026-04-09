import { FC } from "react";
import {
  DeveloperListProps,
  PlatformsProps,
  PublisherListPorps,
} from "../../types";
import { gameIconMap } from "../../data";
import { Icon, Image } from "../../components";
import { classNames } from "../../utils";

export const Platforms: FC<PlatformsProps> = ({
  platforms,
  className,
  showNames = false,
}) => {
  const normalizedPlatforms = platforms
    .map((item) => ("platform" in item ? item.platform : item))
    .slice(0, 4);

  return (
    <>
      {normalizedPlatforms.map((p) => (
        <span
          key={p.id}
          className={classNames(
            "inline-flex items-center gap-2",
            // showNames && "border border-white/25 rounded px-2 py-1",
            className,
          )}
        >
          <Icon name={gameIconMap[p.slug]} className={className} size={15} />
          {showNames && (
            <span className={className ? `${className} text-xs` : "text-xs"}>
              {p.name}
            </span>
          )}
        </span>
      ))}
    </>
  );
};

export const DeveloperList: FC<DeveloperListProps> = ({
  developers,
  publishers,
}) => {
  return (
    <div className="grid grid-cols-2 gap-y-6">
      {developers.map((dev) => (
        <div key={dev.id} className="flex_justify_start gap-2">
          <Image
            imgUrl={dev.image_background}
            styles="w-16 h-16 rounded-full"
          />
          <p className="flex flex-col">
            <span>{dev.name}</span>
            <span className="text-secondary text-base">
              {dev.games_count} games
            </span>
          </p>
        </div>
      ))}
      {publishers.map((pub) => (
        <div key={pub.id} className="flex_justify_start gap-2">
          <Image
            imgUrl={pub.image_background}
            styles="w-16 h-16 rounded-full"
          />
          <p className="flex flex-col">
            <span>{pub.name}</span>
            <span className="text-secondary text-base">
              {pub.games_count} games
            </span>
          </p>
        </div>
      ))}
      {!developers.length && (
        <p className="text-primary text-xl font-bold text-center">
          No developers found
        </p>
      )}
    </div>
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
