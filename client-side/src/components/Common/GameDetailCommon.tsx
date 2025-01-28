import { FC } from "react";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
} from "../../types";
import { gameIconMap } from "../../data";
import { Icon, Image } from "../../components";

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
