import { Navigation } from "swiper/modules";
import { FC, useRef, useState } from "react";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { useGames, useMediaResponsive } from "../../hooks";
import { classNames } from "../../utils";
import { GamesSwiperProps } from "../../types";
import { GenreCard, MediaCard, SwiperButton } from "../../components";

export const GamesSwiper: FC<GamesSwiperProps> = (props) => {
  const { sectionName, titleName, dateParam, orderingParam, swiperType } =
    props;

  const { isMobile } = useMediaResponsive();
  const { useGameList, useGameGenreList } = useGames();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const params = {
    dates: dateParam,
    ordering: orderingParam,
    page_size: 20,
  };

  const { gameList } = useGameList(params);
  const { gameGenreList, isGameGenreListSuccess } = useGameGenreList();

  const isGameGenreList =
    swiperType === "genre" && isGameGenreListSuccess && gameGenreList;

  return (
    <div
      className={classNames(sectionName, "flex flex-col gap-4")}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <SwiperButton
        titleName={titleName}
        prevRef={prevRef}
        nextRef={nextRef}
        isEnd={isEnd}
        isBeginning={isBeginning}
        isCardHovered={isCardHovered}
      />
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
          // onReachBeginning={() => setIsBeginning(true)}
          // onReachEnd={() => setIsEnd(true)}
          slidesPerView={isMobile ? 2 : 5}
          spaceBetween={10}
        >
          {isGameGenreList
            ? gameGenreList.map((genre: any) => (
                <SwiperSlide key={genre.id}>
                  <GenreCard
                    genreId={genre.id}
                    genreName={genre.name}
                    genreImg={genre.image_background}
                    genreCount={genre.games_count}
                  />
                </SwiperSlide>
              ))
            : gameList &&
              gameList.pages.map((page, index) => (
                <div key={index}>
                  {page?.results?.map((game) => (
                    <SwiperSlide key={game.id}>
                      <MediaCard key={game.id} game={game} />
                    </SwiperSlide>
                  ))}
                </div>
              ))}
        </SwiperComponent>
      </div>
    </div>
  );
};
