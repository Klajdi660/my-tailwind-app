import { FC, useCallback, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useGames } from "../../hooks";
import { classNames } from "../../utils";
import { Link } from "react-router-dom";
import { JOIN_REASONS, paths } from "../../data";
import { Icon, Image } from "../../components";

export const TrendingModule: FC = () => {
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const [trendingNav, setTrendingNav] = useState({
    canPrev: false,
    canNext: true,
  });

  const trendingSwiperRef = useRef<SwiperType | null>(null);

  const trendingSwiperKey = useMemo(
    () => gamesSlider.map((g: { id: number }) => g.id).join("-"),
    [gamesSlider],
  );

  const syncTrendingNav = useCallback((swiper: SwiperType) => {
    setTrendingNav({
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
  }, []);

  return (
    <section className="trending_section relative">
      <h2 className="text-xl text-white font-bold sm:mb-6 sm:text-2xl md:text-3xl">
        What's Hot This Week
      </h2>

      <div className="relative">
        <Swiper
          key={trendingSwiperKey}
          modules={[FreeMode, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={16}
          breakpoints={{
            640: { spaceBetween: 20 },
            1024: { spaceBetween: 24 },
          }}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.65,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          observer
          observeParents
          watchSlidesProgress
          onSwiper={(swiper) => {
            trendingSwiperRef.current = swiper;
            syncTrendingNav(swiper);
            requestAnimationFrame(() => swiper.update());
          }}
          onSlideChange={syncTrendingNav}
          onProgress={(swiper) => syncTrendingNav(swiper)}
          onResize={syncTrendingNav}
          watchOverflow
          className={classNames(
            "hide_scrollbar trending-swiper [&_.swiper-slide]:!overflow-visible -mx-1 px-1 py-2",
            trendingNav.canPrev ? "pl-12 sm:pl-14" : "pl-1",
            trendingNav.canNext ? "pr-12 sm:pr-14" : "pr-1",
          )}
          wrapperClass="items-end !overflow-visible"
        >
          {gamesSlider.map((game: any, index: number) => (
            <SwiperSlide
              key={game.id}
              className="!flex !h-auto !w-auto shrink-0 !overflow-visible"
            >
              <Link
                to={`${paths.GAME_DETAILS}/${game.id}`}
                className="group flex w-auto shrink-0 items-end pt-2"
              >
                <span
                  className="pointer-events-none relative z-30 min-w-[2.25rem] shrink-0 select-none text-right text-[3.5rem] font-black leading-[0.78] text-transparent sm:min-w-[2.75rem] sm:text-[4.25rem] md:text-[5rem]"
                  style={{
                    WebkitTextStroke: "2.5px rgba(255,255,255,0.95)",
                    paintOrder: "stroke fill",
                  }}
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="relative z-20 -ml-10 h-[252px] w-[180px] shrink-0 overflow-hidden rounded-md shadow-lg ring-1 ring-white/10 transition group-hover:ring-white/25 sm:-ml-11">
                  <Image
                    imgUrl={game.background_image}
                    name={game.name}
                    styles="h-[252px] w-[180px] object-cover"
                    effect="opacity"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => trendingSwiperRef.current?.slideTo(0)}
          disabled={!trendingNav.canPrev}
          className={classNames(
            "absolute left-0 top-1/2 z-20 flex h-1/2 w-6 -translate-y-1/2 items-center justify-center rounded bg-black/55 text-white shadow-lg backdrop-blur-[2px] transition hover:bg-black/75",
            trendingNav.canPrev
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          aria-label="Previous"
          aria-hidden={!trendingNav.canPrev}
        >
          <Icon name="MdKeyboardArrowLeft" size={28} className="!text-white" />
        </button>
        <button
          type="button"
          onClick={() => {
            const swiper = trendingSwiperRef.current;
            if (!swiper) return;

            swiper.slideTo(swiper.slides.length - 1);
          }}
          disabled={!trendingNav.canNext}
          className={classNames(
            "absolute right-0 top-1/2 z-20 flex h-1/2 w-6 -translate-y-1/2 items-center justify-center rounded bg-black/55 text-white shadow-lg backdrop-blur-[2px] transition hover:bg-black/75",
            trendingNav.canNext
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          aria-label="Next"
          aria-hidden={!trendingNav.canNext}
        >
          <Icon name="MdKeyboardArrowRight" size={28} className="!text-white" />
        </button>
      </div>
      <h2 className="mb-5 mt-14 text-white text-xl font-bold sm:mb-6 sm:mt-16 sm:text-2xl md:mt-20 md:text-3xl">
        More Reasons to Join
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {JOIN_REASONS.map((item) => (
          <article
            key={item.id}
            className="relative flex flex-col rounded gap-2 p-4 bg-gradient-to-br from-violet-950/55 via-zinc-950/80 to-black ring-1 ring-white/[0.06]"
          >
            <h3 className="text-xl font-bold leading-snug text-white">
              {item.title}
            </h3>
            <p className="flex-1 text-base leading-relaxed text-white/75">
              {item.description}
            </p>
            <div className="flex_justify_end">
              <Icon name={item.icon} size={54} className={item.iconClass} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
