/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FC, useMemo, useState, useEffect } from "react";
import { navlinks, paths } from "../../data";
import { SidebarPorps } from "../../types";
import { Icon, Overlay, Image } from "../UI";
import { useAuth, useNotification, useMediaResponsive } from "../../hooks";
import { defaultThemeConfig, themeConfig } from "../../configs";
import { classNames, useAppUtil } from "../../utils";
import { useAppSelector } from "../../store";

const User = () => {
  const { profile } = paths;

  const { user } = useAppSelector((state) => state.user);

  const { email, username, avatar, extra } = user || {};

  return (
    <Link
      className="gap-2 p-2 rounded flex_justify_between bg-main hover:bg-primary-opacity"
      to={profile}
    >
      <div className="w-10 h-10 rounded-full flex_justify_center bg-sidebar">
        {avatar ? (
          <Image
            imgUrl={avatar}
            styles="w-full h-full rounded-full"
            name="sidebar user"
            effect="blur"
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

export const Sidebar: FC<SidebarPorps> = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { isMobile } = useMediaResponsive();

  const [toggleNav, setToggleNav] = useState(false);
  const { toggleMenu, setToggleMenu } = useAppUtil();

  const navigate = useNavigate();

  const themeStorage = useAppSelector((state) => state.theme);

  const { sidebar } = themeStorage || defaultThemeConfig;
  const isFolded = sidebar === "folded";

  const handleLinkClick = (link: any) => {
    // if (!isAuthenticated && link.name !== "Discover") {
    //   const description = (
    //     <span>
    //       Please login to access{" "}
    //       <span className="text-primary">{link.name}</span> page.
    //     </span>
    //   );

    //   return notify({
    //     variant: "warning",
    //     description,
    //   });
    // }

    navigate(link.to);
    // localStorage.lastLocation = link.name.toLowerCase();
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
        "sidebar_section z-[10] fixed top-0 h-full",
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
        // {...{
        //   onMouseOver: () => setToggleNav(true),
        //   onMouseOut: () => setToggleNav(false),
        // }}
        {...(toggleNav && { style: { width: `${hoverWidth}px` } })}
        className={classNames(
          "nav-list overflow-auto hide_scrollbar relative top-navbar sidebar_height w-sidebar duration-500 transition-all pb-[100px] bg-sidebar"
        )}
      >
        <div
          className={classNames(
            "relative text-white text-base",
            isFolded ? "mt-4" : "mt-0"
          )}
        >
          {navLists.map((navList) => (
            <div key={navList.name}>
              {(!isFolded || toggleNav) && (
                <span
                  className={classNames(
                    "block p-3 mx-3 text-gray-400 text-sm uppercase"
                  )}
                >
                  {navList.name}
                </span>
              )}
              <ul>
                {navList.subLinks.map((link) => (
                  <li
                    key={link.name}
                    className={classNames(
                      `dropdown_${link.id}`,
                      "relative px-[10px] group pb-1"
                      // (!isFolded || toggleNav) && "pb-2"
                    )}
                  >
                    <Tooltip
                      placement="right"
                      title={isFolded && link.name}
                      arrow={true}
                      color="var(--switchBg)"
                      trigger={["hover"]}
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
                            !(isFolded && !isMobile) || toggleNav
                              ? "opacity-100 transition-opacity duration-1000"
                              : "invisible w-0 opacity-0"
                          )}
                        >
                          {link.name}
                        </div>
                        {/* <div
                          className={classNames(
                            pathname.includes(link.to) &&
                              isFolded &&
                              "w-1 h-1 absolute left-3 top-2/2 bg-primary rounded-sm"
                          )}
                        /> // for dot */}
                      </button>
                    </Tooltip>
                  </li>
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
