import { FC } from "react";
import { Button, Icon, Image } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { classNames } from "../../utils";

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
          className={classNames("text-gray-500", className)}
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

export const GameGenreList: FC<GameGenreListProps> = ({ gameGenres }) => {
  return (
    <div className="flex gap-2 text-onNeutralBg">
      {gameGenres.slice(0, 8).map((genre) => (
        <button
          key={genre.id}
          type="button"
          className="flex_justify_center w-full gap-2 bg-primary-opacity py-4 rounded-2xl hover:bg-primary group"
        >
          <Image imgUrl={genre.image_background} styles="rounded h-10 w-10" />
          <span className="group-hover:!text-white">{genre.name}</span>
        </button>
      ))}
      <button className="rounded-l-2xl transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
        <Icon
          name="MdOutlineKeyboardDoubleArrowRight"
          className="group-hover:!text-white"
        />
      </button>
    </div>
  );
};
