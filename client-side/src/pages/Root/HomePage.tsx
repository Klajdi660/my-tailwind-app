import { FC, FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, EffectFade, FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { languageMaps, paths } from "../../data";
import type { GameParams } from "../../types";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { useGames } from "../../hooks";
import { Icon, Image } from "../../components";

const JOIN_REASONS: {
  title: string;
  description: string;
  icon: string;
  iconClass: string;
}[] = [
  {
    title: "Enjoy on your TV",
    description:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    icon: "MdOutlineTv",
    iconClass: "text-fuchsia-400 drop-shadow-[0_0_20px_rgba(232,121,249,0.65)]",
  },
  {
    title: "Download your shows to watch offline",
    description:
      "Save your favorites easily and always have something to watch.",
    icon: "MdOutlineFileDownload",
    iconClass: "text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.65)]",
  },
  {
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: "MdTravelExplore",
    iconClass: "text-pink-400 drop-shadow-[0_0_20px_rgba(244,114,182,0.65)]",
  },
  {
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
    icon: "MdChildFriendly",
    iconClass: "text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.65)]",
  },
];

const FOOTER_LINK_COLUMNS: { label: string; href: string }[][] = [
  [
    { label: "FAQ", href: "#" },
    { label: "Investor Relations", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Speed Test", href: "#" },
  ],
  [
    { label: "Help Center", href: "#" },
    { label: "Jobs", href: "#" },
    { label: "Cookie Preferences", href: "#" },
    { label: "Legal Notices", href: "#" },
  ],
  [
    { label: "Account", href: paths.ACCOUNT },
    { label: "Ways to Watch", href: "#" },
    { label: "Corporate Information", href: "#" },
    { label: "Only on Netflix", href: "#" },
  ],
  [
    { label: "Media Center", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
];

const footerLinkClass =
  "text-sm text-white/80 underline underline-offset-2 transition hover:text-white";

const HERO_PLATFORM_CHIPS_FALLBACK: { name: string; slug: string }[] = [
  { name: "PC", slug: "pc" },
  { name: "PS5", slug: "playstation5" },
  { name: "Xbox", slug: "xbox" },
  { name: "Switch", slug: "nintendo-switch" },
];

function platformChipsForGame(
  game: GameParams | undefined,
): { name: string; slug: string }[] {
  if (!game) return [];
  const seen = new Set<string>();
  const out: { name: string; slug: string }[] = [];
  const add = (name: string, slug?: string) => {
    if (!name?.trim()) return;
    const key = (slug || name).toLowerCase().replace(/\s+/g, "-");
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ name: name.trim(), slug: key });
  };
  for (const row of game.parent_platforms ?? []) {
    const pl = row.platform;
    if (pl?.name) add(pl.name, pl.slug);
  }
  if (out.length) return out;
  for (const row of game.platforms ?? []) {
    const pl = row.platform;
    if (pl?.name) add(pl.name, pl.slug);
  }
  return out;
}

/** Maps API slug/name to an icon registered in `Icon`. */
function iconNameForPlatform(slug: string, name: string): string {
  const hay = `${slug} ${name}`.toLowerCase();
  if (/playstation|^ps\d|sony/.test(hay)) return "FaPlaystation";
  if (/xbox/.test(hay)) return "FaXbox";
  if (/nintendo|\bswitch\b/.test(hay)) return "BsNintendoSwitch";
  if (/\bpc\b|windows/.test(hay)) return "FaWindows";
  if (/macos|\bmac\b|ios|iphone|ipad|apple/.test(hay)) return "FaApple";
  if (/linux|steam|ubuntu/.test(hay)) return "FaLinux";
  if (/android/.test(hay)) return "FaAndroid";
  if (/web|browser/.test(hay)) return "BsGlobe";
  return "BiGame";
}

export const HomePage: FC = () => {
  const { LOGIN, REGISTER, GAME_DETAILS, HOME, LOGIN_HELP, STORE, DISCOVER } =
    paths;
  const { useGameSlider } = useGames();
  const { gamesSlider, isSliderPending } = useGameSlider();

  const trendingSwiperKey = useMemo(
    () => gamesSlider.map((g: { id: number }) => g.id).join("-"),
    [gamesSlider],
  );

  const navigate = useNavigate();
  const [footerEmail, setFooterEmail] = useState("");
  const [trendingNav, setTrendingNav] = useState({
    canPrev: false,
    canNext: true,
  });

  const trendingSwiperRef = useRef<SwiperType | null>(null);
  const heroMainSwiperRef = useRef<SwiperType | null>(null);
  const heroThumbSwiperRef = useRef<SwiperType | null>(null);
  const heroSwiperSyncLock = useRef(false);

  const [heroThumbChrome, setHeroThumbChrome] = useState({
    index: 0,
    progress: 0,
    canPrev: false,
    canNext: true,
  });

  const syncTrendingNav = useCallback((swiper: SwiperType) => {
    setTrendingNav({
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
  }, []);

  const onFooterEmailSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const q = footerEmail.trim()
        ? `?email=${encodeURIComponent(footerEmail.trim())}`
        : "";
      navigate(`${REGISTER}${q}`);
    },
    [footerEmail, navigate, REGISTER],
  );

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

  if (isSliderPending || gamesSlider.length === 0) return null;

  const heroActiveGame = (gamesSlider[heroThumbChrome.index] ??
    gamesSlider[0]) as GameParams;
  const heroHeadlineThirdLine = heroActiveGame?.name?.trim() || "Bold Gaming";
  const apiPlatformChips = platformChipsForGame(heroActiveGame);
  const heroPlatformChips =
    apiPlatformChips.length > 0
      ? apiPlatformChips
      : [...HERO_PLATFORM_CHIPS_FALLBACK];

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      {/* —— Hero —— */}
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
              {gamesSlider.map(
                (game: { id: number; background_image: string }) => (
                  <SwiperSlide key={game.id}>
                    <img
                      src={game.background_image}
                      alt=""
                      className="h-full min-h-[100dvh] w-full object-cover object-[center_20%]"
                    />
                  </SwiperSlide>
                ),
              )}
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
            <Link to={HOME} className="block w-28 sm:w-36 md:w-40">
              <Image
                imgUrl={iconName}
                name="Logo"
                styles="h-auto w-full object-contain"
                effect="opacity"
              />
            </Link>
            <Link
              to={LOGIN}
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
                  to={STORE}
                  className="inline-flex items-center gap-2 rounded border border-white/40 bg-black/45 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/60 sm:px-6 sm:text-base"
                >
                  <Icon
                    name="MdShoppingBag"
                    size={22}
                    className="!text-white"
                  />
                  Shop Now
                </Link>
                <Link
                  to={DISCOVER}
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
                  {heroPlatformChips.map((p) => (
                    <li key={p.slug}>
                      <span className="inline-flex items-center gap-2 rounded border border-white/25 bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                        <Icon
                          name={iconNameForPlatform(p.slug, p.name)}
                          size={18}
                          className="!text-white/95 shrink-0"
                        />
                        {p.name}
                      </span>
                    </li>
                  ))}
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
                        <Link
                          to={`${GAME_DETAILS}/${game.id}`}
                          aria-label={game.name}
                          className="group relative block h-[140px] w-full overflow-hidden rounded-xl ring-1 ring-white/35 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:ring-white/60 hover:brightness-110 sm:rounded-2xl"
                        >
                          <Image
                            imgUrl={game.background_image}
                            name={game.name}
                            styles="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            effect="opacity"
                          />
                        </Link>
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

                  <span className="shrink-0 tabular-nums text-sm font-semibold tracking-tight text-white sm:text-base">
                    {String(heroThumbChrome.index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* —— Trending Now —— */}
      <section className="relative bg-black pb-16 pt-2 sm:pb-20">
        <div className="mx-auto max-w-[100vw] px-4 sm:px-10 md:px-14">
          <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl md:text-3xl">
            Trending Now
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
                    to={`${GAME_DETAILS}/${game.id}`}
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
              onClick={() => trendingSwiperRef.current?.slidePrev()}
              disabled={!trendingNav.canPrev}
              className={classNames(
                "absolute left-0 top-1/2 z-20 flex h-[72%] max-h-60 w-10 -translate-y-1/2 items-center justify-center rounded bg-black/55 text-white shadow-lg backdrop-blur-[2px] transition hover:bg-black/75 sm:w-12 md:w-14",
                trendingNav.canPrev
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              aria-label="Previous"
              aria-hidden={!trendingNav.canPrev}
            >
              <Icon
                name="MdKeyboardArrowLeft"
                size={28}
                className="!text-white"
              />
            </button>
            <button
              type="button"
              onClick={() => trendingSwiperRef.current?.slideNext()}
              disabled={!trendingNav.canNext}
              className={classNames(
                "absolute right-0 top-1/2 z-20 flex h-[72%] max-h-60 w-10 -translate-y-1/2 items-center justify-center rounded bg-black/55 text-white shadow-lg backdrop-blur-[2px] transition hover:bg-black/75 sm:w-12 md:w-14",
                trendingNav.canNext
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              aria-label="Next"
              aria-hidden={!trendingNav.canNext}
            >
              <Icon
                name="MdKeyboardArrowRight"
                size={28}
                className="!text-white"
              />
            </button>
          </div>

          <h2 className="mb-5 mt-14 text-xl font-bold sm:mb-6 sm:mt-16 sm:text-2xl md:mt-20 md:text-3xl">
            More Reasons to Join
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {JOIN_REASONS.map((item) => (
              <article
                key={item.title}
                className="relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/55 via-zinc-950/80 to-black p-6 ring-1 ring-white/[0.06] sm:min-h-[240px] sm:rounded-3xl sm:p-8"
              >
                <h3 className="pr-14 text-lg font-bold leading-snug text-white sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
                  {item.description}
                </p>
                <div
                  className="pointer-events-none absolute bottom-5 right-4 sm:bottom-6 sm:right-5"
                  aria-hidden
                >
                  <Icon name={item.icon} size={52} className={item.iconClass} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-[100vw] px-4 py-16 sm:px-10 sm:py-20 md:px-14">
          <p className="mx-auto max-w-2xl text-center text-lg font-normal text-white sm:text-xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form
            onSubmit={onFooterEmailSubmit}
            className="mx-auto mt-6 flex w-full max-w-3xl flex-col gap-3 xs:mt-8 xs:flex-row xs:items-stretch xs:gap-2"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email address"
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              className="min-h-12 w-full flex-1 rounded border border-white/55 bg-black/80 px-4 py-3 text-base text-white placeholder:text-white/55 outline-none ring-0 transition focus:border-white sm:min-h-14 sm:px-5 sm:text-lg"
            />
            <button
              type="submit"
              className="flex min-h-12 shrink-0 items-center justify-center gap-1 rounded bg-primary px-5 text-base font-semibold text-white transition hover:brightness-110 sm:min-h-14 sm:px-7 sm:text-lg"
            >
              Get Started
              <Icon
                name="MdKeyboardArrowRight"
                size={26}
                className="!text-white"
              />
            </button>
          </form>

          <p className="mt-12 text-base text-white/90 sm:mt-14">
            Questions?{" "}
            <Link to={LOGIN_HELP} className={footerLinkClass}>
              Contact us.
            </Link>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 sm:gap-y-4">
            {FOOTER_LINK_COLUMNS.map((column, colIndex) => (
              <ul key={colIndex} className="flex flex-col gap-3 sm:gap-3.5">
                {column.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link to={item.href} className={footerLinkClass}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className={footerLinkClass}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="relative mt-10 inline-flex sm:mt-12">
            <Icon
              name="BsGlobe"
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 !text-white/90"
            />
            <select
              aria-label="Language"
              defaultValue="US"
              className="h-11 min-w-[148px] cursor-pointer appearance-none rounded border border-white/40 bg-black py-2 pl-10 pr-10 text-sm text-white outline-none ring-0 transition hover:border-white/55 focus:border-white"
            >
              {Object.entries(languageMaps).map(([key, { label }]) => (
                <option key={key} value={key} className="bg-black">
                  {label}
                </option>
              ))}
            </select>
            <Icon
              name="MdKeyboardArrowDown"
              size={20}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 !text-white/90"
            />
          </div>

          <p className="mt-6 text-sm text-white/55">Netflix Albania</p>

          <p className="mt-6 text-xs leading-relaxed text-white/45 sm:text-[0.8125rem]">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
            a bot.
          </p>
        </div>
      </footer>
    </div>
  );
};
