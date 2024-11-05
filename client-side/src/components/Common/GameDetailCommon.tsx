import { FC, useState } from "react";
import { Icon, Image } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { classNames, nameTruncate } from "../../utils";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
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

export const GameGenreList: FC<GameGenreListProps> = (props) => {
  const { gameGenres, prevRef, nextRef, setIsBeginning, setIsEnd } = props;

  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id);
  };

  return (
    <div className="flex items-center">
      <SwiperComponent
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper: any) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        slidesPerView={6}
        spaceBetween={10}
      >
        {gameGenres.map((genre) => (
          <SwiperSlide key={genre.id}>
            <button
              type="button"
              onClick={() => handleGenreClick(genre.id)}
              className={classNames(
                "flex_justify_center flex-col w-full h-full gap-2 p-4 rounded-xl transition duration-300 relative group",
                selectedGenreId === genre.id
                  ? "bg-primary"
                  : "bg-card hover:bg-primary-opacity hover:brightness-110"
              )}
            >
              <Image
                name={genre.name}
                imgUrl={genre.image_background}
                styles="w-40 h-28 rounded object-cover"
                effect="blur"
              />
              <span
                className={classNames(
                  selectedGenreId === genre.id && "text-white"
                )}
              >
                {nameTruncate(genre.name, 14)} Games
              </span>
            </button>
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </div>
  );
};
