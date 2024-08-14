import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FC, useMemo, useState, useEffect } from "react";
import { navLists } from "../../data";
import { Icon, Overlay, Image } from "../UI";
import { useAuth, useNotification, useMediaResponsive } from "../../hooks";
import { defaultThemeConfig, themeConfig } from "../../configs";
import { classNames, useAppUtil } from "../../utils";
import { icon, userIcon } from "../../assets";
import { ProfileDropdown } from "../Profile/ProfileDropDown";

interface SidebarMiniProps {}

export const SidebarMini: FC<SidebarMiniProps> = () => {
  const { pathname } = useLocation();
  const [notify] = useNotification();
  const { isAuthenticated, user } = useAuth();
  const { isMobile } = useMediaResponsive();

  const [toggleNav, setToggleNav] = useState(false);
  const { toggleMenu, setToggleMenu } = useAppUtil();

  const navigate = useNavigate();

  const themeStorage = useSelector((state: any) => state.theme);

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

    navigate(link.to);
    localStorage.lastLocation = link.name.toLowerCase();
  };

  useEffect(() => {
    setToggleMenu && setToggleMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navlists = useMemo(() => {
    return navLists;
  }, []); // user

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section className="sidebarmini_section shrink-0 max-w-[80px] w-full py-4 flex_justify_between flex-col sticky top-0 h-screen bg-sidebar">
      <Link to="/discover">
        <Image imgUrl={icon} name="App Logo" width={60} />
      </Link>
      <div className="overflow-y-auto hide_scrollbar">
        <div className="flex flex-col gap-1">
          {navlists.map((navList) => (
            <Link
              key={navList.id}
              to={navList.to}
              className={classNames(
                "flex_justify_center p-4 hover:bg-primary-opacity rounded-lg group",
                pathname.includes(navList.to) && "bg-primary-opacity"
              )}
            >
              <Tooltip
                placement="right"
                color="var(--switchBg)"
                trigger={["hover"]}
                title={navList.name}
              >
                <button>
                  <Icon
                    name={navList.icon}
                    className={classNames(
                      "text-secondary group-hover:!text-primary",
                      pathname.includes(navList.to) && "!text-primary"
                    )}
                    size={20}
                  />
                </button>
              </Tooltip>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="flex_justify_center flex-col gap-2">
        <div className="flex_justify_center p-2.5 bg-primary-opacity rounded-full group cursor-pointer hover:bg-primary">
          <Icon
            name="AiOutlinePlus"
            className={classNames("text-secondary group-hover:text-white")}
            size={20}
          />
        </div>
        <ProfileDropdown />
      </div> */}
      <div>
        <ProfileDropdown />
      </div>
    </section>
  );
};
