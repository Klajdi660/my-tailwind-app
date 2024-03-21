import {
  FunctionComponent,
  useMemo,
  Fragment,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { Icon, Overlay, Image } from "../UI";
import { classNames, useAppUtil, useMobileResponsive } from "../../lib";
import { navlinks } from "../../constants";
import { defaultThemeConfig, themeConfig } from "../../configs";
import { useSelector } from "react-redux";

const User = () => {
  const { user } = useAuth();

  const { email, username, avatar, extra } = user || {};

  return (
    <Link
      className="gap-2 p-2 rounded flex_justify_between bg-main hover:bg-primary-opacity"
      to="/profile"
    >
      <div className="w-10 h-10 rounded-full flex_justify_center bg-sidebar">
        {avatar ? (
          <Image
            imgUrl={avatar}
            styles="w-full h-full rounded-full"
            name="sidebar user"
          />
        ) : (
          <Icon name="FaRegUser" size={16} />
        )}
      </div>

      {email && (
        <div className="flex flex-col flex-1 text-sm text-secondary hover:text-primary">
          <span className="text-secondary">@{username}</span>
          <span className="break-all text-onNeutralBg">
            {extra?.firstName} {extra?.lastName}
          </span>
        </div>
      )}
    </Link>
  );
};

export const Sidebar: FunctionComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [notify] = useNotification();
  const themeStorage = useSelector((state: any) => state.theme);
  const [toggleNav, setToggleNav] = useState(false);
  const { toggleMenu, setToggleMenu } = useAppUtil();
  const isMobile = useMobileResponsive();

  const { sidebar } = themeStorage || defaultThemeConfig;
  const isFolded = sidebar === "folded";

  const handleLinkClick = (link: any) => {
    if (!isAuthenticated && link.name !== "Discover") {
      const description = (
        <span>
          Please login to access{" "}
          <span className="text-primary">{link.name}</span> page.
        </span>
      );

      return notify({
        variant: "warning",
        description,
      });
    }

    navigate(link.link);
    localStorage.lastLocation = link.name.toLowerCase();
  };

  useEffect(() => {
    setToggleMenu && setToggleMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navLists = useMemo(() => {
    return navlinks;
  }, []); // user

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section
      className={classNames(
        "sidebar_section z-[1100] fixed top-0 h-full",
        isMobile &&
          classNames(
            "transition-all duration-500",
            toggleMenu ? "left-0" : "-left-sidebar"
          )
      )}
    >
      <Overlay
        isOpen={toggleMenu}
        handleIsOpen={setToggleMenu}
        isMobile={isMobile}
      />
      <div
        {...{
          onMouseOver: () => setToggleNav(true),
          onMouseOut: () => setToggleNav(false),
        }}
        {...(toggleNav && { style: { width: `${hoverWidth}px` } })}
        className={classNames(
          "nav-list overflow-auto hide_scrollbar relative top-navbar sidebar_height w-sidebar duration-500 transition-all pb-[100px] bg-sidebar"
        )}
      >
        <div className={classNames("relative text-white text-base")}>
          {navLists.map((item) => (
            <div
              key={item.name}
              // className={classNames(!isFolded ? "mt-4" : "")}
            >
              {(!isFolded || toggleNav) && (
                <span
                  className={classNames(
                    "block p-3 mx-3 text-gray-400 text-sm uppercase"
                  )}
                >
                  {item.name}
                </span>
              )}
              <ul>
                {item.subLinks.map((link) => (
                  // <Fragment key={link.name}>
                  <li
                    key={link.name}
                    className={classNames(
                      `dropdown_${link.id}`,
                      "relative px-[10px] group",
                      (!isFolded || toggleNav) && "pb-2"
                    )}
                  >
                    <button
                      className={classNames(
                        "flex flex-row items-center gap-2 h-12 w-full outline-0 border-none pl-[20px] hover:bg-primary-opacity rounded",
                        pathname.includes(link.to) &&
                          "rounded bg-primary-opacity"
                      )}
                      onClick={() => handleLinkClick(link)}
                    >
                      <Icon
                        name={link.icon}
                        className={classNames(
                          "group-hover:!text-primary",
                          pathname.includes(link.to) && "!text-primary"
                        )}
                        size={20}
                      />
                      <div
                        className={classNames(
                          "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                          pathname.includes(link.to)
                            ? "text-primary"
                            : "text-onNeutralBg",
                          !isFolded || toggleNav
                            ? "opacity-100 transition-opacity duration-1000"
                            : "invisible w-0 opacity-0"
                        )}
                      >
                        {link.name}
                      </div>
                    </button>
                  </li>
                  // </Fragment>
                ))}
              </ul>
            </div>
          ))}
          {isAuthenticated && isMobile && (
            <div className="fixed bottom-0 p-2 bg-sidebar w-sidebar max-h-[100px]">
              <User />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
