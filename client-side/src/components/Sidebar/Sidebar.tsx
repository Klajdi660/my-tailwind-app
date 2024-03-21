import {
  FunctionComponent,
  useMemo,
  Fragment,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { Icon } from "../UI";
import { classNames, useAppUtil } from "../../utils";
import { navlinks } from "../../constants";
import { defaultThemeConfig, themeConfig } from "../../configs";
import { useSelector } from "react-redux";

export const Sidebar: FunctionComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [notify] = useNotification();
  const themeStorage = useSelector((state: any) => state.theme);
  const [toggleNav, setToggleNav] = useState(false);
  const { toggleMenu, setToggleMenu } = useAppUtil();

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
  }, [pathname]);

  const navLists = useMemo(() => {
    return navlinks;
  }, []); // user

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section
      className={classNames("sidebar_section z-[1100] fixed top-0 h-full")}
    >
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
          <>
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
                    <Fragment key={link.name}>
                      <li
                        key={link.name}
                        className={classNames(
                          `dropdown_${link.id}`,
                          "relative px-[10px] group"
                        )}
                      >
                        <button
                          className={classNames(
                            "flex flex-row items-center gap-2 h-12 w-full outline-0 border-none pl-[20px]",
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
                    </Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </>
        </div>
      </div>
    </section>
  );
};
