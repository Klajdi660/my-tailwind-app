import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gameIconMap, paths } from "../../data";
import { useGames } from "../../hooks";
import { iconName } from "../../assets";
import { GameParams } from "../../types";
import { classNames } from "../../utils";
import { Icon, Image, PlatformIconList } from "../../components";

export const HeroModule: FC = () => {
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const heroSwiperSyncLock = useRef(false);
  const heroMainSwiperRef = useRef<SwiperType | null>(null);
  const heroThumbSwiperRef = useRef<SwiperType | null>(null);

  const [heroThumbChrome, setHeroThumbChrome] = useState({
    index: 0,
    progress: 0,
    canPrev: false,
    canNext: true,
  });
  const [platformsIcon, setPlatformsIcon] = useState<
    GameParams["parent_platforms"]
  >([]);

  useEffect(() => {
    if (gamesSlider && gamesSlider.length > 0) {
      const platforms = gamesSlider[0].parent_platforms || [];
      console.log("platforms :>> ", platforms);
      setPlatformsIcon(platforms);
    }
  }, [gamesSlider]);

  console.log("[platformsIcon] :>> ", [platformsIcon]);

  const heroActiveGame = (gamesSlider[heroThumbChrome.index] ??
    gamesSlider[0]) as GameParams;
  const heroHeadlineThirdLine = heroActiveGame?.name?.trim() || "Bold Gaming";

  const onHeroMainSlideChange = useCallback((swiper: SwiperType) => {
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
  }, []);

  const onHeroThumbSlideChange = useCallback((swiper: SwiperType) => {
    setHeroThumbChrome({
      index: swiper.activeIndex,
      progress: swiper.progress,
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
    if (heroSwiperSyncLock.current) return;
    heroSwiperSyncLock.current = true;
    const main = heroMainSwiperRef.current;
    if (main && main.activeIndex !== swiper.activeIndex) {
      main.slideTo(swiper.activeIndex);
    }
    requestAnimationFrame(() => {
      heroSwiperSyncLock.current = false;
    });
  }, []);

  const onHeroThumbProgress = useCallback((swiper: SwiperType) => {
    setHeroThumbChrome((prev) => ({
      ...prev,
      progress: swiper.progress,
    }));
  }, []);

  const trendingSwiperKey = useMemo(
    () => gamesSlider.map((g: { id: number }) => g.id).join("-"),
    [gamesSlider],
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 isolate z-0 min-h-[100dvh]"
        aria-hidden
      >
        {gamesSlider.length > 1 ? (
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
            }}
            onSlideChange={onHeroMainSlideChange}
            className="hero-home-swiper relative z-0 h-full min-h-[100dvh] w-full [&_.swiper-slide]:!h-full"
          >
            {gamesSlider.map((game: GameParams) => (
              <SwiperSlide key={game.id}>
                <img
                  src={game.background_image}
                  alt=""
                  className="h-full min-h-[100dvh] w-full object-cover object-[center_20%]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={gamesSlider[0]?.background_image ?? "/hero-gaming.png"}
            alt=""
            className="relative z-0 h-full min-h-[100dvh] w-full object-cover object-[center_20%]"
          />
        )}
        {/* Above Swiper fade slides (internal z-index); without z-10 the tint never shows */}
        <div className="absolute inset-0 z-10 min-h-[100dvh] w-full bg-black/60" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col px-4 pb-8 pt-4 sm:px-10 sm:pt-6 md:px-40">
        {/* Nav */}
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
          <div className="flex w-full max-w-xl flex-col justify-center text-left sm:max-w-2xl lg:w-[58%] lg:max-w-none lg:shrink-0">
            <h1 className="flex flex-col gap-1 text-[1.65rem] font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_0_40px_rgba(0,0,0,0.85),0_0_80px_rgba(0,0,0,0.45)] sm:gap-1.5 sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              <span className="text-white">Unlock</span>
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent">
                the Arena of
              </span>
              <span className="text-white">{heroHeadlineThirdLine}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl">
              Immerse yourself in cutting-edge worlds where reality bends to
              your will. The next era of interactive entertainment starts now.
            </p>

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
                Watch Streaming
              </Link>
            </div>

            <div className="w-4/5 mt-10 flex flex-wrap items-stretch gap-0 border-y border-white/25 py-6 sm:mt-12 sm:py-7">
              <div className="flex min-w-[7.5rem] flex-col border-r border-white/25 pr-6 sm:min-w-[8.5rem] sm:pr-8">
                <span className="text-base font-bold text-red-400 sm:text-lg">
                  CLASSIFIED
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  Clearance level
                </span>
              </div>
              <div className="flex min-w-[7.5rem] flex-col border-r border-white/25 px-6 sm:min-w-[8.5rem] sm:px-8">
                <span className="text-base font-bold text-white sm:text-lg">
                  ACTIVE
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  Status
                </span>
              </div>
              <div className="flex min-w-[7.5rem] flex-col pl-6 sm:min-w-[8.5rem] sm:pl-8">
                <span className="text-base font-bold text-cyan-400 sm:text-lg">
                  SOLO/CO-OP
                </span>
                <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs">
                  Mode
                </span>
              </div>
            </div>

            <div className="mt-10 sm:mt-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                Available on:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                <PlatformIconList
                  className="text-secondary"
                  platforms={platformsIcon
                    .slice(0, 4)
                    .map((p: any) => p.platform)}
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
                {gamesSlider.map(
                  (game: {
                    id: number;
                    name: string;
                    background_image: string;
                  }) => (
                    <SwiperSlide key={game.id}>
                      <button
                        type="button"
                        aria-label={game.name}
                        onClick={() => {
                          const i = gamesSlider.findIndex(
                            (g: { id: number }) => g.id === game.id,
                          );
                          if (i >= 0) heroThumbSwiperRef.current?.slideTo(i);
                        }}
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
                  ),
                )}
              </Swiper>

              <div className="mt-4 flex w-full items-center gap-3 sm:mt-5 sm:gap-4">
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => heroThumbSwiperRef.current?.slidePrev()}
                    disabled={!heroThumbChrome.canPrev}
                    className={classNames(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white shadow-lg backdrop-blur-sm transition sm:h-10 sm:w-10",
                      heroThumbChrome.canPrev
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
                    onClick={() => heroThumbSwiperRef.current?.slideNext()}
                    disabled={!heroThumbChrome.canNext}
                    className={classNames(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white shadow-lg backdrop-blur-sm transition sm:h-10 sm:w-10",
                      heroThumbChrome.canNext
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
                          heroThumbChrome.progress * 100,
                        ),
                      )}%`,
                    }}
                  />
                </div>

                {/* <span className="shrink-0 tabular-nums text-sm font-semibold tracking-tight text-white sm:text-base">
                  {String(heroThumbChrome.index + 1).padStart(2, "0")}
                </span> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
