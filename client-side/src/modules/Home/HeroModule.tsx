import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { paths } from "../../data";
import { useGames } from "../../hooks";
import { classNames } from "../../utils";
import { HeroModuleProps } from "../../types";
import { Button, Image, Platforms } from "../../components";

export const HeroModule: FC<HeroModuleProps> = ({
  activeGameId,
  setActiveGameId,
}) => {
  const navigate = useNavigate();
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const rightPreviewSwiperRef = useRef<SwiperType | null>(null);
  const [rightPreviewNav, setRightPreviewNav] = useState({
    canPrev: false,
    canNext: true,
  });

  const heroActiveGame = gamesSlider[activeGameId] ?? gamesSlider[0];

  const slideHeroThumbToGameId = useCallback(
    (gameId: number) => {
      const i = gamesSlider.findIndex((g) => g.id === gameId);
      if (i >= 0) {
        setActiveGameId(i);
      }
    },
    [gamesSlider, setActiveGameId],
  );

  const activeGame = gamesSlider[activeGameId] || gamesSlider[0];

  const releasedDateLabel = useMemo(() => {
    if (!activeGame?.released) return "N/A";
    const parsed = new Date(activeGame.released);
    if (Number.isNaN(parsed.getTime())) return activeGame.released;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(parsed);
  }, [activeGame]);

  const genresLabel = useMemo(() => {
    if (!activeGame?.genres?.length) return "N/A";
    return activeGame.genres
      .slice(0, 2)
      .map((genre) => genre.name)
      .join(", ");
  }, [activeGame]);

  const syncRightPreviewNav = useCallback((swiper: SwiperType) => {
    setRightPreviewNav({
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
  }, []);

  const onRightPreviewSlideChange = useCallback(
    (swiper: SwiperType) => {
      syncRightPreviewNav(swiper);
      setActiveGameId(swiper.activeIndex);
    },
    [setActiveGameId, syncRightPreviewNav],
  );

  return (
    <div className="flex w-full flex-1 items-center py-8 sm:py-12 lg:py-10">
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col justify-center gap-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80 sm:text-sm">
            {releasedDateLabel}
            <span className="mx-2 text-white/35">|</span>
            {genresLabel}
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="font-orbitron text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              {heroActiveGame?.name || "Game Highlight"}
            </h1>
            <div className="flex_justify_start gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/75 sm:text-base shrink-0">
                Available On
              </p>
              <Platforms
                className="text-white"
                showNames
                platforms={activeGame?.parent_platforms || []}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button
              type="button"
              label="Buy"
              variant="contained"
              labelIcon="TbShoppingBag"
              onClick={() => navigate(paths.DISCOVER)}
            />
            <Button
              type="button"
              label="Trailer"
              variant="none"
              labelIcon="MdOutlinePlayCircle"
              className="text-white hover:underline underline-offset-2"
              onClick={() => navigate(paths.DISCOVER)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-orbitron font-semibold text-white">
            Trending now
          </p>
          <div className="group/preview relative">
            <Swiper
              modules={[Autoplay, FreeMode, Mousewheel]}
              direction="vertical"
              slidesPerView={3}
              spaceBetween={12}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.6,
              }}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              observer
              observeParents
              watchSlidesProgress
              onSwiper={(swiper) => {
                rightPreviewSwiperRef.current = swiper;
                syncRightPreviewNav(swiper);
              }}
              onSlideChange={onRightPreviewSlideChange}
              onProgress={syncRightPreviewNav}
              className="hide_scrollbar h-[360px] [&_.swiper-slide]:!h-auto"
            >
              {gamesSlider.map((game) => (
                <SwiperSlide key={game.id}>
                  <button
                    type="button"
                    onClick={() => slideHeroThumbToGameId(game.id)}
                    className={classNames(
                      "group flex w-full items-center gap-4 rounded-lg p-2 text-left transition hover:bg-black/20",
                      game.id === heroActiveGame?.id && "bg-black/25",
                    )}
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        imgUrl={game.background_image}
                        name={game.name}
                        height="100%"
                        styles="h-full w-full object-cover"
                        effect="opacity"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-semibold leading-tight text-white">
                        {game.name}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/75">
                        {game.genres
                          .slice(0, 2)
                          .map((g) => g.name)
                          .join(", ")}
                      </p>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            <Button
              type="button"
              variant="none"
              onClick={() => rightPreviewSwiperRef.current?.slidePrev()}
              disabled={!rightPreviewNav.canPrev}
              className={classNames(
                "pointer-events-none absolute left-1/2 top-0 z-10 flex h-6 w-10 -translate-x-1/2 items-center justify-center rounded text-white opacity-0 transition-opacity",
                rightPreviewNav.canPrev &&
                  "bg-black/50 hover:bg-black/70 group-hover/preview:pointer-events-auto group-hover/preview:opacity-100",
              )}
              labelIcon="MdKeyboardArrowUp"
              iconClassName={classNames(
                "text-white",
                rightPreviewNav.canPrev
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            />
            <Button
              type="button"
              variant="none"
              onClick={() => rightPreviewSwiperRef.current?.slideNext()}
              disabled={!rightPreviewNav.canNext}
              className={classNames(
                "pointer-events-none absolute bottom-0 left-1/2 z-10 flex h-6 w-10 -translate-x-1/2 items-center justify-center rounded text-white opacity-0 transition-opacity",
                rightPreviewNav.canNext &&
                  "bg-black/50 hover:bg-black/70 group-hover/preview:pointer-events-auto group-hover/preview:opacity-100",
              )}
              labelIcon="MdKeyboardArrowDown"
              labelIconClassName={classNames(
                "text-white",
                rightPreviewNav.canNext
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
