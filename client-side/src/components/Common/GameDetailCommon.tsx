import { FC, useState } from "react";
import { Icon } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { classNames } from "../../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

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
    setSelectedGenreId(id);
  };

  return (
    <Swiper
      modules={[Navigation]}
      navigation={false}
      slidesPerView="auto"
      spaceBetween={10}
      className="genre-section-slider w-full text-onNeutralBg"
    >
      {gameGenres.map((genre) => (
        <SwiperSlide key={genre.id} className="!w-[175px]">
          <button
            key={genre.id}
            type="button"
            onClick={() => handleGenreClick(genre.id)}
            className={classNames(
              "flex_justify_center w-full gap-2 py-4 rounded-2xl transition duration-300 relative group",
              selectedGenreId === genre.id
                ? "bg-primary"
                : "bg-primary-opacity hover:bg-primary hover:brightness-110"
            )}
          >
            <LazyLoadImage
              alt={genre.name}
              src={genre.image_background}
              className="rounded h-10 w-10 object-cover"
              effect="blur"
            />
            <span
              className={classNames(
                "group-hover:!text-white",
                selectedGenreId === genre.id && "text-white"
              )}
            >
              {genre.name}
            </span>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
