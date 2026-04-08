import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { paths } from "../../data";
import { useGames } from "../../hooks";
import { iconName } from "../../assets";
import { GameParams } from "../../types";
import { classNames } from "../../utils";
import { Icon, Image, Platforms } from "../../components";

export const HeroModule: FC = () => {
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const heroSwiperSyncLock = useRef(false);
  const heroMainSwiperRef = useRef<SwiperType | null>(null);
  const heroThumbSwiperRef = useRef<SwiperType | null>(null);

  const [, setHeroThumbChrome] = useState({
    index: 0,
    progress: 0,
    canPrev: false,
    canNext: true,
  });
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [platforms, setPlatforms] = useState<GameParams["parent_platforms"]>(
    [],
  );

  useEffect(() => {
    if (gamesSlider && gamesSlider.length > 0) {
      const platforms = gamesSlider[0].parent_platforms || [];
      setPlatforms(platforms);
      setActiveGameIndex(0);
    }
  }, [gamesSlider]);

  const heroActiveGame = (gamesSlider[activeGameIndex] ??
    gamesSlider[0]) as GameParams;
  const heroHeadlineThirdLine = heroActiveGame?.name?.trim() || "Bold Gaming";

  const syncPlatformsByIndex = useCallback(
    (index: number) => {
      setPlatforms(gamesSlider[index]?.parent_platforms || []);
    },
    [gamesSlider],
  );

  const onHeroMainSlideChange = useCallback(
    (swiper: SwiperType) => {
      setActiveGameIndex(swiper.activeIndex);
      syncPlatformsByIndex(swiper.activeIndex);
      if (heroSwiperSyncLock.current) return;
      heroSwiperSyncLock.current = true;
      const thumb = heroThumbSwiperRef.current;
      if (thumb && thumb.activeIndex !== swiper.activeIndex) {
        thumb.slideTo(swiper.activeIndex);
      }
      requestAnimationFrame(() => {
        const t = heroThumbSwiperRef.current;
        if (t) {
          setHeroThumbChrome({
            index: t.activeIndex,
            progress: t.progress,
            canPrev: !t.isBeginning,
            canNext: !t.isEnd,
          });
        }
        heroSwiperSyncLock.current = false;
      });
    },
    [syncPlatformsByIndex],
  );

  const onHeroThumbSlideChange = useCallback((swiper: SwiperType) => {
    setHeroThumbChrome({
      index: swiper.activeIndex,
      progress: swiper.progress,
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
  }, []);

  const onHeroThumbProgress = useCallback((swiper: SwiperType) => {
    setHeroThumbChrome((prev) => ({
      ...prev,
      progress: swiper.progress,
    }));
  }, []);

  const slideHeroThumbToGameId = useCallback(
    (gameId: number) => {
      const i = gamesSlider.findIndex((g) => g.id === gameId);
      if (i >= 0) {
        heroMainSwiperRef.current?.slideTo(i);
        heroThumbSwiperRef.current?.slideTo(i);
        setActiveGameIndex(i);
        syncPlatformsByIndex(i);
      }
    },
    [gamesSlider, syncPlatformsByIndex],
  );

  const trendingSwiperKey = useMemo(
    () => gamesSlider.map((g: { id: number }) => g.id).join("-"),
    [gamesSlider],
  );

  const activeGame = gamesSlider[activeGameIndex] || gamesSlider[0];

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

  const ratingLabel = useMemo(() => {
    if (!activeGame?.rating && activeGame?.rating !== 0) return "N/A";
    return `${activeGame.rating.toFixed(1)}`;
  }, [activeGame]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 isolate z-0 min-h-[100dvh]"
        aria-hidden
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          rewind
          speed={1000}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            heroMainSwiperRef.current = swiper;
            setActiveGameIndex(swiper.activeIndex);
          }}
          onSlideChange={onHeroMainSlideChange}
          className="hero-home-swiper relative z-0 h-full min-h-[100dvh] w-full [&_.swiper-slide]:!h-full"
        >
          {gamesSlider.map((game) => (
            <SwiperSlide key={game.id}>
              <Image
                imgUrl={game.background_image}
                name={game.name}
                effect="opacity"
                styles="h-full min-h-[100dvh] w-full object-cover object-[center_20%]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Above Swiper fade slides (internal z-index); without z-10 the tint never shows */}
        <div className="absolute inset-0 z-10 min-h-[100dvh] w-full bg-black/60" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col px-4 pb-8 pt-4 sm:px-10 sm:pt-6 md:px-40">
        <header className="flex shrink-0 items-center justify-between">
          <Link to={paths.HOME} className="block w-28 sm:w-36 md:w-40">
            <Image
              imgUrl={iconName}
              name="Logo"
              styles="h-auto w-full object-contain"
              effect="opacity"
            />
          </Link>
          <Link
            to={paths.LOGIN}
            className="rounded bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:brightness-110 sm:px-5 sm:py-2 sm:text-base"
          >
            Sign In
          </Link>
        </header>

        {/* CTA (~60% left) + bottom-right horizontal swiper */}
        <div className="flex w-full flex-1 flex-col gap-10 py-8 sm:py-12 lg:flex-row lg:items-stretch lg:justify-between lg:py-10 min-h-0">
          <div className="flex w-full max-w-xl flex-col justify-center text-left sm:max-w-2xl lg:w-1/2 lg:max-w-none lg:shrink-0">
            <div className="flex flex-col text-white text-7xl font-semibold font-orbitron">
              <span>Unlock</span>
              <span className="text-primary">the Arena of</span>
              <span>{heroHeadlineThirdLine}</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Link
                to=""
                className="inline-flex items-center gap-2 rounded border border-white/40 bg-black/45 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/60 sm:px-6 sm:text-base"
              >
                <Icon name="MdShoppingBag" size={22} className="!text-white" />
                Shop Now
              </Link>
              <Link
                to={paths.DISCOVER}
                className="inline-flex items-center gap-2 rounded border border-white/40 bg-black/45 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/60 sm:px-6 sm:text-base"
              >
                <Icon
                  name="MdOutlinePlayArrow"
                  size={24}
                  className="!text-white"
                />
                Watch TRAILER
              </Link>
            </div>

            <div className="w-4/5 mt-10 flex flex-wrap items-stretch gap-0 border-y border-white/25 py-6 sm:mt-12 sm:py-7">
              <div className="flex min-w-[7.5rem] flex-col border-r border-white/25 pr-6 sm:min-w-[8.5rem] sm:pr-8">
                <span className="text-base font-bold text-white sm:text-lg">
                  {releasedDateLabel}
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  RELEASED DATE
                </span>
              </div>
              <div className="flex min-w-[7.5rem] flex-col border-r border-white/25 px-6 sm:min-w-[8.5rem] sm:px-8">
                <span className="text-base font-bold text-white sm:text-lg">
                  {genresLabel}
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  GENRES
                </span>
              </div>
              <div className="flex min-w-[7.5rem] flex-col pl-6 sm:min-w-[8.5rem] sm:pl-8">
                <span className="text-base font-bold text-white sm:text-lg">
                  {ratingLabel}
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  RATING
                </span>
              </div>
            </div>

            <div className="mt-10 sm:mt-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                Available on:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                <Platforms
                  className="text-white"
                  showNames
                  platforms={platforms}
                />
              </ul>
            </div>
          </div>

          {/* Bottom-right: ~3 cards, nav + progress + index */}
          {gamesSlider.length > 0 && (
            <div className="relative z-20 mt-auto flex w-full flex-col items-stretch lg:mt-0 lg:w-[42%] lg:max-w-[540px] lg:flex-none lg:justify-end lg:self-end">
              <Swiper
                key={`hero-thumb-${trendingSwiperKey}`}
                slidesPerView={2.15}
                spaceBetween={12}
                breakpoints={{
                  480: { slidesPerView: 2.35, spaceBetween: 14 },
                  1024: { slidesPerView: 3, spaceBetween: 16 },
                }}
                grabCursor
                observer
                observeParents
                onSwiper={(swiper) => {
                  heroThumbSwiperRef.current = swiper;
                  setHeroThumbChrome({
                    index: swiper.activeIndex,
                    progress: swiper.progress,
                    canPrev: !swiper.isBeginning,
                    canNext: !swiper.isEnd,
                  });
                  requestAnimationFrame(() => swiper.update());
                }}
                onSlideChange={onHeroThumbSlideChange}
                onProgress={onHeroThumbProgress}
                className="hero-thumb-swiper w-full [&_.swiper-slide]:!h-auto"
              >
                {gamesSlider.map((game) => (
                  <SwiperSlide key={game.id}>
                    <button
                      type="button"
                      aria-label={game.name}
                      onClick={() => slideHeroThumbToGameId(game.id)}
                      className="group relative block h-[140px] w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left ring-1 ring-white/35 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:ring-white/60 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:rounded-2xl"
                    >
                      <Image
                        imgUrl={game.background_image}
                        name={game.name}
                        styles="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        effect="opacity"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-4 flex w-full items-center gap-3 sm:mt-5 sm:gap-4">
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => heroMainSwiperRef.current?.slidePrev()}
                    disabled={activeGameIndex <= 0}
                    className={classNames(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white shadow-lg backdrop-blur-sm transition sm:h-10 sm:w-10",
                      activeGameIndex > 0
                        ? "hover:border-white/70 hover:bg-black/70"
                        : "cursor-not-allowed opacity-35",
                    )}
                    aria-label="Previous slide"
                  >
                    <Icon
                      name="MdKeyboardArrowLeft"
                      size={22}
                      className="!text-white"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => heroMainSwiperRef.current?.slideNext()}
                    disabled={activeGameIndex >= gamesSlider.length - 1}
                    className={classNames(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white shadow-lg backdrop-blur-sm transition sm:h-10 sm:w-10",
                      activeGameIndex < gamesSlider.length - 1
                        ? "hover:border-white/70 hover:bg-black/70"
                        : "cursor-not-allowed opacity-35",
                    )}
                    aria-label="Next slide"
                  >
                    <Icon
                      name="MdKeyboardArrowRight"
                      size={22}
                      className="!text-white"
                    />
                  </button>
                </div>

                <div className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full min-w-[6%] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-[width] duration-150 ease-out"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          gamesSlider.length <= 1 ? 100 : 8,
                          (activeGameIndex / (gamesSlider.length - 1 || 1)) *
                            100,
                        ),
                      )}%`,
                    }}
                  />
                </div>

                <span className="shrink-0 tabular-nums text-sm font-semibold tracking-tight text-white sm:text-base">
                  {String(activeGameIndex + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
