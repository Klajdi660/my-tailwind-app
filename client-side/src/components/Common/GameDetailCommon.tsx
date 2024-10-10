import { FC, useState } from "react";
import { Button, Icon, Image } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { classNames } from "../../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id); // Update the selected genre
  };

  return (
    <div className="flex items-center gap-2 text-onNeutralBg">
      {gameGenres.slice(0, 10).map((genre) => (
        <button
          key={genre.id}
          type="button"
          // className="flex_justify_center w-full gap-2 bg-primary-opacity py-4 rounded-2xl hover:bg-primary hover:scale-105 hover:brightness-110 transition duration-300 relative group"
          onClick={() => handleGenreClick(genre.id)}
          className={classNames(
            "flex_justify_center w-full gap-2 py-4 rounded-2xl transition duration-300 relative group",
            selectedGenreId === genre.id
              ? "bg-primary"
              : "bg-primary-opacity hover:bg-primary hover:scale-105 hover:brightness-110"
          )}
        >
          {/* <Image imgUrl={genre.image_background} styles="rounded h-10 w-10" /> */}
          <LazyLoadImage
            alt={genre.name}
            src={genre.image_background}
            className="rounded h-10 w-10 object-cover"
            effect="blur"
          />
          <span
            // className="group-hover:!text-white"
            className={classNames(
              "group-hover:!text-white",
              selectedGenreId === genre.id && "text-white"
            )}
          >
            {genre.name}
          </span>
        </button>
      ))}
      <div className="w-10 h-10">
        <button className="w-10 h-10 rounded-full transition-colors duration-500 rounded flex_justify_center hover:bg-primary group">
          <Icon
            name="MdKeyboardArrowRight"
            className="group-hover:!text-white"
          />
        </button>
      </div>
    </div>
  );
};
