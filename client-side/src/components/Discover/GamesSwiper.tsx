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

//  <div className="relative">
//         <SwiperComponent
//           slidesPerView={isMobile ? 2 : 5}
//           spaceBetween={10}
//           navigation={{
//             nextEl: ".custom-next",
//             prevEl: ".custom-prev",
//           }}
//           modules={[Navigation]}
//           centeredSlides={false}
//           onSlideChange={(swiper) => {
//             setIsBeginning(swiper.isBeginning);
//             setIsEnd(swiper.isEnd);
//           }}
//         >
//           {isGameGenreList &&
//             sortedGameGenres.map((genre: any) => (
//               <SwiperSlide key={genre.id}>
//                 <GenreCard
//                   genreId={genre.id}
//                   genreName={genre.name}
//                   genreImg={genre.image_background}
//                   genreCount={genre.games_count}
//                 />
//               </SwiperSlide>
//             ))}
//         </SwiperComponent>
//         <div className="absolute inset-y-0 left-0 flex items-center">
//           <button
//             className={classNames(
//               "custom-prev w-10 h-10 rounded-full flex justify-center items-center z-10 group hover:bg-primary-opacity transition-opacity duration-300",
//               isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
//             )}
//           >
//             <Icon
//               name="MdKeyboardArrowLeft"
//               size={30}
//               className="text-onNeutralBg group-hover:text-primary"
//             />
//           </button>
//         </div>

//         <div className="absolute inset-y-0 right-0 flex items-center">
//           <button
//             className={classNames(
//               "custom-next w-10 h-10 rounded-full flex justify-center items-center z-10 group hover:bg-primary-opacity transition-opacity duration-300",
//               isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
//             )}
//           >
//             <Icon
//               name="MdKeyboardArrowRight"
//               size={30}
//               className="text-onNeutralBg group-hover:text-primary"
//             />
//           </button>
//         </div>
//       </div>
