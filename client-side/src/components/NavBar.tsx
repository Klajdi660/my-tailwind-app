import React, { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { classNames } from '../utils';
import { icon } from '../assets/img';
import { Icons, Button } from './UI';

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

const SignUpButton = (navigate: any) => {
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

export const Navbar: FunctionComponent<NavbarProps> = () => {  
    const navigate = useNavigate();
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
                        <SignUpButton navigate={navigate} />
                    </div>
                </div>
            </div>
        </nav>
    );
};