import React, { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { classNames } from '../utils';
import { icon } from '../assets/img';
import { Icons, Button } from './UI';
import ProfileDropdown from './Auth/ProfileDropDown';
import { Popover } from 'antd';

interface NavbarProps {};

const Logo = () => {
  return (
    <div
      className={classNames(
        "flex relative p-3 z-20 h-navbar duration-500 w-sidebar lg:bg-sidebar justify-center",
      )}
    >
      <Link to="/" className="flex items-center h-full gap-2 logo">
        <img
          src={icon} 
          alt={'fund_logo'} 
          width={100}
        />
      </Link>
    </div>
  );
};

const Searchbar = () => {
  const [input, setInput] = useState("");
  
  return (
    <>
      <div
        className={classNames(
          "w-full h-full flex items-center",
        )}
      >
        <div
          className={classNames(
            "flex_justify_between h-full w-full border rounded border-divider focus-within:border-primary",
          )}
        >
          <Icons name="BiSearch" className="ml-3" />
          <input
            placeholder="Search for games..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent outline-0 text-onNeutralBg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        >
          <Icons name="BiSearch" className="group-hover:!text-white" />
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
        variant='contained'
        label="Login"
        onClick={() => navigate("/login")} 
      />
    </div>
  );
};

const notificationList = [
  {
    id: "1",
    content: "Mark Smith reacted to your recent added playlist - My first playlist",
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
          <p className="text-base">All notifications</p>
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
                <Icons name="IoMdNotificationsOutline" />
                <div className="flex flex-col flex-1 gap-1">
                  <p className="text-sm">{item.content}</p>
                  <span className="text-xs text-secondary">
                    {item.time}
                  </span>
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

  const hide = () => {
    setOpen(false);
  };

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
            <Icons
              name="IoMdNotificationsOutline"
              className="group-hover:!text-white"
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export const Navbar: FunctionComponent<NavbarProps> = () => {  
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed z-[1200] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px] sidebar_horizontal_width">
      <div
        className={classNames(
          "relative flex h-full items-center justify-between",
        )}
      >
        <Logo/>
        <div className="flex items-center gap-4 px-3 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            <Searchbar/>
          </div>
          <div className="flex items-center h-full gap-4 nav-icons">
            {isAuthenticated ? (
              <>
                <NotificationButton />
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