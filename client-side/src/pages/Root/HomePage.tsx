import { FC, FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { languageMaps, paths } from "../../data";
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
    iconClass:
      "text-fuchsia-400 drop-shadow-[0_0_20px_rgba(232,121,249,0.65)]",
  },
  {
    title: "Download your shows to watch offline",
    description:
      "Save your favorites easily and always have something to watch.",
    icon: "MdOutlineFileDownload",
    iconClass:
      "text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.65)]",
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

export const HomePage: FC = () => {
  const { LOGIN, REGISTER, GAME_DETAILS, HOME, LOGIN_HELP } = paths;
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [trendingNav, setTrendingNav] = useState({
    canPrev: false,
    canNext: true,
  });

  const trendingSwiperRef = useRef<SwiperType | null>(null);

  const syncTrendingNav = useCallback((swiper: SwiperType) => {
    setTrendingNav({
      canPrev: !swiper.isBeginning,
      canNext: !swiper.isEnd,
    });
  }, []);

  const mosaicTiles = useMemo(() => {
    if (!gamesSlider?.length) return [];
    const tiles: any[] = [];
    for (let i = 0; i < 42; i++) {
      tiles.push(gamesSlider[i % gamesSlider.length]);
    }
    return tiles;
  }, [gamesSlider]);

  const onEmailSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const q = email.trim()
        ? `?email=${encodeURIComponent(email.trim())}`
        : "";
      navigate(`${REGISTER}${q}`);
    },
    [email, navigate, REGISTER],
  );

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

  if (!gamesSlider?.length) return null;

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      {/* —— Hero —— */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-x-hidden">
        {/* Poster mosaic */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-[-18%] grid rotate-[-6deg] scale-110 grid-cols-5 gap-1 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9">
            {mosaicTiles.map((g, i) => (
              <div
                key={`${g.id}-${i}`}
                className="aspect-[2/3] overflow-hidden"
              >
                <Image
                  imgUrl={g.background_image}
                  name=""
                  styles="h-full w-full object-cover"
                  effect="opacity"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/78 to-black/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 flex min-h-[100dvh] flex-col px-4 pb-8 pt-4 sm:px-10 sm:pt-6 md:px-14">
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

          {/* Center CTA */}
          <div className="mx-auto flex max-w-4xl flex-1 flex-col justify-center gap-6 py-12 text-center sm:gap-7 md:py-16">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-lg font-medium sm:text-xl md:text-2xl">
              Starts at EUR 4.99. Cancel anytime.
            </p>
            <p className="text-base text-white/95 sm:text-lg md:text-xl">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <form
              onSubmit={onEmailSubmit}
              className="mx-auto flex w-full max-w-3xl flex-col gap-3 xs:flex-row xs:items-stretch xs:gap-2"
            >
              <label className="sr-only" htmlFor="home-email">
                Email address
              </label>
              <input
                id="home-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 w-full flex-1 rounded border border-white/55 bg-black/55 px-4 py-3 text-base text-white placeholder:text-white/55 outline-none ring-0 transition focus:border-white sm:min-h-14 sm:px-5 sm:text-lg"
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
              onSwiper={(swiper) => {
                trendingSwiperRef.current = swiper;
                syncTrendingNav(swiper);
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
