import { Link, useNavigate } from "react-router-dom";
import { FC, FormEvent, useCallback, useState } from "react";
import { Icon } from "../components";
import { FOOTER_LINK_COLUMNS, languageMaps, paths } from "../data";

export const Footer: FC = () => {
  const navigate = useNavigate();

  const [footerEmail, setFooterEmail] = useState("");

  const onFooterEmailSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const q = footerEmail.trim()
        ? `?email=${encodeURIComponent(footerEmail.trim())}`
        : "";
      navigate(`${paths.REGISTER}${q}`);
    },
    [footerEmail, navigate],
  );

  return (
    <footer className="border-t border-white/10 bg-main text-onNeutralBg">
      <div className="mx-auto max-w-[100vw] px-4 py-16 sm:px-10 sm:py-20 md:px-14">
        <p className="mx-auto max-w-2xl text-center text-lg font-normal sm:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
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
            className="min-h-12 w-full flex-1 rounded border border-white/55 bg-black/80 px-4 py-3 outline-none ring-0 transition focus:border-white sm:min-h-14 sm:px-5 sm:text-lg"
          />
          <button
            type="submit"
            className="flex min-h-12 shrink-0 items-center justify-center gap-1 rounded bg-primary px-5 text-base font-semibold transition hover:brightness-110 sm:min-h-14 sm:px-7 sm:text-lg"
          >
            Get Started
            <Icon name="MdKeyboardArrowRight" size={26} />
          </button>
        </form>

        <p className="mt-12 text-base sm:mt-14">
          Questions?{" "}
          <Link
            to={paths.LOGIN_HELP}
            className="text-sm underline underline-offset-2 transition"
          >
            Contact us.
          </Link>
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 sm:gap-y-4">
          {FOOTER_LINK_COLUMNS.map((column, colIndex) => (
            <ul
              key={colIndex}
              className="flex flex-col gap-3 sm:gap-3.5 text-onNeutralBg"
            >
              {column.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="text-sm underline underline-offset-2 transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm underline underline-offset-2 transition"
                    >
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
            className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2"
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
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          />
        </div>

        <p className="mt-6 text-sm">Netflix Albania</p>

        <p className="mt-6 text-xs leading-relaxed sm:text-[0.8125rem]">
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
        </p>
      </div>
    </footer>
  );
};
