import { FC, useEffect, useMemo, useState } from "react";
import {
  Image,
  Platforms,
  ScrollToTopButton,
  StarRating,
} from "../../components";
import { useGames } from "../../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import type { GameParams } from "../../types";

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

const DAILY_TODAY_LIMIT = 2;
const DAILY_TOMORROW_LIMIT = 8;

export const HomePage: FC = () => {
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

  const activeDay = useMemo<"today" | "tomorrow">(() => {
    if (activeIndex < todayCount) return "today";
    return "tomorrow";
  }, [activeIndex, todayCount]);

  const isDailyForToday = activeDay === "today";
  const isDailyForTomorrow = activeDay === "tomorrow";
  const hasKnownRelation = todayCount > 0 || tomorrowGames.length > 0;

  const activeGame = useMemo(() => {
    if (!gamesSlider.length) return null;
    return gamesSlider[activeIndex] ?? gamesSlider[0];
  }, [activeIndex, gamesSlider]);

  /** Next 4 slides after `activeIndex` with stable global indices (avoids `indexOf` when ids repeat). */
  const previewEntries = useMemo(() => {
    if (!gamesSlider.length) return [];
    const n = gamesSlider.length;
    const out: { game: GameParams; globalIndex: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const globalIndex = (activeIndex + 1 + i) % n;
      out.push({ game: gamesSlider[globalIndex], globalIndex });
    }
    return out;
  }, [activeIndex, gamesSlider]);

  /** Index in the preview strip of the first “tomorrow” game. */
  const firstTomorrowPreviewIndex = useMemo(() => {
    return previewEntries.findIndex((e) => e.globalIndex >= todayCount);
  }, [previewEntries, todayCount]);

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

  const totalGames = gamesSlider.length;

  useEffect(() => {
    if (gamesSlider.length === 0) return;
    setActiveIndex((i) => Math.min(i, gamesSlider.length - 1));
  }, [gamesSlider.length]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalGames) % totalGames);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalGames);
  };

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
            imgUrl={activeGame.background_image}
            name={activeGame.name}
            effect="opacity"
            styles="block h-full w-full max-w-none object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col px-4 pb-6 pt-4 sm:px-8 sm:pb-10 sm:pt-6 lg:px-12">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-wide">Astral</h1>
              <span className="rounded-full border border-white/35 px-3 py-1 text-xs text-white/85">
                All movies
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <button className="transition hover:text-white">Search</button>
              <button className="transition hover:text-white">Menu</button>
            </div>
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
                      <h2 className="max-w-xl text-4xl font-semibold leading-tight sm:text-7xl">
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

              {/* Center: prev / next at bottom (single row) */}
              <div className="hidden min-w-0 shrink-0 flex-col justify-end lg:flex lg:w-auto">
                <div className="flex flex-row gap-3">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/45 text-xl text-white transition hover:border-white/70"
                    aria-label="Previous slide"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/45 text-xl text-white transition hover:border-white/70"
                    aria-label="Next slide"
                  >
                    &#8250;
                  </button>
                </div>
              </div>

              {/* Right: Tomorrow · swiper thumbnails */}
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
                  <Swiper
                    observer
                    observeParents
                    slidesPerView="auto"
                    spaceBetween={12}
                    className="w-full min-w-0 overflow-visible"
                    key={gamesSlider.length}
                  >
                    {previewEntries.map(({ game, globalIndex }) => (
                      <SwiperSlide
                        key={`${globalIndex}-${game.id}`}
                        className="!box-border !w-[min(100%,168px)] sm:!w-[188px] lg:!w-44"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSwiperThumbClicked(true);
                            setActiveIndex(globalIndex);
                          }}
                          className="group relative w-full overflow-hidden rounded-xl border border-white/15 bg-black/40 text-left transition"
                        >
                          <div className="relative h-64 w-full overflow-hidden [&_.lazy-load-image-background]:!absolute [&_.lazy-load-image-background]:!inset-0 [&_.lazy-load-image-background]:!block [&_.lazy-load-image-background]:!h-full [&_.lazy-load-image-background]:!w-full">
                            <Image
                              imgUrl={game.background_image}
                              name={game.name}
                              effect="opacity"
                              styles="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent" />
                            <span className="absolute left-2 top-2 z-20 rounded-md bg-black/55 px-2 py-1 text-xs text-white/90">
                              {String((globalIndex + 1) % 100).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="h-14 p-3">
                            <p className="line-clamp-2 text-sm font-medium">
                              {game.name}
                            </p>
                          </div>
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </aside>
            </div>

            {/* Mobile: nav under content */}
            <div className="mt-6 flex justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={goToPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/45 text-xl text-white transition hover:border-white/70"
                aria-label="Previous slide"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/45 text-xl text-white transition hover:border-white/70"
                aria-label="Next slide"
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};
