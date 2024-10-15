import { FC, useState, useRef } from "react";
import { Icon, Image } from "../UI";
import { gameIconMap } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { classNames } from "../../utils";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { useAppSelector } from "../../store";
import { defaultThemeConfig } from "../../configs";

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
          // className={classNames("text-secondary", className)}
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

export const GameGenreList: FC<GameGenreListProps> = ({ gameGenres }) => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [isAtBeginning, setIsAtBeginning] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const themeStorage = useAppSelector((state) => state.theme);

  const { sidebar } = themeStorage || defaultThemeConfig;
  const isFolded = sidebar === "folded";

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id);
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
    if (swiperRef.current) {
      setIsAtEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className="flex items-center">
      {/* <div className="flex_justify_center">
        {!isAtBeginning && (
          <button
            ref={prevRef}
            type="button"
            className="w-10 h-10 flex_justify_center transition-colors duration-500 rounded-full hover:bg-primary group"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Icon
              size={25}
              name="MdKeyboardArrowLeft"
              className="group-hover:!text-white"
            />
          </button>
        )}
      </div> */}
      <SwiperComponent
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsAtBeginning(swiper.isBeginning);
          setIsAtEnd(swiper.isEnd);
        }}
        // slidesPerView="auto"
        slidesPerView={8}
        spaceBetween={10}
        // className="genre-section-slider flex items-center w-full text-onNeutralBg"
      >
        {gameGenres.map((genre) => (
          <SwiperSlide
            key={genre.id}
            className={
              classNames()
              // !isFolded ? "!w-[160px]" : "!w-[175px]"
              // "!w-[178px]",
            }
          >
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
                  // "group-hover:!text-white",
                  selectedGenreId === genre.id && "text-white"
                )}
              >
                {genre.name} Games
              </span>
            </button>
          </SwiperSlide>
        ))}
      </SwiperComponent>
      {/* <div className="flex_justify_center">
        {!isAtEnd && (
          <button
            ref={nextRef}
            type="button"
            className="w-10 h-10 flex_justify_center transition-colors duration-500 rounded-full hover:bg-primary group"
            onClick={handleNextClick}
          >
            <Icon
              size={25}
              name="MdKeyboardArrowRight"
              className="group-hover:!text-white"
            />
          </button>
        )}
      </div> */}
    </div>
  );
};
