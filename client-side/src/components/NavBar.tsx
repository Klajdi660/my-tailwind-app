import { FC } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Image,
  Button,
  Overlay,
  CartButton,
  MobileToggleButton,
  NotificationButton,
  DesktopToggleButton,
} from "./UI";
import { paths } from "../data";
import { useAppSelector } from "../store";
import { icon, iconName } from "../assets";
import { useMediaResponsive, useStore } from "../hooks";
import { defaultThemeConfig } from "../configs";
import { Searchbar, ProfileDropdown } from "../components";
import { classNames, getAside } from "../utils";

export const Navbar: FC = () => {
  const { logIn, discover } = paths;

  const { isMobile } = useMediaResponsive();
  const { toggleSearch, setToggleSearch } = useStore();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const theme = useAppSelector((state) => state.theme);
  const { atoken } = useAppSelector((state) => state.auth);

  const hasAside = getAside(pathname);

  const { sidebar } = theme || defaultThemeConfig;
  const isFolded = sidebar === "folded";
  const showFull = Boolean(isFolded && !isMobile);

  return (
    <nav
      className={classNames(
        "fixed z-[10] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px]",
        hasAside ? "sidebar_horizontal_width" : "w-full"
      )}
    >
      <Overlay isOpen={toggleSearch} handleIsOpen={setToggleSearch} />
      <div
        className={classNames(
          "relative flex h-full items-center justify-between"
        )}
      >
        <div
          className={classNames(
            "flex relative p-3 z-20 w-sidebar h-navbar duration-500",
            isMobile ? "justify-left" : "justify-center",
            showFull ? "bg-primary-opacity" : "lg:bg-sidebar"
          )}
        >
          <Link to={discover} className="flex items-center h-full gap-2 logo">
            {!showFull ? (
              <Image imgUrl={iconName} name="App Logo" width={100} />
            ) : (
              <Image imgUrl={icon} name="App Logo2" width={50} />
            )}
          </Link>
        </div>
        <div className="flex items-center gap-4 px-3 sm:px-6 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            <DesktopToggleButton />
            <Searchbar />
            <MobileToggleButton />
          </div>
          {!isMobile && (
            <div className="flex items-center h-full gap-2 nav-icons">
              {atoken !== null ? (
                <>
                  <CartButton />
                  <NotificationButton />
                  <ProfileDropdown />
                </>
              ) : (
                <div className="flex items-center gap-0 px-4">
                  <Button
                    variant="contained"
                    label="Login"
                    onClick={() => navigate(logIn)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
