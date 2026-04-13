import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Icon,
  Image,
  Platforms,
  ScrollToTopButton,
  StarRating,
} from "../../components";
import { useGames } from "../../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperApi } from "swiper";
import type { GameParams } from "../../types";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data";

/** Local calendar `YYYY-MM-DD` (avoids UTC drift vs daily API `date`). */
function formatLocalCalendarDay(addDays: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + addDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Left column = 1 “today” pick; right swiper = 9 “tomorrow” picks (10 games total). */
const DAILY_TODAY_LIMIT = 1;
const DAILY_TOMORROW_LIMIT = 9;

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { useDailyGames } = useGames();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const todayYmd = formatLocalCalendarDay(0);
  const tomorrowYmd = formatLocalCalendarDay(1);

  const { dailyGames: todayGames, isDailyPending: isTodayPending } =
    useDailyGames({
      date: todayYmd,
      limit: DAILY_TODAY_LIMIT,
      tz,
    });
  const { dailyGames: tomorrowGames, isDailyPending: isTomorrowPending } =
    useDailyGames({
      date: tomorrowYmd,
      limit: DAILY_TOMORROW_LIMIT,
      tz,
    });

  const gamesSlider = useMemo(
    () => [...todayGames, ...tomorrowGames],
    [todayGames, tomorrowGames],
  );
  const todayCount = todayGames.length;

  const isSliderPending = isTodayPending || isTomorrowPending;

  const [activeIndex, setActiveIndex] = useState(0);
  /** After user clicks a swiper thumb, header follows active slide; before that, “Tomorrow” is highlighted in the header only. */
  const [swiperThumbClicked, setSwiperThumbClicked] = useState(false);
  const previewSwiperRef = useRef<SwiperApi | null>(null);
  const [swiperEdge, setSwiperEdge] = useState({
    isBeginning: true,
    isEnd: false,
  });

  /** `isEnd` / `isBeginning` are unreliable with `slidesPerView: "auto"`; combine `progress` + translate. */
  const syncSwiperEdges = useCallback((sw: SwiperApi) => {
    if (sw.destroyed) return;
    const p =
      typeof sw.progress === "number" && Number.isFinite(sw.progress)
        ? sw.progress
        : 0;
    const maxT = sw.maxTranslate();
    const minT = sw.minTranslate();
    const t = sw.translate;
    const px = 2;
    const nearEnd =
      Number.isFinite(maxT) && Number.isFinite(t) && t <= maxT + px;
    const nearStart =
      Number.isFinite(minT) && Number.isFinite(t) && t >= minT - px;
    setSwiperEdge({
      isBeginning: sw.isBeginning || p <= 0.002 || nearStart,
      isEnd: sw.isEnd || p >= 0.998 || nearEnd,
    });
  }, []);

  const activeDay = useMemo<"today" | "tomorrow">(() => {
    if (activeIndex < todayCount) return "today";
    return "tomorrow";
  }, [activeIndex, todayCount]);

  const isDailyForToday = activeDay === "today";
  const isDailyForTomorrow = activeDay === "tomorrow";
  const hasKnownRelation = todayCount > 0 || tomorrowGames.length > 0;

  const activeGame = useMemo(() => {
    if (!gamesSlider.length) return null;
    const safe = Math.min(Math.max(0, activeIndex), gamesSlider.length - 1);
    return gamesSlider[safe];
  }, [activeIndex, gamesSlider]);

  /** Right swiper only: games after “today” (up to 9). Left hero uses index 0 alone. */
  const previewSlides = useMemo(() => {
    return gamesSlider.slice(todayCount).map((game, i) => ({
      game,
      globalIndex: todayCount + i,
    }));
  }, [gamesSlider, todayCount]);

  /** Index in the preview strip of the first “tomorrow” game (always 0 when tomorrow exists). */
  const firstTomorrowPreviewIndex = useMemo(() => {
    return previewSlides.findIndex((e) => e.globalIndex >= todayCount);
  }, [previewSlides, todayCount]);

  /** Highlights header “Tomorrow” (dots + label) before any swiper click; no line drawn on swiper tiles. */
  const showSingleTomorrowLine =
    !swiperThumbClicked &&
    tomorrowGames.length > 0 &&
    firstTomorrowPreviewIndex >= 0;

  const todayHeaderEmphasized = swiperThumbClicked && isDailyForToday;
  const tomorrowHeaderEmphasized =
    showSingleTomorrowLine || (swiperThumbClicked && isDailyForTomorrow);

  const useHeaderDayAccent =
    hasKnownRelation && (swiperThumbClicked || showSingleTomorrowLine);

  useEffect(() => {
    if (gamesSlider.length === 0) return;
    setActiveIndex((i) => Math.min(i, gamesSlider.length - 1));
  }, [gamesSlider.length]);

  /** Arrow buttons only move the thumbnail Swiper; hero updates only on thumb click. */
  const swiperSlidePrev = () => {
    const sw = previewSwiperRef.current;
    if (!sw || sw.destroyed || sw.isBeginning) return;
    sw.slidePrev();
  };

  const swiperSlideNext = () => {
    const sw = previewSwiperRef.current;
    if (!sw || sw.destroyed || sw.isEnd) return;
    sw.slideNext();
  };

  const handlePreviewThumbClick = (globalIndex: number) => {
    setSwiperThumbClicked(true);
    setActiveIndex(globalIndex);
    const local = previewSlides.findIndex((s) => s.globalIndex === globalIndex);
    if (local >= 0) previewSwiperRef.current?.slideTo(local);
  };

  useEffect(() => {
    const sw = previewSwiperRef.current;
    if (!sw || sw.destroyed) return;
    sw.update();
    requestAnimationFrame(() => {
      if (!previewSwiperRef.current || previewSwiperRef.current.destroyed) return;
      syncSwiperEdges(previewSwiperRef.current);
    });
  }, [previewSlides.length, syncSwiperEdges]);

  if (isSliderPending) return null;

  if (!gamesSlider.length || !activeGame) {
    return (
      <section className="flex min-h-dvh items-center justify-center bg-black px-4 text-center text-white/80">
        <p>Daily picks could not be loaded. Check that the API is running.</p>
      </section>
    );
  }

  return (
    <>
      <section className="relative min-h-dvh w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0 [&_.lazy-load-image-background]:!absolute [&_.lazy-load-image-background]:!inset-0 [&_.lazy-load-image-background]:!block [&_.lazy-load-image-background]:!h-full [&_.lazy-load-image-background]:!w-full [&_.lazy-load-image-background]:!max-w-none">
          <Image
            key={`hero-bg-${activeGame.id}-${activeIndex}`}
            imgUrl={activeGame.background_image}
            name={activeGame.name}
            effect="opacity"
            styles="block h-full w-full max-w-none object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full flex-col px-40 py-10">
          <header className="flex items-center justify-between">
            <h1 className="text-primary text-5xl font-bold font-orbitron tracking-wide">
              GrooveIT
            </h1>
            <Button
              type="button"
              variant="contained"
              label="Sign In"
              onClick={() => navigate(paths.LOGIN)}
            />
          </header>

          <div className="swipper_section mt-auto">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
              {/* Left: Today · title · rating · genres · platforms · actions */}
              <div className="flex min-w-0 flex-1 flex-col gap-8 lg:max-w-none">
                <div className="flex items-start gap-2">
                  <div className="mt-3 flex flex-col items-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        useHeaderDayAccent
                          ? todayHeaderEmphasized
                            ? "bg-white"
                            : "bg-white/50"
                          : "bg-white/90"
                      }`}
                    />
                    <span
                      className={`mt-1 h-10 w-0.5 ${
                        useHeaderDayAccent
                          ? todayHeaderEmphasized
                            ? "bg-white/70"
                            : "bg-white/35"
                          : "bg-white/50"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xl font-bold ${
                      useHeaderDayAccent
                        ? todayHeaderEmphasized
                          ? "text-white"
                          : "text-white/55"
                        : "text-white/90"
                    }`}
                  >
                    Today
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-8">
                  <div>
                    <div className="mt-2 flex gap-4 lg:mt-0">
                      <span className="text-7xl font-extralight leading-none text-white/95">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <h2 className="max-w-xl text-4xl font-semibold font-orbitron leading-tight sm:text-7xl">
                        {activeGame.name}
                      </h2>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/80">
                      <span className="rounded-md bg-white/10 px-2 py-1 [&_svg]:text-yellow-400">
                        <StarRating
                          star={Math.round(activeGame.rating)}
                          maxStar={5}
                        />
                      </span>
                      <span className="text-sm text-white/85">
                        {activeGame.genres
                          .slice(0, 3)
                          .map((genre) => genre.name)
                          .join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">
                      Available on
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Platforms
                        platforms={activeGame.parent_platforms}
                        showNames
                        className="text-sm text-white/90"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-[#f9c74f] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffd166]">
                        Buy
                      </button>
                      <button className="rounded-full border border-white/35 bg-black/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/70">
                        Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Tomorrow · prev/next left/right, vertically centered on thumbnails */}
              <aside className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-visible lg:max-w-none">
                <div className="flex items-start gap-2">
                  <div className="mt-3 flex flex-col items-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        useHeaderDayAccent
                          ? tomorrowHeaderEmphasized
                            ? "bg-white"
                            : "bg-white/50"
                          : "bg-white/90"
                      }`}
                    />
                    <span
                      className={`mt-1 h-10 w-0.5 ${
                        useHeaderDayAccent
                          ? tomorrowHeaderEmphasized
                            ? "bg-white/70"
                            : "bg-white/35"
                          : "bg-white/50"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xl font-bold ${
                      useHeaderDayAccent
                        ? tomorrowHeaderEmphasized
                          ? "text-white"
                          : "text-white/55"
                        : "text-white/90"
                    }`}
                  >
                    Tomorrow
                  </span>
                </div>

                <div className="mt-auto flex min-h-0 w-full min-w-0 flex-1 flex-col justify-end overflow-visible">
                  <div className="relative min-w-0 w-full overflow-visible">
                    <div className="pointer-events-none absolute inset-x-0 inset-y-0 z-30 flex items-center justify-between">
                      {!swiperEdge.isBeginning ? (
                        <button
                          type="button"
                          onClick={swiperSlidePrev}
                          aria-label="Scroll thumbnails back"
                          className="flex items-center justify-center pointer-events-auto h-28 w-8 shrink-0 rounded-xl bg-black/70 text-white shadow-lg backdrop-blur-sm transition hover:border-white/70"
                        >
                          <Icon
                            name="MdKeyboardArrowLeft"
                            size={26}
                            className="text-white"
                          />
                        </button>
                      ) : (
                        <span className="h-28 w-8 shrink-0" aria-hidden />
                      )}
                      {!swiperEdge.isEnd ? (
                        <button
                          type="button"
                          onClick={swiperSlideNext}
                          aria-label="Scroll thumbnails forward"
                          className="flex items-center justify-center pointer-events-auto h-28 w-8 shrink-0 rounded-xl bg-black/70 text-white shadow-lg backdrop-blur-sm transition hover:border-white/70"
                        >
                          <Icon
                            name="MdKeyboardArrowRight"
                            size={26}
                            className="text-white"
                          />
                        </button>
                      ) : (
                        <span className="h-28 w-8 shrink-0" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 w-full overflow-visible">
                      <Swiper
                        observer
                        observeParents
                        loop={false}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        spaceBetween={12}
                        centerInsufficientSlides
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                          },
                          1024: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                          },
                        }}
                        onSwiper={(swiper) => {
                          previewSwiperRef.current = swiper;
                          syncSwiperEdges(swiper);
                        }}
                        onSlideChange={(swiper) => syncSwiperEdges(swiper)}
                        onSlideChangeTransitionEnd={(swiper) =>
                          syncSwiperEdges(swiper)
                        }
                        onProgress={(swiper) => syncSwiperEdges(swiper)}
                        onTouchEnd={(swiper) => syncSwiperEdges(swiper)}
                        onTransitionEnd={(swiper) => syncSwiperEdges(swiper)}
                        onReachEnd={(swiper) => syncSwiperEdges(swiper)}
                        onReachBeginning={(swiper) => syncSwiperEdges(swiper)}
                        className="w-full min-w-0 overflow-visible"
                        key={gamesSlider.length}
                      >
                        {previewSlides.map(({ game, globalIndex }) => (
                          <SwiperSlide
                            key={`${globalIndex}-${game.id}`}
                            className="!box-border"
                          >
                            <button
                              type="button"
                              aria-label={game.name}
                              onClick={() => handlePreviewThumbClick(globalIndex)}
                              className="group relative w-full overflow-hidden rounded-xl bg-black/40 text-left transition"
                            >
                              <div className="relative h-80 w-full overflow-hidden [&_.lazy-load-image-background]:!absolute [&_.lazy-load-image-background]:!inset-0 [&_.lazy-load-image-background]:!block [&_.lazy-load-image-background]:!h-full [&_.lazy-load-image-background]:!w-full">
                                <Image
                                  imgUrl={game.background_image}
                                  name={game.name}
                                  effect="opacity"
                                  styles="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent" />
                                <span className="absolute left-2 top-2 z-40 rounded-md bg-black/55 px-2 py-1 text-xs text-white/90">
                                  {String((globalIndex + 1) % 100).padStart(
                                    2,
                                    "0",
                                  )}
                                </span>
                              </div>
                            </button>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};
