import React, { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../hooks";
import { classNames } from "../utils";
import { icon, icon2 } from "../assets/img";
import { Icon, Button, Image } from "./UI";
import ProfileDropdown from "./Auth/ProfileDropDown";
import { Popover } from "antd";
import { defaultThemeConfig } from "../configs";
import { useSelector, useDispatch } from "react-redux";
import { updateThemeConfig } from "../store/redux/slices/theme";

interface NavbarProps {}

const Searchbar = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <div className={classNames("w-full h-full flex items-center")}>
        <div
          className={classNames(
            "flex_justify_between h-full w-full border rounded border-divider focus-within:border-primary"
          )}
        >
          <Icon name="BiSearch" className="ml-3" />
          <input
            placeholder="Search for games..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent outline-0 text-onNeutralBg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          <Icon name="BiSearch" className="group-hover:!text-white" />
        </button>
      </div>
    </>
  );
};

const SignUpButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-0 px-4">
      <Button
        variant="contained"
        label="Login"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

const notificationList = [
  {
    id: "1",
    content:
      "Mark Smith reacted to your recent added playlist - My first playlist",
    time: "1 minute ago",
  },
  {
    id: "2",
    content: "Sarah Johnson created a new playlist - Downtown Music",
    time: "1 day ago",
  },
  {
    id: "3",
    content: "Bob Manuel sent you a private message",
    time: "1 week ago",
  },
];

const NotifyContainer = () => {
  return (
    <div className="p-2 space-y-2 w-[300px] notify">
      <div className="flex items-center gap-3 p-3 rounded bg-main">
        <p className="text-base text-onNeutralBg">All notifications</p>
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary group-hover:bg-white">
          <span className="text-xs text-white group-hover:text-primary">
            {3}
          </span>
        </div>
      </div>
      <ul className="list-none divide-y divide-divider">
        {notificationList.map((item) => (
          <li
            className="p-3 rounded cursor-pointer hover:bg-main"
            key={item.id}
          >
            <Link className="flex gap-3" to="/notifications">
              <Icon name="IoMdNotificationsOutline" />
              <div className="flex flex-col flex-1 gap-1">
                <p className="text-sm">{item.content}</p>
                <span className="text-xs text-secondary">{item.time}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <hr className="w-full border-t border-divider" />

      <Link
        className="inline-block w-full p-3 text-sm text-center hover:text-primary hover:bg-primary-opacity"
        to={"/notifications"}
      >
        See all notifications
      </Link>
    </div>
  );
};

const NotificationButton = () => {
  const [open, setOpen] = useState(false);

  // const hide = () => {
  //   setOpen(false);
  // };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex items-center h-full cursor-pointer">
      <Popover
        trigger="click"
        arrow={false}
        content={NotifyContainer()}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <div className="relative group">
          <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
            <span className="text-xs text-white group-hover:text-primary">
              {notificationList?.length}
            </span>
          </div>
          <div className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity group-hover:bg-primary">
            <Icon
              name="IoMdNotificationsOutline"
              className="group-hover:!text-white"
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

const CartButton = () => {
  return (
    <div className="flex items-center h-full cursor-pointer">
      <div className="relative group">
        <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
          <span className="text-xs text-white group-hover:text-primary">
            {notificationList?.length}
          </span>
        </div>
        <div className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity group-hover:bg-primary">
          <Icon name="FaOpencart" className="group-hover:!text-white" />
        </div>
      </div>
    </div>
  );
};

const DesktopToggleButton = (props: any) => {
  const { theme, dispatch } = props;

  const changeTheme = (value: any) => {
    dispatch(updateThemeConfig({ ...theme, ...value }));
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};

const ThemeButton = (props: any) => {
  const { mode, dispatch } = props;
  // const dispatch = useDispatch();
  // const { mode } = useSelector((state: any) => state.theme);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    dispatch(updateThemeConfig({ mode: newMode }));
  };

  return (
    <div className="items-center hidden h-full lg:flex">
      {mode === "light" ? (
        <button onClick={toggleMode} className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          <Icon name="MdOutlineWbSunny" className="group-hover:!text-white" />
        </button>
      ) : (
        <button onClick={toggleMode} className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          <Icon name="BsMoonStars" className="group-hover:!text-white" />
        </button>
      )}
    </div>
  );
};

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  // const [theme, updateTheme] = useTheme();
  const theme = useSelector((state: any) => state.theme);

  const { sidebar } = theme || defaultThemeConfig;
  const isFolded = sidebar === "folded";
  const showFull = Boolean(isFolded);

  return (
    <nav className="fixed z-[1200] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px] sidebar_horizontal_width">
      <div
        className={classNames(
          "relative flex h-full items-center justify-between"
        )}
      >
        <div
          className={classNames(
            "flex relative p-3 z-20 h-navbar duration-500 w-sidebar lg:bg-sidebar justify-center"
          )}
        >
          <Link to="/" className="flex items-center h-full gap-2 logo">
            {!showFull ? (
              <Image imgUrl={icon} name="App Logo" width={100} />
            ) : (
              <Image imgUrl={icon2} name="App Logo2" width={50} />
            )}
          </Link>
        </div>
        <div className="flex items-center gap-4 px-3 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            <DesktopToggleButton theme={theme} dispatch={dispatch} />
            <Searchbar />
          </div>
          <div className="flex items-center h-full gap-4 nav-icons">
            {isAuthenticated ? (
              <>
                <CartButton />
                <NotificationButton />
                <ThemeButton mode={theme.mode} dispatch={dispatch} />
                <ProfileDropdown />
              </>
            ) : (
              <SignUpButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
