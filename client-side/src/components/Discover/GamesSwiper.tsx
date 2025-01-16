import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Title, Icon } from "../UI";
import { useGames } from "../../hooks";
import { classNames } from "../../utils";
import { MediaCard, GenreCard } from "../Cards";
import { paths } from "../../data";
import { motion } from "framer-motion";

interface GamesSwiperProps {
  sectionName: string;
  titleName: string;
  dateParam?: string;
  orderingParam?: string;
  swiperType?: string;
}

export const GamesSwiper: FC<GamesSwiperProps> = (props) => {
  const { sectionName, titleName, dateParam, orderingParam, swiperType } =
    props;

  const { browse } = paths;

  const { useGameList, useGameGenreList } = useGames();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const params = {
    dates: dateParam,
    ordering: orderingParam,
    page_size: 20,
  };

  const { gameList } = useGameList(params);
  const { gameGenreList }: any = useGameGenreList();
  if (!gameList) return;

  return (
    <div className={classNames(sectionName, "flex flex-col gap-4")}>
      <div className="flex_justify_between">
        <button
          type="button"
          className="flex_justify_center"
          onClick={() => navigate(browse)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            whileHover={{ color: "#1f9bee" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Title name={titleName} type="small" divider={false} />
          </motion.div>
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Icon name="MdKeyboardArrowRight" size={30} />
          </motion.div>
        </button>
        <div className="flex gap-2">
          <button
            ref={prevRef}
            disabled={isBeginning}
            type="button"
            className={classNames(
              "w-8 h-8 flex_justify_center transition-colors duration-500 rounded-full group",
              isBeginning ? "bg-card" : "bg-card hover:bg-primary-opacity"
            )}
          >
            <Icon
              name="MdKeyboardArrowLeft"
              className={classNames(
                isBeginning ? "text-secondary" : "group-hover:text-primary"
              )}
            />
          </button>
          <button
            ref={nextRef}
            disabled={isEnd}
            type="button"
            className={classNames(
              "w-8 h-8 flex_justify_center transition-colors duration-500 rounded-full group",
              isEnd ? "bg-card" : "bg-card hover:bg-primary-opacity"
            )}
          >
            <Icon
              name="MdKeyboardArrowRight"
              className={classNames(
                isEnd ? "text-secondary" : "group-hover:text-primary"
              )}
            />
          </button>
        </div>
      </div>
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
          {swiperType !== "genre"
            ? gameList?.pages?.map((page, index) => (
                <div key={index}>
                  {page?.results?.map((game) => (
                    <SwiperSlide key={game.id}>
                      <MediaCard key={game.id} game={game} />
                    </SwiperSlide>
                  ))}
                </div>
              ))
            : gameGenreList?.map((genre: any) => (
                <SwiperSlide key={genre.id}>
                  <GenreCard
                    genreId={genre.id}
                    genreName={genre.name}
                    genreImg={genre.image_background}
                    genreCount={genre.games_count}
                  />
                </SwiperSlide>
              ))}
        </SwiperComponent>
      </div>
    </div>
  );
};
