import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon, Image } from "../UI";
import { gameIconMap, paths } from "../../data";
import {
  DeveloperListProps,
  PublisherListPorps,
  PlatformIconListProps,
  GameGenreListProps,
} from "../../types";
import { nameTruncate, formatGenreName } from "../../utils";

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
  const { browse } = paths;

  const navigate = useNavigate();

  const handleGenreClick = (
    id: number,
    name: string,
    filterName: string,
    filterId: string
  ) => {
    const params = new URLSearchParams();
    params.set(filterName, name);
    params.set(filterId, id.toString());

    navigate(`${browse}?${params.toString()}`);
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
        slidesPerView={5}
        // slidesPerView="auto"
        spaceBetween={10}
      >
        {gameGenres.map((genre) => (
          <SwiperSlide key={genre.id}>
            <button
              type="button"
              onClick={() =>
                handleGenreClick(genre.id, genre.name, "genre", "genreId")
              }
              className="flex items-center gap-4 bg-card rounded-xl p-4 w-full hover:bg-primary-opacity hover:brightness-110 group"
            >
              <Image
                name={genre.name}
                imgUrl={genre.image_background}
                styles="w-20 h-16 rounded object-cover"
                effect="blur"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold group-hover:text-primary">
                  {nameTruncate(formatGenreName(genre.name), 8)} Games
                </span>
                <span className="text-secondary">
                  {genre.games_count} games
                </span>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </div>
  );
};
