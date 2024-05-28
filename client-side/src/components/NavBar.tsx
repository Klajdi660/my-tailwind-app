import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Searchbar } from "../components";
import { useAuth } from "../hooks";
import {
  Button,
  Image,
  CartButton,
  DesktopToggleButton,
  NotificationButton,
  ThemeButton,
  MobileToggleButton,
  // LanguageButton,
  Overlay,
} from "./UI";
import ProfileDropdown from "./Auth/ProfileDropDown";
import { defaultThemeConfig } from "../configs";
import { icon, iconName } from "../assets";
import { useMobileResponsive, useAppUtil, classNames } from "../utils";
import { NavbarProps } from "../types";

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const theme = useSelector((state: any) => state.theme);
  const isMobile = useMobileResponsive();
  const { toggleSearch, setToggleSearch } = useAppUtil();
  // const [toggleSearch, setToggleSearch] = useState(false);

  // const { sidebar } = theme || defaultThemeConfig;
  const { sidebar } = theme || defaultThemeConfig;
  const isFolded = sidebar === "folded";
  const showFull = Boolean(isFolded);
  console.log("isAuthenticated 1111:>> ", isAuthenticated);
  console.log("user 1111:>> ", user);
  return (
    <nav className="fixed z-[10] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px] sidebar_horizontal_width">
      <Overlay
        isOpen={toggleSearch}
        handleIsOpen={setToggleSearch}
        isMobile={isMobile}
      />
      <div
        className={classNames(
          "relative flex h-full items-center justify-between"
        )}
      >
        <div
          className={classNames(
            "flex relative p-3 z-20 w-sidebar h-navbar duration-500 lg:bg-sidebar justify-center"
            // !isMobile && "w-sidebar"
          )}
        >
          <Link to="/" className="flex items-center h-full gap-2 logo">
            {!showFull ? (
              <Image imgUrl={iconName} name="App Logo" width={100} />
            ) : (
              <Image imgUrl={icon} name="App Logo2" width={50} />
            )}
          </Link>
        </div>
        <div className="flex items-center gap-4 px-3 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            <DesktopToggleButton theme={theme} dispatch={dispatch} />
            <Searchbar
              isMobile={isMobile}
              toggleSearch={toggleSearch}
              setToggleSearch={setToggleSearch}
            />
            <MobileToggleButton />
          </div>
          {!isMobile && (
            <div className="flex items-center h-full gap-4 nav-icons">
              {user ? (
                <>
                  <CartButton />
                  <NotificationButton />
                  {/* <LanguageButton /> */}
                  <ThemeButton mode={theme.mode} dispatch={dispatch} />
                  <ProfileDropdown />
                </>
              ) : (
                <div className="flex items-center gap-0 px-4">
                  <Button
                    variant="contained"
                    label="Login"
                    onClick={() => navigate("/login")}
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
